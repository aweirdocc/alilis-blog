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

