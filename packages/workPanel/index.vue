<template>
  <div class="works-panel" ref="panelRef"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, reactive } from 'vue';
import hooks, { useColor }  from '@blog/hooks';

import LfUtil from './js/lfUtil';

const panelBgColor = useColor('#fff', '#000');
const panelRef = ref(null);
const lfUtil = ref(null);
const { usePixi } = hooks;

const { destoryAllRenderer } = usePixi();

// 基础配置项
const config = reactive({
  background: {
    backgroundColor: panelBgColor
  },
  // 网格
  grid: {
    visible: false,
  },
  // 辅助对齐线
  snapline: false,
  // 选中时的配置
  hideAnchors: true,
  hoverOutline: false,
  nodeSelectedOutline: false,
  edgeSelectedOutline: false,
  nodeTextEdit: false,
  edgeTextEdit: false,
  stopScrollGraph: true,
});

onMounted(() => {
  // 解决打包时报错 'window is not undefined' 的问题
  import('@logicflow/core').then(module => {
    window.LogicFlow = module.default;

    lfUtil.value = new LfUtil(panelRef, config);

    window.lf = lfUtil.value.lf;
  })
});


onUnmounted(() => {
  lfUtil.value = null;
  window.lf = null;
  
  destoryAllRenderer();
}) 

// TODO: 配置切换后更新
// watch(
//   config,
//   (val) => {
//   },
//   {
//     deep: true,
//   }
// )
</script>

<style lang="scss" scoped>
.works-panel {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>