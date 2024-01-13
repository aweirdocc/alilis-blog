---
title: 2024
titleTemplate: ThreeJS学习笔记
description: ThreeJS学习笔记总结
createDate: 2024-01-13
tag: 笔记  
---

# Three.js

本篇是对学习 `ThreeJS` 的学习总结，完成后会整理放在[知识库](https://docs.alilis.space/)中。



## 安装 

```bash
pnpm install --save three
```

`three.js `核心包含相机、材质、几何、纹理、灯光、阴影、动画系统、各种加载器、音频、渲染器、2D 形状、帮助文件、雾等数百个类。使用时无需全部引入，只导入模块中我们需要的类。如下：

```js
import {
  Camera,
  Material,
  Texture,
} from 'three';
```



## 基础元素

> **场景、相机和渲染器**，它们构成了应用程序的基本脚手架。

### 场景（Scene）

**场景是我们能看到的一切的载体**，简称为 [`Scene`](https://threejs.org/docs/#api/en/scenes/Scene)，其构造函数不带参数。

```js
import { Scene } from 'three';

const scene = new Scene();
```

世界空间是一个3D 笛卡尔坐标系。场景的中心是点(0,0,0)，也称为坐标系的**原点**。**世界空间坐标系，由场景定义**。


<zoom-img src="https://img.alilis.space/coordinate_system_simple.svg?e=9000000000&token=Zpo8COBzrvi6RObKGvVkhteoeUbFeQBqObE8DUpF:ah4pY3T4Rpz2iAuBYCfFkUXR7W0="></zoom-img>

当我们创建一个**新对象**并将其添加到我们的场景中时，它将被放置在原点，并且每当我们移动它时，我们说的都是在这个坐标系中移动它。场景类似一个树形结构，场景位于顶部。

它包含了三维对象`Object3D` 和灯光对象`Light`。`Object3D` 是可以被直接渲染出来的，`Object3D`是网格对象Mesh和集合对象Group的基类。

在场景对象的树状结构中，每个对象的变换信息都是相对的。



### 相机（Camera ）

要查看场景内部，我们需要使用相机作为一双眼睛来观察，并且还需要它能够将场景转换为对我们人眼感觉合理的东西。而将场景图形转换为人类视觉友好的格式，使用称为**投影**的技术。

最重要的投影类型是**透视投影**（[`PerspectiveCamera`](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)），它旨在匹配我们的眼睛看待世界的方式。这种类型的相机是现实世界中相机的等效物，使用许多相同的概念和术语，例如视野和纵横比。`PerspectiveCamera`构造函数有几个参数：

第一个参数是**视野角度**（`**FOV**`）： 无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度。

第二个参数是**长宽比**（**aspect ratio**）：用一个物体的宽除以它的高的值。

接下来的两个参数是**近截面**（near）和**远截面**（far）： 当物体某些部分比摄像机的**远截面**远或者比**近截面**近的时候，该这些部分将不会被渲染到场景中。

<zoom-img src="https://img.alilis.space/290142441964314.jpg?e=9000000000&token=Zpo8COBzrvi6RObKGvVkhteoeUbFeQBqObE8DUpF:Co71RzH8WqGnRwuPQojuePobFH0="></zoom-img>

```js
import { PerspectiveCamera } from 'three';

const fov = 35; 
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; 
const far = 100; 

const camera = new PerspectiveCamera(fov, aspect, near, far);
```

---



另一种重要的投影类型是**正交投影**，可以使用 [`OrthographicCamera`](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)创建。



### 渲染器（Renderer）

渲染器就是将通过相机看到的东西非常快速的绘制到一个`<canvas>`中去，我们使用 [`WebGLRenderer`](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)来渲染我们的场景。

```js
import { WebGLRenderer } from 'three';

const renderer = new WebGLRenderer();
```

<zoom-img src="https://img.alilis.space/img-15-3D01.png?e=9000000000&token=Zpo8COBzrvi6RObKGvVkhteoeUbFeQBqObE8DUpF:h-O8vZK0B8HvQQKJf6NtpYJp7xM="></zoom-img>



### 网格（Mesh）

**[网格](https://threejs.org/docs/#api/en/objects/Mesh)是 3D 计算机图形学中最常见的可见对象**，用于显示各种 3D 对象，**网格包含几何体和材质**。

```js
import { Mesh } from 'three';

const mesh = new Mesh(geometry, material);
```

在创建网格之前，我们需要创建**几何**和**材质**。

- 几何体（Geometry）： **几何体定义了网格的形状**，存储了与顶点相关的数据，比如顶点点位、顶点索引、uv坐标等。ThreeJS核心中提供几个基本形状，如立方体、球体、锥体、柱体等。也可以从外部的模型文件里加载几何体。

- 材质（Material）： **材质定义了网格表面的外观**，负责着色，绘制几何体的表面属性，比如漫反射、镜面反射、光泽度、凹凸等。



### 纹理（Texture）

 纹理对象就是一张图像。纹理图像的图像源可以是Image 图片、canvas 画布、Video 视频等。



### 光源（Light）

为在为几何体添加了材质后，再利用光效配合材质对几何体的样式进行二次加工。



## 创建一个`three.js`程序

创建一个 `three.js` 应用程序都需要所有这六个步骤：

1. **[初始设置](https://blog.alilis.space/blogs/2024/three-js.html/#初始设置)**
2. **[创建场景](https://blog.alilis.space/blogs/2024/three-js.html/#创建场景)**
3. **[创建相机](https://blog.alilis.space/blogs/2024/three-js.html/#创建相机)**
4. **[创建可见对象](https://blog.alilis.space/blogs/2024/three-js.html/#创建可见对象)**
5. **[创建渲染器](https://blog.alilis.space/blogs/2024/three-js.html/#创建渲染器)**
6. **[渲染场景](https://blog.alilis.space/blogs/2024/three-js.html/#渲染场景)**



### 初始设置

导入组件所需的类：

- `BoxBufferGeometry`
- `Mesh`
- `MeshBasicMaterial`
- `PerspectiveCamera`
- `Scene`
- `WebGLRenderer`

```js
import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
```

创建了一个`scene-container`元素

```vue
<template>
    <div id="scene-container" ref="sceneRef">
        <!-- 渲染器生成的 canvas 会放置在这里 -->
    </div>
</template>
```

通过使用 CSS 设置容器的大小来控制场景的大小和位置。



### 创建场景

```js
const scene = new Scene();
```

使用`Color`类来设置场景的背景颜色，如果不设置，将使用默认颜色，即黑色。

```js
scene.background = new Color('skyblue');
```

有几种指定它们的方法，设置任意的一种颜色。



### 创建相机

在基础元素部分我们知道创建相机的几个参数：`fov`, `aspect`, `near`, `far`。

这四个参数一起用于创建一个有边界的空间区域，称之为视锥体，**相机的视锥体就是我们可以*看到*的部分**。当我们通过`PerspectiveCamera`查看场景时，截锥体内的一切都是可见的，而它外面的一切都是不可见的。

<zoom-img src="https://img.alilis.space/perspective_frustum.svg?e=9000000000&token=Zpo8COBzrvi6RObKGvVkhteoeUbFeQBqObE8DUpF:Pc6ZFXT_R386KYNrs1yZ_EOd0zA="></zoom-img>

1. **视野**定义了平截头体扩展的角度。小视场会产生窄截锥体，而宽视场会产生宽截锥体。
2. **纵横比**将平截头体与场景容器元素相匹配。当我们将其设置为容器的宽度除以其高度时，我们确保可以将类似矩形的平截头体完美的扩展到容器中。如果我们弄错了这个值，场景看起来会伸展和模糊。
3. **近剪切平面**定义了平截头体的小端（最接近相机的点）。
4. **远剪裁平面**定义了平截头体的大端（距相机最远）。

---



我们创建的每个对象最初都位于场景的中心，(0,0,0)。为了让相机与场景内的其它对象不混杂在一起，我们需要简单地将其移动（ *朝向我们* ）以给我们一个场景。

```js
const camera = new PerspectiveCamera(fov, aspect, near, far);

camera.position.set(0, 0, 10);
```

**设置任何对象的位置的方法都是一样的**，我们可以一次设置位置的所有三个组成部分。或者，我们可以单独设置 X，Y 和 Z 轴：

```js
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;
```

位置会存储在一个 [`Vector3`](https://threejs.org/docs/#api/zh/math/Vector3)，它一个表示 3D 向量的 three.js 类中



### 创建一个可见对象

- 创建几何体

```js
const geometry = new BoxBufferGeometry(2, 2, 2);
```

- 创建材质

```js
const material = new MeshBasicMaterial();
```

- 创建网格

```js
const cube = new Mesh(geometry, material);
```

创建完成`mesh`后，我们需要将其添加到场景中：

```js
scene.add(cube);
```

如果我们想删除它，我们可以使用`scene.remove(mesh)`。



注意： 

- 通常情况下，我们需要在场景中添加一个光源才能看到物体，所以如果您看不到任何东西，请确保您已经在场景中添加了一些灯光，或者暂时将所有材质切换为`MeshBasicMaterial`。

- 一旦网格被添加到场景中，我们称网格为场景的 *子节点*，我们称场景为网格的 *父节点*。




### 创建渲染器

```js
const renderer = new WebGLRenderer();
```

使用容器的宽度和高度告诉渲染器我们的场景大小

```js
renderer.setSize(container.clientWidth, container.clientHeight);
```

还需要告诉渲染器设备屏幕的像素比。**这是防止 HiDPI 显示器模糊所必需的**

```js
renderer.setPixelRatio(window.devicePixelRatio);
```

将`<canvas>`元素添加到我们的页面

```js
container.append(renderer.domElement);
```



### 渲染场景

```js
renderer.render(scene, camera);
```





## 参考

- [ThreeJS 官网](https://threejs.org/docs/index.htm)

- [探索three.js](https://discoverthreejs.com/zh/book/)

