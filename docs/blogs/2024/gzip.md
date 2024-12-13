---
title: 2024
titleTemplate: 记录一下 gzip 压缩
description: gzip 压缩
createDate: 2024-12-13
tag: 前端  
---

# gzip 压缩

## 1. 参数压缩

在日常业务开发中遇到大参数需要保存到数据库处理时，如果不进行压缩，会提示错误。为了解决这个问题，在项目中引入`pako`对参数进行`gzip`压缩。

`Pako` 是一个用于数据压缩和解压缩的 JavaScript 库，特别适用于处理 `GZIP`格式的数据。

### 1.1  安装Pako

```bash
npm install pako
```

### 1.2 数据压缩

**压缩函数：** 

```js
let pako = require('pako');

function compression(data) {
    const compressedData = pako.gzip(JSON.stringify(data));
    const base64Data = btoa(String.fromCharCode.apply(null, compressedData));
    return base64Data; // 返回压缩后的数据
}
```

**解压缩函数**：

```js
const result = { key: "value" }; // 示例数据
const compressedResult = compression(result);
console.log(compressedResult); // 输出压缩后的数据
```

### 1.3 数据解压缩

**解压缩函数**：

```js
function decompress(base64Data) {
    const compressedData = new Uint8Array(atob(base64Data).split('').map(char => char.charCodeAt(0)));
    const data = JSON.parse(pako.ungzip(compressedData, { to: 'string' }));
    return data; // 返回解压后的数据
}
```

**调用解压缩**：

```js
const decompressedResult = decompress(compressedResult);
console.log(decompressedResult); // 输出解压后的数据
```

具体使用文档[查看这里](https://nodeca.github.io/pako/#gzip)

### 1.4 **接口设置请求头**

```js
Content-Encoding: gzip
```

![image-20241213102742550](https://img.alilis.space/image-20241213102742550.png-alilis_img?e=9000000000&token=Zpo8COBzrvi6RObKGvVkhteoeUbFeQBqObE8DUpF:FArteIk7tBL3ngAQQsFLUFNbND0=)

此时传输的参数数据会以gzip编码格式传给后端使用，数据传输的体积会小很多。



## 2. 响应数据压缩

为了提升资源的加载速度，可以在服务端开启`gzip`压缩，减小网络传输过程中文件大小，从而降低用户的下载时间。在大部分情况下，开启`gzip`压缩是一定能够给网站带来正向的提升的。

接收到响应后，浏览器会根据 `Content-Encoding` 字段的指示，自动对 Gzip 压缩的数据进行解压缩。解压缩后，浏览器将得到原始的 HTML、CSS、JavaScript 等内容。

### 2.1  如何检查网页开启配置gzip

**第一种方式：查看请求头**

查看响应头中的 `Content-Encoding`是否为`gzip`。

![image-20241213092924738](https://img.alilis.space/image-20241213092924738.png-alilis_img?e=9000000000&token=Zpo8COBzrvi6RObKGvVkhteoeUbFeQBqObE8DUpF:uvkOq0cEg0daO7iikBcs_hze9dE=)

**第二种方式：查看资源大小**

在请求的配置里面开启“大请求行”就可以看到每个请求资源的请求大小和实际大小

![image-20241213093143248](https://img.alilis.space/image-20241213093143248.png-alilis_img?e=9000000000&token=Zpo8COBzrvi6RObKGvVkhteoeUbFeQBqObE8DUpF:LCKFwol-vwXGM8Ohil-51VGG1YQ=)

再通过对比开启gzip和不开启gzip两种情况可以看出，它们在对一些相对比较大的资源文件的请求差别是非常大的。因为gzip压缩是消耗服务器的CPU资源，所以开启之后，会使得服务器的响应时间所有增加，服务器的资源消耗也会增加，但是在用户的体验上是有巨大提升的。

### 2.2 gzip配置方式

`gzip`的配置一般都是在全局http层或者针对某个服务的server层添加，例如：

```nginx
gzip  on;
gzip_min_length 1k;
gzip_buffers 16 64k;
gzip_http_version 1.1;
gzip_comp_level 6;
gzip_types text/plain application/javascript text/css application/json;
gzip_vary on;
```

配置参数解释：

- gzip on|off [是否开启gzip]
- gzip_min_length 1k  [开始压缩的最小长度(再小就不要压缩了,意义不在)]
- gzip_buffers 32 4K| 16 8K  [缓冲(压缩在内存中缓冲几块? 每块多大?)]
- gzip_http_version 1.0|1.1  [开始压缩的http协议版本(可以不设置,目前几乎全是1.1协议)]
- gzip_comp_level [1-9]  [推荐6 压缩级别(级别越高,压的越小,越浪费CPU计算资源)]
- gzip_types text/plain application/xml  [对哪些类型的文件用压缩 如txt,xml,html ,css]
- gzip_vary on|off  [是否传输gzip压缩标志]

[详细配置查看这里](https://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip)