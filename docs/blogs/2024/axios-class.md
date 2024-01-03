---
title: 2024
titleTemplate: 封装 Axios 的心得
description: 对封装 Axios 的心得总结
createDate: 2024-01-03
tag: 前端  
---

# 封装 Axios 的心得

## 前言

在使用 Vue2 版本的时候，基于 Axios 的接口请求是依赖库提供的 API 直接开发的，所有的配置、拦截器和错误处理都揉在一个文件里，多少会造成混乱。

当在 Vue3 下，伴随着 TypeScript 的加持，我们可以让请求的结构更清晰，请求的方法可复用更统一，有了这个目标，我们一起整理一下封装的思路。 

- 灵活的配置
- 灵活的拦截器
- 取消请求
- 遇到错误时，可重新发起重连请求
- 代码提示



## 基础封装

```typescript
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * 请求类
 */
export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 拦截器
  interceptors?: HttpInterceptors<AxiosResponse>;

  constructor(config: AxiosRequestConfig) {}

  /**
   * 发起请求的方法
   * @param config 请求配置
   * @returns 
   */
  request<T>(config: AxiosRequestConfig<T>): Promise<T> {}
}
```

这样可以创建多个实例， 实例化时传入自定义的配置，这个配置继承自`CreateAxiosDefaults`。

```typescript
import { CreateAxiosDefaults, InternalAxiosRequestConfig, AxiosResponse } from "axios";

// 自定义的拦截器
export interface HttpInterceptors<T> {
  // 请求拦截器
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestInterceptorsCatch?: (error: any) => any;
  // 响应拦截器
  responseInterceptors?: (response: T) => T;
  responseInterceptorsCatch?: (error: any) => any;
}

// 实例化的配置
export interface CreateAxiosConfig<T = AxiosResponse> extends CreateAxiosDefaults {
  // 自定义的拦截器  
  interceptors?: HttpInterceptors<T>;
  // 重试次数  
  retry?: number;
  // 重试延时
  retryDelay?: number;
  __retryCount?: number;
}

// 实例请求方法的配置
export interface RequestConfig<T> extends AxiosRequestConfig {
  interceptors?: HttpInterceptors<T>;
}
```

然后我们在构造函数中初始化实例和拦截器：

```typescript
constructor(config: CreateAxiosConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (err: any) => {
        return err;
      }
    );
    
	// 实例请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    );
	// 实例响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    );

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return new Promise((resolve, reject) => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
      },
      async (err: any) => {
        const { code = '', config } = err;

        // 没有重连配置的话,直接抛出错误
        if (!config || !config.retry || ['417'].includes(code)) {
          return Promise.reject(err);
        }

        config.__retryCount = config.__retryCount ?? 0;
        if (config.__retryCount >= config.retry) {
          return Promise.reject(err);
        }

        config.__retryCount += 1;
        // 重试延时
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve('retried');
          }, config.retryDelay ?? 5);
        })
          
        // 发起重连
        return await this.request(config);
      }
    );
  }
```

遇到错误时，可会发起重连机制。**拦截器的执行顺序为实例请求→类请求→实例响应→类响应**；

类的请求方法：

```typescript
request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 接口拦截器  
      if (config?.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any);
      }

      this.instance.request<any, T>(config).then((res) => {
        if (config?.interceptors?.responseInterceptors) {
          res = config.interceptors.responseInterceptors(res);
        }

        resolve(res);
      })
        .catch((err: any) => {
          reject(err);
        });
    })
}
```

完成后，我们可以创建一个`Request`实例：

```typescript
const service = new Request({
  retry: 2,
  retryDelay: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }, 
  interceptors: {
    requestInterceptors,
    requestInterceptorsCatch,
    responseInterceptors,
    responseInterceptorsCatch,
  },
});

// 统一的请求方法
export const request = <D, R>(config: AppRequestConfig<D, R>): Promise<AppResponseData<R>> => {
  const { method = 'GET' } = config;

  if (method === 'GET') {
    config.params = config.data;
  }

  return service.request<AppResponseData<R>>(config);
};
```

这里是相关的类型声明：

```typescript
import { AxiosResponse, Method } from 'axios';
import type { RequestConfig } from '../dist/index';

/**
 * 响应结构
 */
export interface AppResponseData<T> {
  errorInfo: ErrorInfo;
  result: T;
}

/**
 * D: 请求参数
 * R: 响应参数
 */
export interface AppRequestConfig<D = any, R = any> extends RequestConfig<AppResponseData<R>> {
  method?: Method;
  loading?: boolean;
  data?: D;
}

export interface ErrorInfo {
  errorCode?: string | number;
  errorMsg?: string;
}


export interface AppResponse<T = any> extends AxiosResponse<AppResponseData<T>, any> {
  [key: string]: any;
}

```

至此，一个易用的封装已经可以使用了。



## 取消请求

这是我整理了Axios取消请求的流程方法：

<zoom-img src="https://img.alilis.space/yuque_diagram.jpg-alilis_img"/>

### 基于`CancelToken`实现

```js
import Qs from 'qs';

const pendingRequest = new Map();

// 生成唯一的key，来区分config
function generateConfigKey(config) {
	const { method, url, params, data } = config;

	return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&');
}

function addPendingRequest(config) {
	const requestKey = generateConfigKey(config);

	config.cancelToken =
		config.cancelToken ||
		new axios.CancelToken(cancel => {
			if (!pendingRequest.has(requestKey)) {
				pendingRequest.set(requestKey, cancel);
			}
		});
}

function removePendingRequest(config) {
	const requestKey = generateConfigKey(config);

	if (pendingRequest.has(requestKey)) {
		const cancelToken = pendingRequest.get(requestKey);
		cancelToken(requestKey);
		pendingRequest.delete(requestKey);
	}
}
```

请求拦截：

```js
service.interceptors.request.use(
	config => {
		removePendingRequest(config);
		addPendingRequest(config);

		// .... 
    
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);
```

响应拦截:

```js
service.interceptors.response.use(
	response => {
		return new Promise((resolve, reject) => {
			removePendingRequest(response.config);

			let res = response.data;
			if (res.status === 'SUCCESS' || res.status === 'success' || res.code === 200) {
				resolve(res.data);
			} else {
				reject(res);
			}
		});
	},
	error => {
		removePendingRequest(error.config || {});

		if (axios.isCancel(error)) {
			console.log('已取消的重复请求：' + error.message);
		} else {
			// ...
		}

		return Promise.reject(error);
	},
);
```



### 基于`AbortController`实现

```typescript
class Request {
	// 取消请求控制器
	abortControllerMap: Map<string, AbortController>;
    
    constructor(config: AxiosRequestConfig) {
        // 初始化请求取消控制器
    	this.abortControllerMap = new Map();
        
        // 全局请求拦截器
        this.instance.interceptors.request.use(
          (config: InternalAxiosRequestConfig) => {
            const controller = new AbortController();
            const url = config.url || '';
            config.signal = controller.signal;
            // 可以参考 generateConfigKey 方法生成   
            this.abortControllerMap.set(url, controller);

            return config;
          },
          (err: any) => {
            return err;
          }
        );
        
        // 全局响应拦截器
        this.instance.interceptors.response.use(
          (res: AxiosResponse) => {
            return new Promise((resolve, reject) => {
              const url = res.config.url || '';
              // 移除当前响应的控制器
              this.abortControllerMap.delete(url);

              resolve(res.data);
            })
          },
          (err: any) => {
            return err;
          }
        };
    }
}
```

新增实例方法：

```typescript
 /**
  * 取消全部请求
  */
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort();
    }
    this.abortControllerMap.clear();
  }

  /**
  * 取消指定的请求
  * @param url 待取消的请求URL
  */
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url];
    
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort();
      this.abortControllerMap.delete(_url);
    }
  }
```

这就完成了取消请求的实现。我们可以这样定义一个请求方法

```ts
import { request } from './example';
interface ApiAReq {}
interface ApiARes {}

export default {
  apiA: async (data: ApiAReq): Promise<ApiARes> => {
    try {
      const { result } = await request<ApiAReq, ApiARes>({
        url: '/api/1',
        method: 'GET',
        data,
      });

      return result;
    } catch (error) {
      return error;
    }
  }
}
```

本示例代码仓库在[这里](https://github.com/aweirdocc/weebat-fetch)，如有错误，请多指教。

















