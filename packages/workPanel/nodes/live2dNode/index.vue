<template>
  <div class="live2d-node">
    <canvas ref="liveCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import hooks from '@blog/hooks';

const { usePixi } = hooks;
const liveCanvas = ref(null);

usePixi({
  view: liveCanvas,
  modelPath: '/models/hiyori/hiyori_free_t08.model3.json'
})

onMounted(async () => {});

</script>

<style lang="scss" scoped>
.live2d-node {
  width: 100%;
  height: 100%;
  cursor: cell;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>