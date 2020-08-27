import { fetchAlarmDatas, fetchUncheckAlarm } from '@/api/app'

export const state = () => ({
  alarmData: [],
  newAlarms: []
})

export const mutations = {
  /**
   * 缓存异常预警数据
   */
  cacheAlarmDataList (state, data) {
    state.alarmData.push(...data)
  },
  /**
   * 缓存用于动态展示的异常预警数据
   */
  cacheAlarmData (state, data) {
    let cacheData = state.alarmData
    cacheData.unshift(data)
    state.alarmData = cacheData

    // 缓存最新接受的异常预警数据
    state.newAlarms.push(data.id)
  },
  /**
   * 清除新增异常预警数据
   */
  clearNewAlarm (state) {
    state.newAlarms.length = 0
  }
}

export const actions = {
  /**
   * 获取异常预警数据
   * @param {Array} params 查询参数
   */
  fetchAlarmDatas ({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      if (!params) {
        resolve(fetchUncheckAlarm())
      } else {
        resolve(fetchAlarmDatas(params, state.alarmData))
      }
    })
  }
}
