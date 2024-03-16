<template>
  <div class="pinyin">
    <div class="pinyin-wrapper"> 
      <text-block :text="words"></text-block>

      <div class="operation" :style="{
        backgroundColor: bg,
      }">
        <el-input v-model.trim="words" placeholder="请输入汉字" clearable></el-input>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import textBlock from './components/textBlock.vue';
  import { ElInput } from 'element-plus';
  import { useColor } from '@blog/hooks';
  import { useWs } from './utils';

  const ws = useWs();
  const words = ref('');
  const bg = useColor('rgba(247, 206, 101, 0.3)', 'rgba(232, 230, 225, 0.43)');
  const wordColor = useColor();

  onMounted(() => {
    console.log(ws)
  });

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
    width: 70%;
    height: 100%;
  }

  ::v-deep .operation {
    position: absolute;
    display: flex;
    align-items: center;
    width: 60%;
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
    }
  }
}
</style>