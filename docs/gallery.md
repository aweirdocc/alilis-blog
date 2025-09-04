---
title: Alilis的博客站
titleTemplate: 图库
description: 这里是用来分享一些Alilis日常生活的图片
layout: page

sidebar: false
---

<gallery :galleryGroups="galleryGroups" />

<script setup lang="ts">
  import { ref } from 'vue';
  import Gallery from './.vitepress/theme/views/gallery.vue'

  const galleryGroups = ref([
    {
      name: 'Daily Life',
      bannerImg: 'https://img.alilis.space/IMG_20230805_165030.jpg-alilis_img',
      imgUrlList: [
        'https://img.alilis.space/IMG_20230805_165030.jpg-alilis_img',
        'https://img.alilis.space/30160639.jpg-alilis_img',
        'https://img.alilis.space/IMG_20231019_175823.jpg-alilis_img',
        'https://img.alilis.space/IMG_20231119_160552.jpg-alilis_img',
        'https://img.alilis.space/lADPJxf-4P8W5X3NBQDNA8A_960_1280.jpg_720x720q90g.jpg-alilis_img',
        'https://img.alilis.space/IMG_20231006_144324.jpg-alilis_img',
        'https://img.alilis.space/1705050380738.jpg-alilis_img',
        'https://img.alilis.space/a01e6782068ff9e525b00fa699e0edd.jpg-alilis_img',
        'https://img.alilis.space/30160728.jpg-alilis_img',
        'https://img.alilis.space/30160722.jpg-alilis_img',
        'https://img.alilis.space/30160716.jpg-alilis_img',
        'https://img.alilis.space/20250904095349_7_5.jpg',
        ''
      ],
      createDate: '2023-12-25'
    },
    {
      name: 'XIAN',
      bannerImg: 'https://img.alilis.space/IMG_20241127_105842.jpg-alilis_img',
      imgUrlList: [
        'https://img.alilis.space/IMG_20241127_105842.jpg-alilis_img',
        'https://img.alilis.space/IMG_20241127_105834.jpg-alilis_img',
        'https://img.alilis.space/IMG_20241127_105957.jpg-alilis_img'
        'https://img.alilis.space/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250903180350_3_5.jpg-alilis_img'
        'https://img.alilis.space/20250904095348_6_5.jpg-alilis_img',
        'https://img.alilis.space/20250904095347_5_5.jpg-alilis_img',
        'https://img.alilis.space/20250904095346_4_5.jpg-alilis_img'
      ],
      createDate: '2024-11-20'
    }
  ]);
</script>  
