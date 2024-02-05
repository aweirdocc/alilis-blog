---
title: 2024
titleTemplate: live2d 纸片人
description: 网页中添加 live2D 纸片人
createDate: 2024-02-05
tag: 教程  
---

# live2d 纸片人

本篇文章将让你快速的在网站中加入可爱的纸片人。主要使用到的依赖库有：

- [`PixiJS`](https://github.com/pixijs/pixijs)： 渲染库。
- [`live2dcubismcore`](https://www.live2d.com/en/sdk/download/native/)： Cubism 核心库。
- [`pixi-live2d-display`](https://github.com/guansss/pixi-live2d-display)：  是 Live2D 插件，提供统一且简单的 API，使你可以从较高的层次来控制 Live2D 模型。它支持所有版本的 Live2D 模型，使用时可以按需引入。
- 模型文件

在开发前确保这些库已经安装或下载。



## 准备工作

### 安装依赖

在项目中安装：

```bash
pnpm install pixi.js pixi-live2d-display
```

下载 `Cubism SDK` 后解压文件，将 Core 中的`live2dcubismcore.min.js` 引入项目。

`pixi-live2d-display` 为每个 Cubism 版本提供了单独的打包文件， 使用其中一个版本的时候减少需要加载文件的大小。

- 使用 `cubism2.js`+`live2d.min.js` 以支持 Cubism 2.1 模型
- 使用 `cubism4.js`+`live2dcubismcore.min.js` 以支持 Cubism 3 和 Cubism 4 模型
- 使用 `index.js`+`live2d.min.js`+`live2dcubismcore.min.js` 以支持所有版本的模型



### 基础使用

```js
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

// 将 PIXI 暴露到 window 上，这样插件就可以通过 window.PIXI.Ticker 来自动更新模型
window.PIXI = PIXI;

(async function () {
    const app = new PIXI.Application({
        view: document.getElementById('canvas'),
    });

    const model = await Live2DModel.from('shizuku.model.json');

    app.stage.addChild(model);

    // 变换
    model.x = 100;
    model.y = 100;
    model.rotation = Math.PI;
    model.skew.x = Math.PI;
    model.scale.set(2, 2);
    model.anchor.set(0.5, 0.5);

    // 交互
    model.on('hit', (hitAreas) => {
        if (hitAreas.includes('body')) {
            model.motion('tap_body');
        }
    });
})();
```

在使用模型时，请先确认你下载的模型版本，否则会导致异常。

<zoom-img src="https://img.alilis.space/Snipaste_2024-02-05_17-03-14.png-alilis_img" />


## 深入使用 pixi-live2d-display

### Live2DModel 类

#### from(source, options)

异步创建模型

- source： 以 `.model.json` (Cubism 2) 或`.model3.json` (Cubism 3/4) 结尾的模型配置文件地址。

在所有资源（包括可选资源）都已加载时，会发出一个`ready`事件。

```js
const { Live2DModel } = await import('pixi-live2d-display/cubism4');

const model = await Live2DModel.from(modelPath);

```


#### fromSync(source, options)

同步创建模型，该方法立即返回一个`Live2DModel`实例，该实例的资源尚未**加载**。这意味着您无法操纵或渲染此模型 - 直到`load`事件被发出。

```js
const model = Live2DModel.fromSync('shizuku.model.json', { onError: console.warn });

model.once('load', () => {
    // 此时模型还未被完全加载，因此不可以去操作它
});


model.once('ready', () => {
    // 此时所有资源（包括可选资源）都已加载
    app.stage.addChild(model);
    model.motion('tap_body');
});

```


## Pixi.js

### Application 类

用于创建新 PixiJS 应用程序的类，自动创建渲染器、追踪器和根容器。

```js
 import { Application } from 'pixi.js';

 // Create the application
 const app = new Application();

 // Add the view to the DOM
 document.body.appendChild(app.view);

 // 添加模型，可以通过 pixi-live2d-display 创建
 app.stage.addChild(model);
```

创建成功后，便渲染我们加载的模型。

#### 实例方法

- destroy ： 销毁渲染器

- resize ： 在渲染器上立即执行调整大小

- render ：渲染 stage
