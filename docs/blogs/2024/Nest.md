---
title: 2024
titleTemplate: NestJS 入门（一）
description: NestJS 入门笔记
createDate: 2024-09-06
tag: 前端  
---

# NestJS 入门

Nest (NestJS) 是一个用于构建高效、可扩展的 [Node.js](https://nodejs.cn/) 服务器端应用的框架。

Nest 旨在成为一个与平台无关的框架。



## 安装

使用 Nest CLI 创建新项目

```
npm i -g @nestjs/cli

nest new project-name
```

:::tip

要创建具有更严格功能集的新 TypeScript 项目，请将 `--strict` 标志传递给 `nest new` 命令。

:::



或者，使用 Git 安装 TypeScript 入门项目：

```
git clone https://github.com/nestjs/typescript-starter.git project

cd project
npm install
npm run start
```

打开浏览器并导航至 [`http://localhost:3000/`](http://localhost:3000/)。

以上安装步骤完成后，在`src/` 目录下会有几个核心文件：

|       Files       |                                                             |
| :---------------: | :---------------------------------------------------------: |
|   app.module.ts   |                        应用的根模块                         |
| app.controller.ts |                  具有单一路由的基本控制器                   |
|  app.service.ts   |                   具有单一方法的基本服务                    |
|      main.ts      | 使用核心函数 `NestFactory` 创建 Nest 应用实例的应用入口文件 |



在`main.ts`中，它将引导我们的应用创建：

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

`NestFactory` 公开了一些允许创建应用实例的静态方法。

`create()` 方法返回一个应用对象，它实现了 `INestApplication` 接口。

当你将类型传递给 `NestFactory.create()` 方法时，如下例所示，`app` 对象将具有专用于该特定平台的方法。

```ts
const app = await NestFactory.create<NestExpressApplication>(AppModule);
```

Nest 开箱即用地支持两个 HTTP 平台：[express](https://express.nodejs.cn/) 和 [fastify](https://fastify.nodejs.cn/)。

无论使用哪个平台，它都会公开自己的应用接口。这些分别被视为 `NestExpressApplication` 和 `NestFastifyApplication`。

