---
title: 2023
titleTemplate: flgletJS 生成艺术字
description: 使用 flgletJS 快速生成艺术字的工具
createDate: 2023-12-22
tag: 工具  
---

# flgletJS 生成艺术字

这是一个生成 ASCII 字体工具：

<figlet />

[flgletJS官方仓库](https://github.com/patorjk/figlet.js#readme)有具体的使用方法，注意游览器端与Node服务端有使用区别，你也可以点击[这里](http://www.figlet.org/examples.html)查看不同字体的示例。


## 使用教程

安装：

```bash
pnpm install figlet
```

在游览器端是不能直接使用字体的，需要预加载之后，才可以同步模式去生成。

```javascript
import figlet from 'figlet';

// 设置字体目录
figlet.defaults({ fontPath: "assets/fonts" });
// 预加载
figlet.preloadFonts(["Standard", "Ghost"], ready);

function ready() {
  console.log(figlet.textSync("ASCII"));
  console.log(figlet.textSync("Art", "Ghost"));
}
```

Figlet 提供了很多字体，可以在[字体库](http://www.figlet.org/fontdb.cgi)里查看， 挑选几个喜欢的字体预加载。




<script  setup>
  import Figlet from '@blog/figlet';
</script>
