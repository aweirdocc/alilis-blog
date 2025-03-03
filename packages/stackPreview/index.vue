<template>
  <div id="stack-previewer"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import sdk from '@stackblitz/sdk';

const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
});

function setupPreviewer() {
  try{
    if (!props.projectId) {return false}

    sdk.embedProjectId('stack-previewer', props.projectId, {
      forceEmbedLayout: true,
      view: 'preview',
      showSidebar: false,
      hideExplorer: true,
      hideNavigation: true
    })
  }catch(err) {
    console.log(err)
  }
}

onMounted(() => {
  setupPreviewer()
})
</script>

<style lang="scss" scoped>
#stack-previewer {
  width: 100%;
  height: 100%;
}
</style>
