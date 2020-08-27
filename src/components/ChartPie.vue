<!-- 饼图、趋势图 -->
<template>
  <div id="chartPie"></div>
</template>

<script>
import { chartPieOption } from '@/utils/chartPie'
import { alarms } from '@/utils/alarm'
import { addEvent, removeEvent } from '@/utils/common'

const reduceToSum = (prev, cur, idx) => {
  return prev + (idx > 0 ? cur : 0)
}

const getTotal = (arr) => {
  return arr.reduce(reduceToSum, 0)
}

export default {
  name: 'ChartPie',
  props: {
    pieData: {
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
    pieData (newData, oldData) {
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
      const mapContainer = document.getElementById('chartPie')
      this.map = this.$echarts.init(mapContainer)
      let map = this.map

      map.on('updateAxisPointer', function (event) {
        let xAxisInfo = event.axesInfo[0]
        if (xAxisInfo) {
          let dimension = xAxisInfo.value + 1
          map.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']}\n({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          })
        }
      })

      map.setOption(chartPieOption)
    },
    buildChartOption (pieData) {
      let temp = {}
      pieData.forEach((item, index) => {
        let key = item.occurredAt.substr(0, 10)
        if (temp[key] === undefined) {
          temp[key] = [0, 0, 0]
        }
        temp[key][item.level - 1] += 1
      })

      let source = [
        ['product'],
        [alarms[0][2]],
        [alarms[1][2]],
        [alarms[2][2]]
      ]
      let arrData = []
      Object.keys(temp).forEach((item) => {
        arrData.push([item, ...temp[item]])
      })
      arrData.sort((a, b) => {
        return parseInt(a[0].replace(/-/g, ''), 10) - parseInt(b[0].replace(/-/g, ''), 10)
      })
      arrData.forEach((item) => {
        source[0].push(item[0])
        source[1].push(item[1])
        source[2].push(item[2])
        source[3].push(item[3])
      })

      let totalData = []
      alarms.forEach((item, i) => {
        totalData.push({
          name: item[2],
          value: getTotal(source[i + 1])
        })
      })

      let defautX = source[0][1] ? source[0][1] : '2020'
      chartPieOption.dataset.source = source
      chartPieOption.series[3].data = totalData
      chartPieOption.series[4].label.formatter = '{b}: {@' + defautX + '}\n({d}%)'
      chartPieOption.series[4].encode.value = '{b}: {@' + defautX + '}\n({d}%)'
      chartPieOption.series[4].encode.tooltip = '{b}: {@' + defautX + '}\n({d}%)'

      return chartPieOption
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
#chartPie {
  width: 100%;
  height: 100%;
}
</style>
