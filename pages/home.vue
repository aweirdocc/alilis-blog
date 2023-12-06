<template>
  <div class="home-page-content">
    <!-- <figure>
      <div class="img-box">
        <img src=""
          alt="">
      </div>

      <figcaption></figcaption>
    </figure> -->

    <section class="posts-bar">
      <div v-for="(year) in Object.keys(sidebar)">
        <div class="years">{{ year }}</div>
        <ul class="posts" v-for="(post) in sidebar[year]">
          <li @click="goto(`${post.url}`)">
            <h2>{{ post.titleTemplate }}</h2>
          </li>
        </ul>
      </div>
    </section>
    
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vitepress'
  import { data as posts } from './posts.data.js'

  const router = useRouter();
  const sidebar = ref(null);

  sidebar.value = posts.reduce((acc, cur) => {
    const {url, frontmatter} = cur;
    const postYear = url.split('/')[2];
    console.log(frontmatter)
    if (acc[postYear]) {
      acc[postYear].push({
        ...frontmatter,
        url
      })
    } else {
      acc[postYear] = [{
        ...frontmatter,
        url
      }]
    }

    return acc;
  }, {})

  const goto = (params) => {
    router.go(params)
  }
</script>

<style lang="scss" scoped>
.home-page-content {
  width: 100%;
  height: 100%;

  overflow-y: auto;

  .posts-bar {
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}
</style>