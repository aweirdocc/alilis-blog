import { defineConfig } from 'vitepress';
import ElementPlus from 'unplugin-element-plus/vite';
import handleHeadMeta from './utils/handleHeadMeta';

function initNavData() {
  return [
    { text: "首页", link: "index" },
    // { text: "博文", link: `${firstBlog.base}${firstBlog.items[0].link}`, activeMatch: '^/blogs/' },
  ]
}

export default defineConfig({
  title: "Alilis",
  description: "这里是Alilis的博客站，会分享日常的一些教程与随记，感谢你的访问与评论。如有问题请联系我。",
  lang: 'zh-CH',

  lastUpdated: true,
  cleanUrls: false,

  head: [
    ["link", { rel: "icon", type: 'image/png', href: "/favicon.png" }],
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
      },
    ],
    ["meta", { name: "keywords", content: "Alilis,博客站,前端,工具,教程" }],
    ["meta", { name: "author", content: "Alilis" }],

    // 引入 Gitalk
    [
      "link",
      { rel: "stylesheet", href: "https://cdn.bootcdn.net/ajax/libs/gitalk/1.8.0/gitalk.min.css" },
    ],
    ["script", { src: "https://cdn.bootcdn.net/ajax/libs/gitalk/1.8.0/gitalk.min.js" }],
  ],

  // https://vitepress.dev/reference/site-config#transformhead
	async transformHead(context) {
		return handleHeadMeta(context);
	},

  themeConfig: {
    logo: { src: '/favicon.png', width: 24, height: 24 },
    outline: [2, 5],  // 识别<h2>-<h4>的标题
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    author: "Alilis",

    search: {
      provider: "local",
    },

    nav: initNavData(),

    // sidebar: initDocsSidebar(),

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2023 Alilis`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aweirdocc' },
    ],
  },

  sitemap: {
    hostname: 'https://blog.alilis.space'
  },

  vite: {
    plugins: [
      ElementPlus(),
    ],
    // https://github.com/antfu/vite-ssg/issues/171
    ssr: {
      noExternal: ['element-plus']
    }
  },

  ignoreDeadLinks: true
});
