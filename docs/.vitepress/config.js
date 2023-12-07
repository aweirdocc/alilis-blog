import { defineConfig } from 'vitepress';

function initNavData() {
  const blogs = initDocsSidebar();
  const firstBlog = blogs.length ? blogs[0] : null;

  return [
    { text: "首页", link: "index" },
    { text: "博文", link: `${firstBlog.base}${firstBlog.items[0].link}`, activeMatch: '^/blogs/' },
  ]
}

function initDocsSidebar() {
  return [
    {
      text: "2023",
      collapsed: false, // 可折叠
      base: '/blogs/2023/',
      items: [
        {
          text: 'Start With Alilis',
          link: 'alilis',
          description: '第一篇博文'
        },
      ]
    }
  ]
}

export default defineConfig({
  title: "Alilis",
  description: "This is alilis's personal blog site with something talks.",
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
    ["meta", { name: "keywords", content: "alilis的个人文档站" }],

    // 引入 Gitalk
    // [
    //   "link",
    //   { rel: "stylesheet", href: "https://unpkg.com/gitalk/dist/gitalk.css" },
    // ],
    // ["script", { src: "https://unpkg.com/gitalk/dist/gitalk.min.js" }],
  ],

  themeConfig: {
    logo: { src: '/favicon.png', width: 24, height: 24 },
    outline: [2, 5],  // 识别<h2>-<h4>的标题
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    author: "alilis",

    search: {
      provider: "local",
    },

    nav: initNavData(),

    sidebar: initDocsSidebar(),

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

  ignoreDeadLinks: true
});
