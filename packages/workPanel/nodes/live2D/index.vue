<template>
  <div class="live2d-node">
    <canvas ref="liveCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as PIXI from 'pixi.js';

window.PIXI = PIXI;

const liveCanvas = ref(null);
let pixi = null;
let model = null;

onMounted(async () => {
  const { Live2DModel } = await import('pixi-live2d-display/cubism4');
  pixi = new PIXI.Application({
    view: liveCanvas.value,
    backgroundAlpha: 0,
  });

  // 打包后live2d资源会出现在dist/下，这里用相对路径就能引用到了
  model = await Live2DModel.from('/models/hiyori/hiyori_free_t08.model3.json');
  pixi.stage.addChild(model);
  model.scale.set(0.15); // 调整缩放比例，一般原始资源尺寸非常大，需要缩小
});

onBeforeUnmount(() => {
  pixi = ref(null);
  model = ref(null);
});
</script>

<style lang="scss" scoped>
.live2d-node {
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>