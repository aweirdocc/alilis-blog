---
title: 2024
titleTemplate: 图片与Base64互转工具
description: 图片与Base64互转工具
createDate: 2024-01-30
tag: 工具  
---

# 图片与Base64互转工具

在往期的博文[《你了解文件流吗》](blob#base64)中我们有介绍到了 Base64 的具体使用方法。

这里是对图片与Base64互转的一个小工具。


## 图片生成 Base64

通过上传图片来转换成`Base64`字符串：

<Img2Url />

## Base64 预览图片

这里输入一个 `Base64` 字符串，来预览图片：

<el-input v-model="inputVal" class="url-input" placeholder="BaseURL" clearable> 
  <template #append>
    <el-button type="primary" :icon="SetUp" @click="handleShowImg" />
  </template>
</el-input>

<template v-if="isShowImg && inputVal.length">
  <div style="margin: 20px 0;">
    <zoom-img :src="inputVal" title="预览图片"/>
  </div>
</template>

<script setup>
  import Img2Url from '@blog/img2url';
  import { ref, watch } from 'vue';
  import { ElInput, ElButton } from 'element-plus';
  import { SetUp } from '@element-plus/icons-vue'
  

  const inputVal = ref('');
  const isShowImg = ref(false);

  const handleShowImg = () => {
    isShowImg.value = true;
  }

  watch(
    () => inputVal.value, 
    (val) => {
      if (!val.length) {
        isShowImg.value = false;
      }
    }
  )
</script>

<style lang="scss">
  .url-input {
    width: 100%;
    border: 1px solid #DCDFE6;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-input__wrapper {
      width: 80%;
      display: flex;
      align-items: center;

      .el-input__inner {
        width: 100%;
      }
    }
  }

</style>