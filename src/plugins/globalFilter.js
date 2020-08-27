import Vue from 'vue'
import globalFilters from '@/utils/globalFilters'
/**
 * 注册Vue全局过滤器
 */
Object.keys(globalFilters).forEach(key => Vue.filter(key, globalFilters[key]))

export default globalFilters
