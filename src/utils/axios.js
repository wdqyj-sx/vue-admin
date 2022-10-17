import axios from 'axios'
import router from '@/router/index'
import config from '~/config'
import { ref } from 'vue'

axios.defaults.baseURL = config[import.meta.env.MODE].baseURL

//携带cookie
axios.defaults.withCredentials = true
//请求头,header信息
axios.defaults.headers['X-Requestd-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
//默认post请求，使用application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

//请求拦截器，内部根据返回值，重新组装，统一管理
axios.interceptors.response.use(res => {
  if(typeof res.data !== 'object'){
    alert('服务器异常!')
    return Promise.reject(res)
  }
  if(res.data.resultCode !==200) {
    if(res.data.message) alert(res.data.message)
    if(res.data.resultCode == 419)
    {
      router.push({path:'/login'})
    }
    return Promise.reject(res.data)
  }
  return res.data.data
})

export default axios