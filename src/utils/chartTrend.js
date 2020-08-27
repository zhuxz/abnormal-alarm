/**
 * 趋势图相关函数
 */
import { alarms } from '@/utils/alarm'

/**
 * 严重程度参数
 */
export const levelCategories = [
  'product',
  alarms[0][2],
  alarms[1][2],
  alarms[2][2]
]

/**
 * 趋势图echarts组件基础参数配置
 */
export const chartTrendOption = {
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10
  },
  tooltip: {
    trigger: 'axis',
    showContent: true
  },
  dataset: {
    source: [levelCategories]
  },
  xAxis: [
    { type: 'category', gridIndex: 1 },
    { type: 'category', gridIndex: 0 }
  ],
  yAxis: [
    { gridIndex: 1 },
    { gridIndex: 0 }
  ],
  grid: [
    { bottom: '55%', left: 50, right: 90 },
    { top: '55%', left: 50, right: 90 }
  ],
  series: [
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
  ]
}
