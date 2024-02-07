<template>
  <div class="couplet">
    <div class="couplet-subject">
      <p>
        <label for="couplet-subject-input">主题：</label>
        <el-input id="couplet-subject-input" v-model="subject">
          <template #append>
            <el-button @click="generateCouplet">{{ generatedFlag ? '再来一次' : '一键生成' }}</el-button>
          </template>
        </el-input>
      </p>

      <p v-if="couplet.length">
        <label for="couplet-subject-input">横批：</label>
        <el-input id="couplet-subject-input" v-model="couplet[2]" disabled></el-input>
      </p>
      <p v-if="couplet.length">
        <label for="couplet-subject-input">上联：</label>
        <el-input id="couplet-subject-input" v-model="couplet[0]" disabled></el-input>
      </p>
      <p v-if="couplet.length">
        <label for="couplet-subject-input">下联：</label>
        <el-input id="couplet-subject-input" v-model="couplet[1]" disabled></el-input>
      </p>
    </div>

    <div class="couplet-wrapper" v-if="!isLoading && couplet.length" v-loading="isLoading">
      <div ref="coupletRef" class="couplet-detail">
        <p class="couplet-detail-title">{{ couplet[2] }}</p>
        <div class="couplet-detail-main">
          <p class="couplet-detail-left">{{ couplet[0] }}</p>
          <p class="couplet-detail-right">{{ couplet[1] }}</p>
        </div>
      </div>

      <el-button class="download-btn" type="primary" @click="handleDownload">保存为图片</el-button>
    </div>

    <div v-else-if="isLoading && !couplet.length" class="loading">
      <p>AI 超脑正在疯狂构建, 请稍等...</p>
    </div>
    <div v-else-if="!isLoading && !couplet.length"></div>


    <p class="footer">Powered by <a href="https://chat.deepseek.com/">DeepSeek</a> </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElInput, ElButton, vLoading } from 'element-plus';
import html2canvas from 'html2canvas';

const subject = ref('对龙年美好祝福');
const couplet = ref([]);
const coupletRef = ref(null);
const isLoading = ref(false);
const generatedFlag = ref(false);


const generateCouplet = async () => {
  isLoading.value = true;
  couplet.value = [];

  const data = await fetch('https://j41ez3hhzz.us.aircode.run/couplet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subject: `给我写一副对联，主题是${subject.value}，请按上联、下联和横批的顺序返回给我。`,
    })
  }).then(res => res.json());

  isLoading.value = false;
  if (data.state === 'success') {
    const coupletMessage = data.choices[0]?.message;

    !generatedFlag.value && (generatedFlag.value = true);

    if (coupletMessage) {
      const firstCoupletRegex = /上联：(.*?)\n/;
      const secondCoupletRegex = /下联：(.*?)\n/;
      const titleCoupletRegex = /横批：(.*)/;

      [firstCoupletRegex, secondCoupletRegex, titleCoupletRegex].forEach((regex) => {
        if (coupletMessage.match(regex)) {
          couplet.value.push(coupletMessage.match(regex)[1])
        }
      })

      localStorage.setItem('couplet', JSON.stringify(couplet.value));
    }
  }
}

onMounted(() => {
  const coupletCache = localStorage.getItem('couplet');

  if (coupletCache) {
    couplet.value = JSON.parse(coupletCache);
  }
})

const handleDownload = () => {
  html2canvas(coupletRef.value).then(canvas => {
    var context = canvas.getContext("2d");
    context.fillStyle = 'red';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const link = document.createElement('a');

    link.href = canvas.toDataURL("image/png");
    link.download = 'couplet';
    link.click();
  })
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'couplet';
  src: url('./fonts/ZhiMangXing-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.couplet {
  padding-top: 25px;

  &-wrapper {
    position: relative;

    .download-btn {
      width: 120px;
      margin: 20px auto;
      position: absolute;
      left: 50%;
      bottom: -10%;
      transform: translateX(-50%);
    }
  }

  &-subject {
    padding: 0 20px;

    p {
      width: 100%;
      display: flex;
      align-items: center;
    }


    label {
      min-width: 60px;
    }
  }

  &-detail {
    width: 80%;
    font-family: 'couplet';
    font-size: 2.6rem;
    font-weight: 700;
    background-color: transparent;
    margin: 0 auto;
    text-align: center;
    margin-top: 50px;
    padding: 25px;

    &-main {
      display: flex;
      justify-content: space-between;
    }

    &-title,
    &-left,
    &-right {
      background-color: #ff2121;
      color: #eacd76;
    }

    &-title {
      position: relative;
      padding: 0.8rem 0;
      max-width: 50%;
      margin: 0 auto;
      margin-bottom: 40px;
      letter-spacing: .2rem;

      &::before,
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        width: 32px;
        height: 32px;
        background-image: url('/images/fu.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }

      &::before {
        left: 8px;
      }

      &::after {
        right: 8px;
      }
    }

    &-left,
    &-right {
      white-space: nowrap;
      writing-mode: vertical-lr;
      letter-spacing: 1rem;
      padding: 1.4rem 0.8rem 0;
      margin: 0;
    }
  }

  .loading {
    text-align: center;
    padding: 6rem;
  }


}

.footer {
  margin-top: 100px;
  text-align: center;
}
</style>