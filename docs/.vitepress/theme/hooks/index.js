import { useData } from 'vitepress';
import { ref, watch } from 'vue';

const toTimestamp = (date) => +new Date(date);

export const usePostList = (posts = [], tag = '', sort = 1) => {
  // 为了保证排序的一致性，使用 Map 而不是对象
  const postMap = new Map();

  let postList = posts.reduce((acc, cur) => {
    const { url, frontmatter } = cur;
    const postYear = url.split('/')[2];

    const shouldHidden = frontmatter.isHidden || (tag.length && frontmatter.tag !== tag); 

    if (!shouldHidden) {
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
    }

    return acc;
  }, {})

  Object.keys(postList).sort((a, b) => { return sort ? +b - +a : +a - +b }).forEach((cur) => {
    const arr = postList[cur].sort((a, b) => { return sort ? toTimestamp(b.createDate) - toTimestamp(a.createDate) : toTimestamp(a.createDate) - toTimestamp(b.createDate) })

    postMap.set(cur, arr)
  });

  return postMap
}

export const useColor = (lightColor= '#000', darkColor= '#fff') => {
  const { isDark } = useData();
  const color = ref('');

  watch(
    () => isDark.value,
    (val) => {
      if (isDark.value) {
        color.value = darkColor;
      } else {
        color.value = lightColor;
      }
    },
    {
      immediate: true
    }
  )

  return color;
}