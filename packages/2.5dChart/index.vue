<template>
  <div ref="chartRef" class="chart"></div>
  <p class="info">广东省地图</p>
  <img src="/images/mask.png" ref="imgRef" id="imgRef" v-show="false" style="width: 300px; height: 600px" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useChart from './useChart'

const chartRef = ref(null)
const imgRef = ref(null)
const { chartInstance, setOption } = useChart(chartRef)

onMounted(() => {
  setTimeout(() => {
    setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
      },
      geo: [
        {
          map: 'shanxi',
          aspectScale: 0.75, //长宽比
          layoutCenter: ['50%', '50%'],
          zoom: 1.1,
          roam: false,
          silent: true,
          label: {
            emphasis: {
              show: true,
            },
          },
          zIndex: 9,
          itemStyle: {
            areaColor: {
              image: imgRef.value,
              repeat: 'repeat',
            },
            shadowOffsetX: 0,
            shadowOffsetY: 15,
            shadowColor: '#22558f',
            borderWidth: 0,
          },
        },
        {
          map: 'shanxi',
          aspectScale: 0.75, //长宽比
          zlevel: -1,
          silent: true,
          layoutCenter: ['50%', '52%'],
          zoom: 1.1,
          roam: false,
          zIndex: 9,
          itemStyle: {
            shadowOffsetY: 19,
            shadowColor: '#36fffd',
            borderWidth: 0,
          },
        },
      ],
      series: [
        {
          type: 'map',
          roam: false,
          itemStyle: {
            areaColor: {
              // 背景贴图
              image: imgRef.value,
              repeat: 'repeat',
            },
            borderColor: '#fff',
            borderWidth: 2,
            emphasis: {
              areaColor: 'rgba(240, 155, 21, 0.7)',
            },
          },
          select: {
            disabled: true,
          },
          zoom: 1.1,
          map: 'shanxi', //使用
          data: [],
        },
      ],
    })
  }, 100);

})
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}

.info {
  text-align: center;
  font-size: 12px;
}
</style>