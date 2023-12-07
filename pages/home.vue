<template>
  <div class="home-page-content">
    <!-- <figure>
      <div class="img-box">
        <img src=""
          alt="">
      </div>

      <figcaption></figcaption>
    </figure> -->

    <section class="posts-bar" v-if="sidebar.size">
      <div class="posts-block" v-for="([year, posts]) in sidebar.entries()">
        <template v-if="posts.length">
          <div class="years">{{ year }}年</div>

          <ul v-for="(post, index) in posts">
            <li class="posts" @click.stop="goto(`${post.url}`)">
              <span class="post-title">{{ `${post.titleTemplate}` }}</span>
                <span class="dotted"></span>
                <span class="post-create-date">{{ post.createDate.slice(0, 10) }}</span>
            </li>
          </ul>
        </template>
      </div>
    </section>

    <section class="empty-bar" v-else></section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vitepress'
import { data as posts } from './posts.data.js'
import { usePostList } from './hooks'

const router = useRouter();
const sidebar = ref(usePostList(posts));

const goto = (params) => {
  router.go(params)
}
</script>

<style lang="scss" scoped>
.home-page-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;

}

.posts-bar {
  width: 55%;
  height: 100%;
  margin: 4em auto;

  .posts-block+.posts-block {
    margin-top: 2em;
  }

  .years {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 1em;
  }

  .posts {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 4px 18px;
    border-radius: 4px;

    .dotted {
      flex: 1;
      margin: 0 16px;
      border-top: 1px dashed #d8dad9;
    }

    &:hover {
      background-color: rgba(239, 240, 240, .3);
      font-weight: 600;
    }
  }
}

@media screen and (max-width: 767px) {
  /* 手机端样式 */
  .posts-bar {
    width: 85%;
    margin: 2em auto;
  }
}

</style>