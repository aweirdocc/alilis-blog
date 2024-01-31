<template>
  <section class="img-to-url">
    <el-upload class="uploader" action="#" :show-file-list="false" :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="uploaded-img" />

      <el-icon v-else class="uploader-icon" title="添加图片">
        <Plus />
      </el-icon>
    </el-upload>

    <div class="language- dataset" ref="datasetRef">
      <div class="url-data" ref="dataRef">{{ imageUrl || '还未生成 Base 64' }}</div>
      <button class="copy" ref="copyBtnRef" title="一键复制" @click="handleCopy('url')"></button>
    </div>
  </section>

  <el-button class="link-btn" type="primary" style="width: 100%" @click="handleCopy('link')">复制HTML图片链接</el-button>
</template>

<script setup>
import { ElUpload, ElIcon, ElMessage, ElButton, ElLoading  } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { file2Blob, blob2Base64, useCopy, copyToClipboard } from '@blog/hooks'

const imageUrl = ref('');
const imageUrlLink = ref('');

const dataRef = ref(null);
const copyBtnRef = ref(null);
const datasetRef = ref(null);

const lodingInstance = ref(null);

// 格式校验
const beforeAvatarUpload = (rawFile) => {
  if (!['image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/jpeg'].includes(rawFile.type)) {
    ElMessage.error('请上传一个正确格式的图片文件！');

    return false;
  }

  lodingInstance.value = ElLoading.service({
    target: datasetRef.value
  })

  return true
}


const handleAvatarSuccess = (response, uploadFile) => {
  const imgFile = uploadFile.raw;
  const blob = file2Blob(imgFile);

  blob2Base64(blob, (val) => {
    imageUrl.value = val;
    imageUrlLink.value = `<img src="${val}" />`

    lodingInstance.value.close();
    ElMessage.success('转换成功');
  });
}

const handleCopy = (type) => {
  if (type === 'url') {
    useCopy(dataRef, copyBtnRef);
  } else {
    if (imageUrlLink.value) {
      copyToClipboard(imageUrlLink.value);
    } else {
      ElMessage.info('请上传一个图片文件！');
    }
  }
}

</script>

<style lang="scss" scoped>
.img-to-url {
  display: flex;
  width: 100%;
  padding: 10px 0;
  justify-content: space-between;
  align-items: center;

  .dataset {
    position: relative;
    width: calc(100% - 180px);
    height: 200px;
    margin: 0;

    .url-data {
      height: 100%;
      text-align: center;
      border: 1px solid v-bind(preBorderColor);
      border-radius: 15px;
      overflow: auto;
      padding: 15px;
      font-size: 14px;
      word-wrap: break-word;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}

::v-deep .uploader {
  .el-upload {
    cursor: pointer;
    position: relative;
    width: 150px;
    height: 200px;
    border: 2px dashed var(--el-border-color);
    border-radius: 6px;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    margin: 0 auto;
  }

  &-icon {
    position: absolute;
    font-size: 28px;
    color: #8c939d;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>