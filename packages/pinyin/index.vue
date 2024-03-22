<template>
  <div class="pinyin">
    <div class="pinyin-wrapper"> 
      <text-block :text="words"></text-block>

      <div class="operation" :style="{
        backgroundColor: bg,
      }">
        <el-input v-model="words" placeholder="天青色等烟雨，而我在等你" clearable></el-input>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import textBlock from './components/textBlock.vue';
  import { ElInput } from 'element-plus';
  import { useColor } from '@blog/hooks';
  import { getClientWidth } from '@weebat/utils';

  const words = ref('');
  const bg = useColor('rgba(247, 206, 101, 0.3)', 'rgba(232, 230, 225, 0.43)');
  const wordColor = useColor();
  const pad = getClientWidth() < 450 ? '85%' : '40%';
</script>

<style lang="scss" scoped>
.pinyin {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  overflow: hidden;

  &-wrapper {
    position: relative;
    width: v-bind(pad);
    height: 100%;
  }

  ::v-deep .operation {
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    border-radius: 30px;
    padding: 0 20px;

    .el-input__wrapper {
      background-color: transparent !important;
      box-shadow: none;
    }
    .el-input__inner {
      color: v-bind(wordColor);
      text-align: center;
    }
  }
}
</style>