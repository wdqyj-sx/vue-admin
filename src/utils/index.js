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

export const patchMap = {
  index:'首页',
  add:'添加商品',
  login:'登录'
}