<script setup>
import { withBase } from 'vitepress'
import { onMounted, ref } from 'vue'
import mediumZoom from 'medium-zoom'

defineProps({
  src: String,
  width: String,
  height: String,
})

const imgRef = ref(null)

onMounted(() => {
  mediumZoom(imgRef.value, { background: 'var(--vp-c-bg)' });
})
</script>

<template>
  <img ref="imgRef" :src="withBase(src)" :style="{ width, height }">
</template>

<style>
.medium-zoom-overlay {
  z-index: 20;
}

.medium-zoom-image {
  z-index: 21;
  margin: 0 auto;
}</style>