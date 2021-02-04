//这是tyb写的js
import axios from 'axios'
axios.defaults.baseURL = 'api'
import Vue from 'vue'
const base = '/E-A02/'

let getInvoiceList = (data) => {
  let url = base + '/invoiceView/getInvoiceList'
  return axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    .catch((error) => {
      handelErroer(error, url)
    })
}

let handelErroer = (error, url) => {
  if (error.response) {
    Vue.prototype.$message.error(
      'Error:状态码' +
        error.response.status +
        ';' +
        JSON.stringify(error.response.data)
    )
    console.log(error.response)
  } else if (error.request) {
    console.log('请求没有收到响应')
    Vue.prototype.$message.error(
      'Error:请求' + axios.defaults.baseURL + url + '没有收到响应'
    )
    console.log(error.request)
  } else {
    Vue.prototype.$message.error('Error:' + error.message)
    console.log('Error', error.message)
  }
  console.log(error.config)
}

export { getInvoiceList }
