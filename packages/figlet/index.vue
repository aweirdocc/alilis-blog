<template>
  <section>
    <p class="row">
      <label>输入：</label><el-input v-model="inputValue" @input="generate" clearable></el-input>
    </p>

    <div class="row">
      <label>字体：</label>
      <el-select v-model="selectedFont" @change="loadFont">
        <el-option v-for="(item) in fontsOption" placeholder="选择一个字体" :key="item.value" :label="item.label"
          :value="item.value">
          {{ item.label }}
        </el-option>
      </el-select>
    </div>

    <p class="row">
      <label>限制宽度：</label><el-input-number v-model="fontWidth" :min="10" :max="100"></el-input-number>
    </p>

    <div class="row between">
      <div>
        <label>水平布局：</label>
        <el-select v-model="horizontalLayout">
          <el-option v-for="(item) in layoutOption" :key="item.value" :label="item.label" :value="item.value">
            {{ item.label }}
          </el-option>
        </el-select>
      </div>
      <div>
        <label>垂直布局：</label>
        <el-select v-model="verticalLayout">
          <el-option v-for="(item) in layoutOption" :key="item.value" :label="item.label" :value="item.value">
            {{ item.label }}
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="language- dataset">
      <pre class="ascii" ref="asciiRef">{{ data }}</pre>
      <button class="copy" ref="copyBtnRef" title="一键复制" @click="handleCopy"></button>
    </div>
  </section>
</template>

<script setup>
import { ElSelect, ElOption, ElInput, ElInputNumber } from 'element-plus';
import { ref } from 'vue';
import { useColor, useFlglet, useCopy } from '@blog/hooks';

const inputValue = ref("Alilis");
const selectedFont = ref('Standard');
const fontWidth = ref(80);
const horizontalLayout = ref('default');
const verticalLayout = ref('default');
const preBorderColor = useColor('#c5c5c5');
const optionRef = ref({
  horizontalLayout,
  verticalLayout,
  fontWidth
})
const asciiRef = ref(null);
const copyBtnRef = ref(null);

const { data, fonts, loadFont, generate, } = useFlglet(inputValue, optionRef);

const fontsOption = fonts.map(font => {
  return {
    label: font,
    value: font
  }
})

const layoutOption = ['default', "full", "fitted", "controlled smushing", "universal smushing"].map(font => {
  return {
    label: font,
    value: font
  }
});

const handleCopy = () => {
  useCopy(asciiRef, copyBtnRef);
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;

  &.between {
    justify-content: space-between;
  }

  label {
    min-width: 80px;
  }

  &>.el-input-number {
    width: 100%;
  }
}

.dataset {
  position: relative;

  .ascii {
    text-align: center;
    border: 1px solid v-bind(preBorderColor);
    border-radius: 15px;
    overflow: auto;
  }
}
</style>