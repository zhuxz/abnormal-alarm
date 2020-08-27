/**
 * 获取静态资源引用路径
 * @param {String} destPath 目标路径
 */
const staticPath = (destPath) => {
  return (process.env.DEPLOY_ENV === 'GH_PAGES' ? '/abnormal-alarm/' : '/') + destPath
}

export default {
  staticPath
}
