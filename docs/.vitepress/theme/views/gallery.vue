<template>
  <section class="gallery">
    <div class="gallery-bar">
      <t-image-viewer v-for="(galleryItem, index) in props.galleryGroups" :key="galleryItem.name" v-model="visible[index]"
        :images="galleryItem.imgUrlList" :title="galleryItem.name">
        <template #trigger>
          <div class="preview-img">
            <img alt="test" :src="galleryItem.bannerImg" class="preview-img--img" />
            <div class="preview-img--hover" @click="onOpen(index)">
              <p style="font-size: 16px">点击预览</p>
              <p>当前图册创建于 {{ galleryItem.createDate }}</p>
            </div>
            <div class="preview-img--footer">
              <span class="preview-img--title">{{ galleryItem.name }}</span>
              <span class="preview-img--total">共{{ galleryItem.imgUrlList.length || 0 }}张</span>
            </div>
          </div>
        </template>
      </t-image-viewer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { ImageViewer as TImageViewer } from 'tdesign-vue-next';
import { IGalleryItem } from './types'
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

const props = defineProps<{
  galleryGroups: IGalleryItem[]
}>()
const visible = reactive<boolean[]>([]);

watch(
  () => props.galleryGroups,
  (val) => {
    if (val.length) {
      visible.push(...new Array(val.length).fill(false, 0, -1));
    }
  }, {
  immediate: true
})


const onOpen = (i) => {
  visible[i] = true;
};
</script>

<style lang="scss" scoped>
.gallery-bar {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  justify-items: center;
  grid-gap: 20px 0;
  width: 70%;
  margin: 20px auto;
}


.preview-img {
  width: 200px;
  height: 260px;
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  -webkit-box-shadow: -6px 1px 37px 0px rgba(136, 147, 148, 0.68);
  -moz-box-shadow: -6px 1px 37px 0px rgba(136, 147, 148, 0.68);
  box-shadow: -6px 1px 37px 0px rgba(136, 147, 148, 0.68);
  cursor: pointer;
}

.preview-img--hover {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  line-height: 22px;
  transition: 0.2s;
  font-size: 14px;
}

.preview-img:hover .preview-img--hover {
  opacity: 1;
  cursor: pointer;
}

.preview-img--img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
  position: absolute;
}

.preview-img--footer {
  padding: 0 16px;
  height: 56px;
  width: 100%;
  line-height: 56px;
  font-size: 14px;
  position: absolute;
  bottom: 0;
  color: #fff;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  box-sizing: border-box;
}

.preview-img--title {
  flex: 1;
  font-size: 18px;
}

@media screen and (max-width: 767px) {

  /* 手机端样式 */
  .gallery-bar {
    width: 85%;
    grid-template-columns: repeat(1, 85%);
    grid-gap: 25px 0;
    justify-content: center;

    .preview-img {
      width: 220px;
    }
  }
}
</style>