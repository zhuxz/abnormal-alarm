/**
 * 注册全局echarts组件；注册安徽省地图；
 */
import Vue from 'vue'
import echarts from 'echarts'
import china from 'echarts/map/json/province/anhui.json'

echarts.registerMap('anhui', china)

Vue.prototype.$echarts = echarts
