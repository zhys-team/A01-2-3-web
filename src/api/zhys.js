import axios from 'axios'
axios.defaults.baseURL = 'api'
import Vue from 'vue'

const base = '/E-A02/'

let getOriginalHead = (pageNum, pageSize, data) => {
  let url =
    base +
    'invoice-api/original/page?pageSize=' +
    pageSize +
    '&pageNum=' +
    pageNum
  return axios
    .post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      handelErroer(error, url)
    })
}

let getInvoiceHeads = (pageNum, pageSize, data) => {
  let url =
    base + 'invoice-api/page?pageSize=' + pageSize + '&pageNum=' + pageNum
  return axios
    .post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      handelErroer(error, url)
    })
}

let getOriginalBody = (str) => {
  let url = base + 'invoice-api/original/bodyList?docOrignum=' + str
  return axios.get(url, {}).catch((error) => {
    handelErroer(error, url)
  })
}

let getInvoiceHeadInfo = (docNum) => {
  let url = base + 'invoice-api/info/' + docNum
  return axios.get(url, {}).catch((error) => {
    handelErroer(error, url)
  })
}

let toAbolishAll = (docNum) => {
  let url = base + 'invoice-api/abolishAll?docNum=' + docNum
  return axios.get(url, {}).catch((error) => {
    handelErroer(error, url)
  })
}

let toAbolishGroup = (docNum, groupNum) => {
  let url =
    base + 'invoice-api/abolishOne?docNum=' + docNum + '&groupNum=' + groupNum
  return axios.get(url, {}).catch((error) => {
    handelErroer(error, url)
  })
}

let insertInvoice = (data) => {
  let url = base + 'invoice-api/save'
  return axios
    .post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      handelErroer(error, url)
    })
}

let delLeadingInvoice = (docNum) => {
  let url = base + 'invoice-api/del?docNum=' + docNum
  return axios.get(url).catch((error) => {
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

let toSubmit = (data) => {
  let url = base + 'invoice-api/submit'
  return axios
    .post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      handelErroer(error, url)
    })
}

let toCancelCommit = (docNum) => {
  let url = base + 'invoice-api/cancelCommit?docNum=' + docNum
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let toCancelAbolishAll = (docNum) => {
  let url = base + 'invoice-api/cancelAbolishAll?docNum=' + docNum
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let toCancelAbolishGroup = (docNum, groupNum) => {
  let url =
    base +
    '/invoice-api/cancelAbolishOne?docNum=' +
    docNum +
    '&groupNum=' +
    groupNum
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let toDelOriginal = (docNum) => {
  let url = base + "invoice-api/delOriginalByIds?docNums='" + docNum + "'"
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let customerList = () => {
  let url = base + 'customer-api/list'
  return axios.post(url).catch((error) => {
    handelErroer(error, url)
  })
}

export {
  getOriginalHead,
  getOriginalBody,
  insertInvoice,
  delLeadingInvoice,
  toSubmit,
  toCancelCommit,
  getInvoiceHeads,
  getInvoiceHeadInfo,
  toAbolishAll,
  toCancelAbolishAll,
  customerList,
  toDelOriginal,
  toAbolishGroup,
  toCancelAbolishGroup,
}
