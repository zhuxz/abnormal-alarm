<!-- 对比图 -->
<template>
  <div id="chartTrend"></div>
</template>

<script>
import { chartTrendOption, levelCategories } from '@/utils/chartTrend'
import { regions } from '@/utils/chartMap'
import { addEvent, removeEvent } from '@/utils/common'

export default {
  name: 'ChartTrend',
  props: {
    trendData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      map: null
    }
  },
  watch: {
    /**
     * 监控父组件数据传递，数据变化时刷新图表
     */
    trendData (newData, oldData) {
      this.refresh(newData)
    }
  },
  mounted () {
    this.init()
    addEvent(window, 'resize', this.chartResize)
  },
  destroyed () {
    removeEvent(window, 'resize', this.chartResize)
  },
  methods: {
    init () {
      const mapContainer = document.getElementById('chartTrend')
      this.map = this.$echarts.init(mapContainer)
      let map = this.map
      map.setOption(chartTrendOption)
    },
    buildChartOption (data) {
      let temp = {}
      regions.forEach((item) => {
        temp[item[0]] = [0, 0, 0]
      })
      data.forEach((item, index) => {
        temp[item.region][item.level - 1] += 1
      })

      let source = []
      Object.keys(temp).forEach((item) => {
        if (temp[item].some((num) => { return num > 0 })) {
          source.push([item, ...temp[item]])
        }
      })
      let series = [
        { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
        { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
        { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
      ]
      source.forEach((item) => {
        series.push({ type: 'bar', seriesLayoutBy: 'row' })
      })
      source.unshift([...levelCategories])
      chartTrendOption.dataset.source = source
      chartTrendOption.series = series

      return chartTrendOption
    },
    refresh (data) {
      this.map.setOption(this.buildChartOption(data), true)
    },
    chartResize () {
      this.map && this.map.resize()
    }
  }
}
</script>
<style scoped>
#chartTrend {
  width: 100%;
  height: 100%;
}
</style>
