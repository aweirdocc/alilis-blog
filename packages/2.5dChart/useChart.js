import { shallowRef, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import shanxi from './json/shanxi.json'

export default function useChart(chartRef) {
	const chartInstance = shallowRef(null)

	function resizeFn() {
		chartInstance.value?.resize()
	}

	function setOption(options) {
		if (chartInstance.value) {
			chartInstance.value.clear()
			chartInstance.value.setOption(options)
		}
	}

	onMounted(() => {
		if (chartRef) {
      console.log(shanxi)
      echarts.registerMap('shanxi', { geoJSON: shanxi })
			chartInstance.value = echarts.init(chartRef.value)

			window.addEventListener('resize', resizeFn)
		}
	})

	onBeforeUnmount(() => {
		window.removeEventListener('resize', resizeFn)

		if (chartInstance.value) {
			chartInstance.value?.dispose()
			chartInstance.value = null
		}
	})

	return {
		chartInstance,
		setOption
	}
}
