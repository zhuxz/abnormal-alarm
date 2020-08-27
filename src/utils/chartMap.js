/**
 * 首页地图相关函数
 */
import { alarms } from '@/utils/alarm'

export const geoCoordMap = {
  合肥: [117.283042, 31.86119],
  芜湖: [118.376451, 31.326319],
  蚌埠: [117.363228, 32.939667],
  淮南: [117.018329, 32.647574],
  马鞍山: [118.507906, 31.689362],
  淮北: [116.794664, 33.971707],
  铜陵: [117.816576, 30.929935],
  安庆: [117.043551, 30.50883],
  黄山: [118.317325, 29.709239],
  滁州: [118.316264, 32.303627],
  阜阳: [115.819729, 32.896969],
  宿州: [116.984084, 33.633891],
  六安: [116.507676, 31.752889],
  亳州: [115.782939, 33.869338],
  池州: [117.489157, 30.656037],
  宣城: [118.757995, 30.945667]
}

export const regionIdMap = {
  合肥: 1,
  芜湖: 2,
  蚌埠: 3,
  淮南: 4,
  马鞍山: 5,
  淮北: 6,
  铜陵: 7,
  安庆: 8,
  黄山: 9,
  滁州: 10,
  阜阳: 11,
  宿州: 12,
  六安: 13,
  亳州: 14,
  池州: 15,
  宣城: 16
}

export const regions = [
  ['合肥', [117.283042, 31.86119]],
  ['芜湖', [118.376451, 31.326319]],
  ['蚌埠', [117.363228, 32.939667]],
  ['淮南', [117.018329, 32.647574]],
  ['马鞍山', [118.507906, 31.689362]],
  ['淮北', [116.794664, 33.971707]],
  ['铜陵', [117.816576, 30.929935]],
  ['安庆', [117.043551, 30.50883]],
  ['黄山', [118.317325, 29.709239]],
  ['滁州', [118.316264, 32.303627]],
  ['阜阳', [115.819729, 32.896969]],
  ['宿州', [116.984084, 33.633891]],
  ['六安', [116.507676, 31.752889]],
  ['亳州', [115.782939, 33.869338]],
  ['池州', [117.489157, 30.656037]],
  ['宣城', [118.757995, 30.945667]]
]

/**
 * 地图echarts组件基础参数配置
 */
export const mapOption = {
  title: {
    text: '安徽省监狱异常监测',
    subtext: '',
    sublink: '',
    left: 'center',
    textStyle: {
      color: '#fff'
    },
    padding: 20
  },
  tooltip: {
    trigger: 'item',
    formatter (item) {
      return [
        '<p style="text-align: left; color: ' + (alarms[parseInt(item.data.data.level, 10) - 1][3]) + ';">',
        '地区：',
        item.name,
        '<br />',
        '级别：',
        alarms[parseInt(item.data.data.level, 10) - 1][2],
        '</p>'
      ].join('')
    }
  },
  geo: {
    map: 'anhui',
    roam: true,
    label: {
      normal: {
        show: true,
        textStyle: { color: '#FFF' }
      },
      emphasis: {
        show: true,
        textStyle: { color: '#000' }
      }
    },
    itemStyle: {
      normal: {
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [{
            offset: 0,
            color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        borderColor: 'blue'
      },
      emphasis: {
        areaColor: '#2a333d'
      }
    }
  },
  series: [
    {
      name: 'alarm',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: [],
      symbolSize (val) {
        return 10
      },
      showEffectOn: 'render',
      rippleEffect: {
        period: 2,
        brushType: 'stroke',
        scale: 5
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false
        }
      },
      itemStyle: {
        normal: {
          color (item) {
            return alarms[parseInt(item.data.data.level, 10) - 1][3]
          },
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    }
  ]
}

/**
 * 地图数据转换
 * @param { Array } data
 */
export const converMaptData = function (data) {
  let res = []
  let idx = -1
  for (let i = 0; i < data.length; i++) {
    let geoCoord = geoCoordMap[data[i].region]
    if (geoCoord) {
      let alarm = data[i]
      let region = alarm.region
      idx = res.findIndex((item) => {
        return item.name === region
      }, this)

      if (idx < 0) {
        res.push({
          name: alarm.region,
          data: alarm,
          value: geoCoord.concat(alarm.level)
        })
      } else if (alarm.level > res[idx].data.level) {
        continue
      } else {
        res.splice(idx, 1, {
          name: alarm.region,
          data: alarm,
          value: geoCoord.concat(alarm.level)
        })
      }
    }
  }
  return res
}
