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
      <div class="posts-block" v-for="([year, posts], index) in sidebar.entries()">
        <template v-if="posts.length">
          <div class="years">
            <p>
              <span>{{ year }}年</span>
              <el-tag v-if="tag && index === 0" class="post-tag" type="success" round closable @close="handleCloseTag">{{
                tag }}</el-tag>
            </p>

            <i class="rank-icon" v-if="index === 0" @click="rankChanged">
              <svg-icon :name="iconType"></svg-icon>
            </i>
          </div>

          <ul>
            <li v-for="(post) in posts" class="posts" @click.stop="goto(`${post.url}`)">
              <p class="post-title">
                <span class="post-title-name ell">{{ `${post.titleTemplate}` }}</span>
                <span class="tags" @click.stop="handleTag(post.tag)">[ {{ post.tag }} ]</span>
              </p>
              <span class="dotted"></span>
              <span class="post-create-date">{{ post.createDate.slice(0, 10) }}</span>
            </li>
          </ul>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ElTag } from 'element-plus'
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vitepress'
import { data as posts } from './posts.data.js'
import { usePostList, useColor } from '@blog/hooks'
import { setObjToUrlParams, getUrlParams } from '@weebat/utils';

const router = useRouter();
const sidebar = ref(usePostList(posts));

const iconType = ref('down');
const iconColor = useColor();
const tag = ref('');

const queryParams = computed(() => {
  if (typeof window != 'undefined') { 
    return `${window.location.href}`
  }
})

watch(
  () => queryParams.value,
  async (val) => {
    if (val) {
      const q = getUrlParams(val).get('tag');

      tag.value = q;
      sidebar.value = usePostList(posts, q || '', iconType.value === 'down' ? 1 : 0);
    }
  },
  {
    immediate: true
  }
)

const goto = (params) => {
  router.go(params)
}

const rankChanged = () => {
  iconType.value === 'down' ? iconType.value = 'up' : iconType.value = 'down';

  sidebar.value = usePostList(posts, '', iconType.value === 'down' ? 1 : 0);
}

const handleTag = (tag) => {
  const path = router.route.path;
  const params = setObjToUrlParams(path, { tag });

  if (typeof window != 'undefined') { 
    window.location.search = params;
  }
}

const handleCloseTag = () => {
  tag.value = '';

  if (typeof window != 'undefined') { 
    window.location.search = '';
  }
}

</script>

<style lang="scss" scoped>
.home-page-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;

}

.posts-bar {
  position: relative;
  width: 55%;
  // height: 100%;
  margin: 4em auto;
  z-index: 9;

  .posts-block+.posts-block {
    margin-top: 2em;
  }

  .years {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

    .post-title {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }

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

  .posts+.posts {
    margin-top: 1rem;
  }

  .rank-icon {
    display: block;
    float: right;
    cursor: pointer;

    .icon {
      fill: v-bind(iconColor);
    }
  }

  .tags {
    text-decoration: underline;
  }
}

.bg {
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 1;
}


.post-tag {
  margin-left: 10px;
}

@media screen and (max-width: 767px) {

  /* 手机端样式 */
  .posts-bar {
    width: 88%;
    margin: 2em auto;

    .posts {
      padding: 0;
    }

    .post-title-name {
      max-width: 80%;
    }
  }
}
</style>