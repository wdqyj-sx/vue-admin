export function localGet(key) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  }catch(error){
    return value
  }
}

export function localSet(key,value) {
  window.localStorage.setItem(key,JSON.stringify(value))
}

export function localRemove(key) {
  window.localStorage.removeItem(key)
}

export const uploadImgServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/file'
export const patchMap = {
  index:'首页',
  add:'添加商品',
  login:'登录',
  swiper:'轮播图配置',
  hot:'热销商品配置',
  new:'新品上线配置',
  recommend:'为你推荐配置'
}