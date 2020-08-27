const getters = {
  // 缓存的异常预警数据
  alarmData: state => state.alarmData,
  // 缓存的客户端新接收的预警数据
  newAlarms: state => state.newAlarms
}

export default getters
