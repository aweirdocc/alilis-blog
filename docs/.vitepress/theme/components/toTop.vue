<template>
  <div class="t" @click="handle2Top">
    ↕️ TOP 
  </div>
</template>

<script setup>
import { scrollToTop, scrollToBottom, getScrollTop } from '@weebat/utils';

const handle2Top = () => {
  const scrollTop = getScrollTop();
  if(scrollTop) {
    scrollToTop();
  } else {
    scrollToBottom();
  }
}
</script>

<style lang="scss" scoped>
.t {
  margin-left: 1rem;
  cursor: pointer;
}
</style>