<template>
  <svg :class="['svg-icon', svgClass]" :width="`${size}`" :height="`${size}`"  aria-hidden="true">
      <use :xlink:href="iconName" />
  </svg>
</template>

<script setup name="SvgIcon">
import { computed } from 'vue'

const props = defineProps({
  svgClass: {
    type: String,
    default: () => ''
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 25
  }
});

const iconName = computed(() => {
  return `#icon-${props.name}`
})
</script>

<style lang="scss" scoped>
.svg-icon {
  fill: currentColor;
}
</style>