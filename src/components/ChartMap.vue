<!-- 地图 -->
<template>
  <div id="map" />
</template>

<script>
import { mapOption, converMaptData } from '@/utils/chartMap'
import { addEvent, removeEvent } from '@/utils/common'

export default {
  name: 'Map',
  props: {
    alarmData: {
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
    alarmData (newData, oldData) {
      let seriesData = converMaptData(newData)
      this.refresh(seriesData)
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
      const mapContainer = document.getElementById('map')
      this.map = this.$echarts.init(mapContainer)
      let map = this.map
      mapOption.series[0].data = converMaptData(this.alarmData)
      map.setOption(mapOption)
    },
    refresh (data) {
      let map = this.map
      let option = map.getOption()
      option.series[0].data = data
      map.setOption(option)
    },
    chartResize () {
      this.map && this.map.resize()
    }
  }
}
</script>

<style>
#map {
  height: 99%;
  width: 99%;
}
</style>
