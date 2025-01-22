import { defineConfig } from 'vitepress';
import ElementPlus from 'unplugin-element-plus/vite';
import handleHeadMeta from './utils/handleHeadMeta';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

function initNavData() {
  return [
    { text: "首页", link: "index" },
    { text: "帖帖板", link: "works-panel" },
    { text: "图库", link: "gallery" },
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

    // ["script", { src: "/libs/live2d.min.js" }],
    ["script", { src: "/libs/live2dcubismcore.min.js" }],
    // 引入 Gitalk
    [
      "link",
      { rel: "stylesheet", href: "https://cdn.bootcdn.net/ajax/libs/gitalk/1.8.0/gitalk.min.css" },
    ],
    ["script", { src: "/libs/gitalk.min.js" }],
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

      // 注册所有的svg文件生成svg雪碧图
      createSvgIconsPlugin({
        iconDirs:  [path.resolve(process.cwd(), 'docs/public/svg')], // icon存放的目录
        symbolId: "icon-[name]", // symbol的id
        inject: "body-last", // 插入的位置
      })
    ],
    // https://github.com/antfu/vite-ssg/issues/171
    ssr: {
      noExternal: ['element-plus']
    },

    build: {
      cssMinify: true,
      minify: true
    }
  },

  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },

  ignoreDeadLinks: true
});
