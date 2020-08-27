/**
 * 功能公用函数库
 */

/**
 * 日期格式转换
 * @param { String } fmt
 * @param { Date } date
 */
export const dateFormat = (fmt, date) => {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(),
    'm+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'H+': date.getHours().toString(),
    'M+': date.getMinutes().toString(),
    'S+': date.getSeconds().toString()
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

/**
 * 判断变量是否为数组
 * @param {*} variable
 */
export const isArray = (variable) => {
  return Array.isArray(variable)
}

/**
 * 日期按照天数加减
 * @param {Date} timeAt
 * @param {Number} offset
 */
export const getOffsetDayTime = (timeAt, offset) => {
  return new Date(timeAt.setDate(timeAt.getDate() + offset))
}

/**
 * 日期按照月数加减
 * @param {Date} timeAt
 * @param {Number} offset
 */
export const getOffsetMonthTime = (timeAt, offset) => {
  return new Date(timeAt.setMonth(timeAt.getMonth() + offset))
}

/**
 * 在当前时间基础上向前减1-7天
 */
export const mockDateTime = () => {
  let dateNow = new Date()
  let dayOffset = -1 * Math.floor(Math.random() * 7)
  return dateFormat('YYYY-mm-dd HH:MM:SS', getOffsetDayTime(dateNow, dayOffset))
}

/**
 * 绑定window对象事件
 * @param {Object} obj 要绑定事件的元素
 * @param {String} ev 要绑定的事件
 * @param {Function} fn 绑定事件的函数
 */
export function addEvent (obj, ev, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(ev, fn, false)
  } else if (obj.attachEvent) {
    obj[ev + fn] = function () {
      fn.call(obj)
    }
    obj.attachEvent('on' + ev, obj[ev + fn])
  } else {
    obj['on' + ev] = fn
  }
}

/**
 * 解除window对象事件绑定
 * @param {Object} obj 要解除绑定事件的元素
 * @param {String} ev 解除绑定的事件
 * @param {Function} fn 解除绑定事件的函数
 */
export function removeEvent (obj, ev, fn) {
  if (obj.removeEventListener) {
    obj.removeEventListener(ev, fn)
  } else if (obj.detachEvent) {
    obj.detachEvent('on' + ev, obj[ev + fn])
  } else {
    obj['on' + ev] = null
  }
}
