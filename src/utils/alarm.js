/**
 * 警告相关函数与配置
 */
import { regions } from '@/utils/chartMap'
import { mockDateTime } from '@/utils/common'

export const alarms = [
  ['1', '服刑人员冲击大门', '严重', '#f56c6c'],
  ['2', '服刑人员打架斗殴', '紧急', '#e6a23c'],
  ['3', '部分区域停电', '常规', '#67c23a']
]

/**
 * 随机生成一条警告数据
 */
export function generateAlarmData () {
  let idx = Math.floor(Math.random() * alarms.length)
  let regionIdx = Math.floor(Math.random() * regions.length)
  return {
    id: Math.ceil((Math.random() * 100000000)),
    occurredAt: mockDateTime(),
    region: regions[regionIdx][0],
    coord: regions[regionIdx][1],
    level: alarms[idx][0],
    msg: alarms[idx][1],
    status: 0
  }
}
