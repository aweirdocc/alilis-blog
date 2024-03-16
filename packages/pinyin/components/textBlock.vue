<template>
  <div class="text-block">
    <p class="text-block-line">
      <span class="text-block-item" :style="{
        fontSize: config.textSize + 'rem',
        lineHeight: config.textSize + 'rem',
      }" v-for="(item, index) in text" :key="index">
        <i class="tone">{{ pinyinData[index] }}</i>
        {{ item }}
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref, watch, toRefs, computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },

  config: {
    type: Object,
    default: () => ({
      // 是否显示方框
      isShowOutline: false,
      // 是否显示声调
      isShowTone: true,

      breakWord: ',',

      textSize: 6,
      toneSize: 16,
    })
  }
})

const { text, config } = toRefs(props);

import { pinyin } from 'pinyin-pro';

const pinyinData = ref('');


const gridLength = computed(() => {
  return text.value.length < 8 ? text.value.length : 8;
})

watch(
  () => text.value,
  (val) => {
    pinyinData.value = pinyin(val, {
      toneType: config.isShowTone ? 'none' : 'symbol',
      type: 'array'
    })
  }
);
</script>

<style lang="scss" scoped>
.text-block {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 60px;
  overflow: auto;

  &-line {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(v-bind(gridLength), minmax(10px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 10px;
    align-items: center;
    justify-items: center;
  }

  &-item {
    position: relative;
    display: inline-block;
    padding-top: 50px;
  }

  .tone {
    position: absolute;
    font-size: 22px;
    line-height: 22px;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>