<template>
  <div class="comments">
    <Giscus v-if="showComment" :repo="giscusConfig.repo" :repo-id="giscusConfig.repoId" :category="giscusConfig.category"
      :category-id="giscusConfig.categoryId" :mapping="giscusConfig.mapping"
      :reactions-enabled="giscusConfig.reactionsEnabled" :emit-metadata="giscusConfig.emitMetadata"
      :input-position="giscusConfig.inputPosition" :theme="isDark ? 'dark' : 'light'" :lang="giscusConfig.lang"
      :loading="giscusConfig.loading" />
  </div>
</template>

<script setup>
import { reactive, ref, watch, nextTick } from "vue";
import { useData, useRoute } from "vitepress";
import Giscus from '@giscus/vue'

const route = useRoute();
const { isDark } = useData();

// params generate in https://giscus.app/zh-CN
const giscusConfig = reactive({
	repo: "aweirdocc/alilis-blog",
	repoId: "R_kgDOKxvI7A",
	category: "Q&A",
	categoryId: "DIC_kwDOKxvI7M4CbkCv",
	mapping: "title",
	strict: "0",
	reactionsEnabled: "1",
	emitMetadata: "0",
	inputPosition: "top",
	lang: "zh-CN",
	loading: "lazy",
});

const showComment = ref(true);
watch(
	() => route.path,
	() => {
		showComment.value = false;
		nextTick(() => {
			showComment.value = true;
		})
	},
	{
		immediate: true,
	}
);

</script>