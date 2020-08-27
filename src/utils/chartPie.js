/**
 * 饼图相关函数与配置
 */
const data = []

/**
 * 饼图echarts组件基础参数配置
 */
export const chartPieOption = {
  legend: {},
  tooltip: {
    trigger: 'axis',
    showContent: true
  },
  dataset: {
    source: [
      ['product'],
      ['严重'],
      ['紧急'],
      ['常规']
    ]
  },
  xAxis: { type: 'category' },
  yAxis: { gridIndex: 0 },
  grid: { top: '55%', left: '5%', right: '5%' },
  series: [
    { type: 'line', smooth: true, seriesLayoutBy: 'row' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row' },
    {
      type: 'pie',
      id: 'pieTotal',
      radius: '40%',
      center: ['30%', '30%'],
      label: {
        formatter: '{b}(总量): {@2012}\n({d}%)',
        position: 'inner'
      },
      data
    },
    {
      type: 'pie',
      id: 'pie',
      radius: '40%',
      center: ['70%', '30%'],
      label: {
        formatter: '{b}: {@2020}\n({d}%)',
        position: 'inner'
      },
      encode: {
        itemName: 'product',
        value: '2020',
        tooltip: '2020'
      }
    }
  ]
}
