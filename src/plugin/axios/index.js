import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import fileDownload from 'js-file-download'
// 创建一个错误
function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 返回登录页面
function goLogin () {
  const { path } = router.currentRoute
  if (path !== '/') {
    router.replace({
      name: 'login'
    })
  }
}

// 记录和显示错误
function errorLog (error) {
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    console.log('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 3 * 1000
  })
}

// 创建一个 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_API,
  baseURL:
    process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_API,
  timeout: 40000 // 请求超时时间
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    console.log(response)
    const {
      headers: {
        'content-disposition': contentDisposition
      },
      data: dataAxios
    } = response

    // 通过此字段有值，判断为文件下载
    if (contentDisposition) {
      fileDownload(
        response.data,
        decodeURIComponent(contentDisposition.split('=')[1])
      )
      // 正常返回数据
      return dataAxios
    }

    const { data, status } = dataAxios
    switch (status) {
      case 200 || undefined || 1:
        return data
      case 401:
        goLogin()
        break
      case undefined:
        return dataAxios
      default:
        errorCreate(`${dataAxios.msg}`)
        break
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          goLogin()
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求地址出错'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
