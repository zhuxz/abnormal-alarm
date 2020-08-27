import { generateAlarmData } from '@/utils/alarm'

/**
 * 模拟返回前端访问首页历史预警数据
 */
export function fetchUncheckAlarm () {
  return {
    data: [
      generateAlarmData(),
      generateAlarmData(),
      generateAlarmData()
    ]
  }
}

/**
 * 模拟过滤查询全部预警数据
 * @param {Array} params 查询条件
 * @param {Array} defautData 默认值
 */
export function fetchAlarmDatas (params, defautData) {
  let retVal = []

  // 监所过滤器
  const filterRegion = ({ region }, item) => {
    return item.region === region
  }

  // 严重程度过滤器
  const filterLevel = ({ level }, item) => {
    return item.level === level
  }

  // 日期过滤器
  const filterDate = ({ fromAt, toAt }, item) => {
    return item.occurredAt >= fromAt && item.occurredAt <= toAt
  }

  let filters = []
  params.region && filters.push(filterRegion)
  params.level && filters.push(filterLevel)
  params.fromAt && filters.push(filterDate)

  if (filters.length) {
    retVal = defautData.filter((item) => {
      return filters.every((filter) => {
        return filter(params, item)
      })
    })
  } else {
    retVal = defautData.map((item) => {
      return item
    })
  }

  let startIndex = params.pageSize * (params.currentPage - 1)
  startIndex >= retVal.length && (startIndex = 1)

  return {
    pageSize: params.pageSize,
    currentPage: params.currentPage,
    total: retVal.length,
    data: retVal.slice(startIndex, startIndex + params.pageSize)
  }
}
