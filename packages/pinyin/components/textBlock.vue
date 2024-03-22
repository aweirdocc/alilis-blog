<template>
  <div class="text-block" @click="handlePlay">
    <p class="text-block-line" v-for="(line, lineIdx) in lines" @mouseover="(text.length) && (isHover = true)"
      @mouseout="isHover = false" :style="{
    backgroundColor: isHover ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
    cursor: 'pointer',
  }">
      <span class="text-block-item" :style="{
    fontSize: config.textSize + 'rem',
    lineHeight: config.textSize + 'rem',
  }" v-for="(item, textIdx) in line">
        <i class="tone" :style="{
    fontSize: config.toneSize + 'rem',
    lineHeight: config.toneSize + 'rem',
  }">{{ pinyinData[lineIdx][textIdx] }}</i>
        {{ item }}
      </span>
    </p>

    <el-icon v-show="isHover" :size="15" class="sound-icon">
      <Headset />
    </el-icon>
  </div>
</template>

<script setup>
import { ref, watch, toRefs, computed } from 'vue';
import { Headset } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { pinyin } from 'pinyin-pro';
import usePinyin, { statusMap } from '../usePinyin';

function splitStringByPunctuation(text) {
  // 创建一个正则表达式，匹配常见的中英文标点符号
  const punctuationRegex = /[，。！？、；：“”‘’（）《》【】\s]+/g;

  // 使用正则表达式分割字符串
  return text.split(punctuationRegex).filter(Boolean);
}

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

      breakWord: '，',

      textSize: 1.5,
      toneSize: 1,
    })
  }
})

const { text, config } = toRefs(props);

const pinyinData = ref('');
const lines = ref([]);
const isHover = ref(false);
const pinyinIns = ref(null);
const throttle = ref(false);

const gridLength = computed(() => {
  const max = Math.max(...lines.value.map(line => line.length));
  return max > 8 ? 9 : max;
})

function handlePlay() {
  if (!throttle.value) {
    pinyinIns.value = usePinyin(text.value);
    throttle.value = true;

    watch(() => pinyinIns.value.ttsStatus, (status) => {
      console.log(status);
      
      if (status === statusMap[4]) { 
        throttle.value = false;
      }
    })
  }
}

watch(
  () => text.value,
  (val) => {
    lines.value = splitStringByPunctuation(val);

    pinyinData.value = lines.value.map(line => {
      return pinyin(val, {
        toneType: config.isShowTone ? 'none' : 'symbol',
        type: 'array'
      })
    })
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.text-block {
  width: 100%;
  height: 100%;
  padding: 0 0 80px 0;
  overflow: auto;
  position: relative;

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
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.sound-icon {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>