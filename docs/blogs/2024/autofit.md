---
title: 2024
titleTemplate: 大屏自适应
description: 日常开发中，大屏自适应的使用技巧。
createDate: 2024-01-25
tag: 前端  
---

# 大屏自适应


## 方案汇总

最常见的方案有一下三种：

|     方案      |                          实现方式                           |                             优点                             |                             缺点                             |
| :-----------: | :---------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|    vw / vh    |      按照设计稿的尺寸，将`px`按比例计算转为`vw`和`vh`       | 可以动态计算图表的宽高，灵活性较高。当屏幕比例跟设计稿不一致时，不会出现两边留白情况。 |          每个图表都需要单独做字体、间距、位移的适配          |
|     scale     | 通过 `scale` 属性，根据视口的大小，对元素整体进行的等比缩放 |           适配简单 、一次处理后不需要再去单独适配            | 会留白，有事件热区偏移。<br />当缩放比例过大时候，字体和图片会有一点点失真. |
| rem + vw / vh |                 动态的计算`html的font-size`                 |                布局的自适应代码量少，适配简单                |      当大屏跟设计稿的比例不一样时，会出现周边留白情况。      |



## vw/vh方案

基于`sass`来封装px2vh与px2vw的计算函数，我们传入具体的像素值，其帮我们自动计算出vw和vh的值。

```scss
@use "sass:math";

//默认设计稿的宽度
$designWidth: 1920;
//默认设计稿的高度
$designHeight: 1080;

@function vw($px) {
  @return math.div($px, $designWidth) * 100vw;
}

@function vh($px) {
  @return math.div($px, $designHeight) * 100vh;
}
```

文件中使用

```scss
.box {
	width: vw(500);
	height: vh(400);
}
```



## Scale 方案

待更新。。。




