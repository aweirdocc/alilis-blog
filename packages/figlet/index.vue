<template>
  <section>
    <p class="row">
      <label>输入：</label><el-input v-model="inputValue" @input="generate" clearable></el-input>
    </p>

    <p class="row">
      <label>字体：</label>
      <el-select v-model="selectedFont" @change="loadFont">
        <el-option v-for="(item) in fontsOption" placeholder="选择一个字体" :key="item.value" :label="item.label"
          :value="item.value">
          {{ item.label }}
        </el-option>
      </el-select>
    </p>

    <p class="row between">
      <div>
        <label>水平布局：</label>
        <el-select v-model="horizontalLayout">
          <el-option v-for="(item) in layoutOption" :key="item.value" :label="item.label" :value="item.value">
            {{ item.label }}
          </el-option>
        </el-select>
      </div>
      <!-- <div>
        <label>垂直布局：</label>
        <el-select v-model="verticalLayout">
          <el-option v-for="(item) in layoutOption" :key="item.value" :label="item.label" :value="item.value">
            {{ item.label }}
          </el-option>
        </el-select>
      </div> -->
    </p>

    <pre class="ascii">{{ data }} <i class="clipboard-icon" title="一键复制"></i></pre>
  </section>
</template>

<script setup>
import { ElSelect, ElOption, ElInput } from 'element-plus';
import { ref } from 'vue';
import { useColor, useFlglet } from '@blog/hooks';

const inputValue = ref("Alilis");
const selectedFont = ref('Standard');
const horizontalLayout = ref('default');
const verticalLayout = ref('default');
const preBorderColor = useColor('#c5c5c5');
const optionRef = ref({
  horizontalLayout,
  verticalLayout
})

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
}

.ascii {
  position: relative;
  text-align: center;
  margin-top: 20px;
  border: 1px solid v-bind(preBorderColor);
  border-radius: 15px;

  .clipboard-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-image: url('/svg/clippy.svg');
    position: absolute;
    right: 10px;
    top: 10px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }
}
</style>