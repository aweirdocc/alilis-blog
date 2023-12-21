<template>
  <div class="aside-bar">
    <span class="t" @click="handle2Top">
      ↕️ TOP
    </span>
    <span class="t" @click="back2Home">
      返回主页
    </span>
  </div>
</template>

<script setup>
import { useRouter } from 'vitepress';
import { scrollToTop, scrollToBottom, getScrollTop } from '@weebat/utils';

const router = useRouter();

const handle2Top = () => {
  const scrollTop = getScrollTop();
  if (scrollTop) {
    scrollToTop();
  } else {
    scrollToBottom();
  }
}

const back2Home = () => {
  router.go('/')
}
</script>

<style lang="scss" scoped>
.t {
  margin-left: 1rem;
  cursor: pointer;
}

.aside-bar {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 100px;

  span+span {
    margin-top: 10px;
  }

  span {
    position: relative;
    display: inline-block;
    transition: all .4s;

    &:after {
      content: '';
      width: 100%;
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #259deb;
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }

    &:hover {
      background: linear-gradient(to right, #259deb 10%, #259deb 70%);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;

      &:after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }
  }
}
</style>
