---
title: 2023
titleTemplate: 手把手从零搭建博客站 
description: Alilis带你手把手带你从零搭建博客站, 会以 vitepress 为模板，在 vercel 上建站。
createDate: 2023-12-11
tag: '教程'
---

# 手把手带你从零搭建博客站

以前也折腾过一些其它博客类的模板，例如`Wordpress`和`Hexo`，但到最后却都没有持续用下来，使用成本和发布方式是其中最大的阻碍。

今天这篇博文，会让你以一个近乎无成本的开发模式和最简单的配置，去快速的搭建一个属于你的博客站。你需要注册一个[vercel账户](https://vercel.com/)和一个域名。



## `VitePress`基本使用

`vitepress` 作为以`Vite`为底层驱动的静态文档站，提供了默认深色与亮色的主题，当然它也支持深度的自定义。下面我们开始它的使用。

首先，我们需要安装一下：

```bash
pnpm add -D vitepress
```

通过命令初始化：

```bash
pnpm vitepress init
```

这里会初始化基本配置、设置主题和站点信息。设置完成后，会生成一下的目录结构：

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js	// 站点配置文件
│  ├─ api-examples.md  // 文章
│  └─ index.md  // 首页
└─ package.json
```

执行`pnpm docs:dev` 预览 

```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  ...
}
```

启动成功后，在游览器中打开

<zoom-img src="https://p.sda1.dev/14/0f2cd6ded048cdc4f357e5d847b9885f/Snipaste_2023-12-11_14-25-20.png" />

此时，最基础的部分已经完成。



## `VitePress`个性化配置

### 静态资源

在项目中可以直接使用`/`开头，以获取公共文件下的资源

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js	
│  ├─ public
│  │  └─ favicon.png	
```



### 文档布局

在每一个Markdown文件中，`Frontmatter` 可以配置覆盖站点级或主题级配置选项。

```md
--------
title: VitePress
titleTemplate: Vite & Vue powered static site generator
layout: doc
editLink: false
lastUpdated: true
footer: false
--------
```

默认`layout`有`doc`, `page`, 和 `home`。

doc 是默认布局，它将整个 Markdown 内容设置为“文档”外观。同时可以启用以下功能：

- 编辑链接
- 上一页与下一页链接
- 目录大纲

page 是一个空页面，可以自行设计所有内容。在这种布局中，如果页面具有匹配的侧边栏配置，侧边栏仍然会显示。

home 是默认的主页布局，可以通过配置指定[主页的内容](https://vitepress.dev/reference/default-theme-home-page)。



### 站点配置

```js
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: "站点标题",
  description: "站点描述",
  lang: 'zh-CH',

  lastUpdated: true,	// 是否展示更新时间
  cleanUrls: false,		// URL 中删除尾随的 .html

  // 设置元数据  
  head: [ 
    ["link", { rel: "icon", type: 'image/png', href: "/favicon.png" }],  // favicon 
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
      },
    ],
    ["meta", { name: "keywords", content: "" }],

    // 引入 Gitalk
    [
      "link",
      { rel: "stylesheet", href: "https://unpkg.com/gitalk/dist/gitalk.css" },
    ],
    ["script", { src: "https://unpkg.com/gitalk/dist/gitalk.min.js" }],
  ],

  // 主题配置  
  themeConfig: {
    logo: { src: '/favicon.png', width: 24, height: 24 },
    // 大纲设置
    outline: [2, 5],  // 识别<h2>-<h4>的标题
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    author: "alilis",
    // 开启本地搜索
    search: {
      provider: "local",
    },
	// 导航页
    nav: [ 
      { text: "首页", link: "index" }
    ],
	// 文件目录
    sidebar: [],
	
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2023 Alilis`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
	// 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aweirdocc' },
    ],
  },

  vite: {},

  ignoreDeadLinks: true
});
```

在经过这些基本配置，你已经可以在站点上写写文章了。



## `Vercel`上发布

将我们的代码提交至你的`github`仓库，这样我们在注册 vercel 后便可以直接连接至仓库，每次的更新也会触发更新策略，十分简单。

<zoom-img src="https://p.sda1.dev/14/a529662eba1922f750b8e00575230016/Snipaste_2023-12-11_16-04-59.png" />

选择git的仓库和分支，然后便等待它编译初始化。成功以后，在这里可以添加你自己的域名。

<zoom-img src="https://p.sda1.dev/14/c983663251dc09af7edb30a26db5184c/7353881D-7D22-4833-BBF0-5CD4D018A2F0.png" />

你也可以配置一些分析，来监测网站的情况，总之一切就是这么很简单粗暴。

最后， 十分感谢[VitePress]('https://vitepress.dev/')以及[Vercel]('https://vercel.com/')给我们提供的技术支持。



## 个性化功能

### 获取文章列表

VitePress 给我们提供了`createContentLoader` API 来获取目录下的 markdown 文件数据，注意，其它类型的文件会被跳过。

```js
// posts.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', /* options */);
```

默认情况下，仅提供 `url `和 `frontmatter`数据。可以通过配置 options 来放开`src`、`html`和`excerpt`的数据。在组件中引入来获取数据。

```vue
<script setup>
import { data as posts } from './posts.data.js'
</script>

<template>
  <h1>All Blog Posts</h1>
  <ul>
    <li v-for="post of posts">
      <a :href="post.url">{{ post.frontmatter.title }}</a>
      <span>by {{ post.frontmatter.author }}</span>
    </li>
  </ul>
</template>
```



### 插槽模块

日常使用中， 我们可能需要默认主题中新增部分个性化组件，官方默认提供了一些插槽供我们使用。

调整主题配置文件中（`docs/.vitepress/theme/index.js`）：

```js
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // ...
      "doc-after": () => h(Comment), // 文章新增评论组件
    })
  },
  enhanceApp({ app }) {
    // 注册全局组件
  }
}
```

常用的`doc`布局有一下插槽：

- `doc-top`
- `doc-bottom`
- `doc-footer-before`
- `doc-before`
- `doc-after`
- `sidebar-nav-before`
- `sidebar-nav-after`
- `aside-top`
- `aside-bottom`
- `aside-outline-before`
- `aside-outline-after`
- `aside-ads-before`
- `aside-ads-after`

插槽具体的细节查看[这里](https://vitepress.dev/guide/extending-default-theme#layout-slots)。



### 使用 SVG 图标

安装`vite-plugin-svg-icons`：

```bash
pnpm add vite-plugin-svg-icons -D
```

修改配置：

```js
// config.js
import { defineConfig } from 'vitepress';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default defineConfig({
    vite: {
        plugins: [
          // 注册所有的 svg 文件生成 svg 雪碧图
          createSvgIconsPlugin({
            iconDirs:  [path.resolve(process.cwd(), 'docs/public/svg')], // icon 存放的目录
            symbolId: "icon-[name]", // symbol的id
            inject: "body-last", // 插入的位置
          })
        ],
    },   
});
```

新增SvgIcon组件:

```vue
<template>
  <svg :class="['svg-icon', svgClass]" :width="`${size}`" :height="`${size}`"  aria-hidden="true">
      <use :xlink:href="`${iconName}`" />
  </svg>
</template>

<script setup name="SvgIcon">
import { computed } from 'vue'

const props = defineProps({
  svgClass: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 25
  }
});

const iconName = computed(() => `#icon-${props.name}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  fill: currentColor;
}
</style>
```

我们将它在全局中注册以后，就可以在组件中这样使用：

```vue
<svg-icon :name="iconName"></svg-icon>
```



### 关于SEO的处理

关于SEO的优化对于博主来讲，也是一个痛点，目前也还在摸索与优化中。在这里先记录一下我的一些尝试， 如果有更好的解决办法，欢迎评论。

1. 新增`og`类元数据

   og 是一种新的HTTP头部标记，即Open Graph Protocol。

   ```
   <meta property=”og:title” content=”” />
   
   <meta property=”og:type” content=””/>
   
   <meta property=”og:url” content=”http://www.******.com” />
   
   <meta property=”og:image” content=”http://www.******.com/logo.gif” />
   
   <meta property=”og:site_name” content=”******.COM” />
   
   <meta property=”og:description” content=”” />
   
   <meta property=”fb:admins” content=”″ />
   
   <meta property=”fb:page_id” content=”″ />
   ```

   主要添加页面的标题、简介等

2. 编入搜索引擎的索引

   这一部分就看个人需求了，可以在[这里](https://search.google.com/search-console)去新增谷歌索引。

