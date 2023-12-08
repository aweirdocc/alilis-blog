import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import './index.scss';
import ZoomImg from './components/zoomImg.vue'
import Comment from './components/comment.vue'
import ToTop from './components/toTop.vue'

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "aside-ads-after": () => h(ToTop),
      "doc-after": () => h(Comment),
    })
  },
  enhanceApp({ app }) {
    app.component('ZoomImg', ZoomImg)
    app.component('Comment', Comment)
  }
}