//这是tyb写的js
import axios from 'axios'
axios.defaults.baseURL = 'api'
import Vue from 'vue'
import qs from 'qs' //如果没有安装qs包请使用 `npm install qs -D`进行安装
const base = '/e-invoice/'
// 打开会话
let openSession = () => {}

let startInvoice = (data) => {
  let url = base + '/invoice/startInvoice'
  return axios.post(url, data).catch((error) => {
    handelErroer(error, url)
  })
}
let stopInvoice = (data) => {
  let url = base + '/invoice/stopInvoice'
  return axios.post(url, data).catch((error) => {
    handelErroer(error, url)
  })
}
let startInvalid = (data) => {
  let url = base + '/invoice/startInvalid'
  return axios.post(url, data).catch((error) => {
    handelErroer(error, url)
  })
}

let stopInvalid = (data) => {
  let url = base + '/invoice/stopInvalid'
  return axios.post(url, data).catch((error) => {
    handelErroer(error, url)
  })
}
let queryUsers = () => {
  let url = base + '/user/queryUsers'
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}
let queryOrgsAll = () => {
  let url = base + '/business/queryAll'
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let queryOrgsByUserId = (id) => {
  let url = base + '/business/queryByUserId?id=' + id
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let saveUser = (data) => {
  let url = base + '/user/addUser'
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

let login = (data) => {
  let url = base + '/user/login'
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

let getUserInfo = (data) => {
  let url = base + '/user/getUser'

  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}
let logout = (data) => {
  let url = base + '/user/logout'

  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let saveOrg = (data) => {
  let url = base + '/business/saveOrUpdate'
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

let deleteUser = (id) => {
  let url = base + '/user/deleteUser?id=' + id
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}
let deleteOrg = (id) => {
  let url = base + '/business/delete?id=' + id
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

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

let getInvoices = (data) => {
  let url = base + '/invoiceView/querys'
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

let unlock = (data) => {
  let url = base + '/invoiceView/unlock'
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

let toInvoice = (data) => {
  let url = base + '/invoiceView/toInvoice'
  return axios.post(url, qs.stringify(data)).catch((error) => {
    handelErroer(error, url)
  })
}

let statisticalTask = (data) => {
  let url = base + '/invoiceView/statisticalTask?orgId=' + data
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let statisticalMoney = (data) => {
  let url = base + '/invoiceView/statisticalMoney?orgId=' + data
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let statisticalHealth = (orgId, time) => {
  let url =
    base + '/invoiceView/statisticalHealth?orgId=' + orgId + '&time=' + time
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let statisticalYuan = (orgId, day) => {
  let url = base + '/invoiceView/statisticalYuan?orgId=' + orgId + '&day=' + day
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let getDeviceInfo = (data) => {
  let url = base + '/invoiceView/getDeviceInfo'
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

let getInvoiceDetail = (docNum, groupNum) => {
  let url =
    base +
    '/invoiceView/getInvoiceDetail?docNum=' +
    docNum +
    '&groupNum=' +
    groupNum
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let getLogs = (orgId, orgMachine) => {
  let url =
    base + '/invoiceView/getLogs?orgId=' + orgId + '&orgMachine=' + orgMachine
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let downLog = (dir, name, orgId, orgMachine) => {
  let url =
    base +
    '/invoiceView/downLog?dir=' +
    dir +
    '&name=' +
    name +
    '&orgId=' +
    orgId +
    '&orgMachine=' +
    orgMachine
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let downPdf = (fid) => {
  let url = base + '/invoiceView/downPdf?fid=' + fid
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let unCommited = (orgId) => {
  let url = base + '/invoiceView/undoCommit?orgId=' + orgId
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let getLogsFromRedis = (orgId) => {
  let url = base + '/invoiceView/getLogsFromRedis?orgId=' + orgId
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}

let getFiles = (parentId) => {
  let url = base + '/file/list?uid=-1&parentId=' + parentId
  return axios.get(url).catch((error) => {
    handelErroer(error, url)
  })
}
export {
  downPdf,
  getFiles,
  getLogsFromRedis,
  unCommited,
  downLog,
  getLogs,
  getInvoiceDetail,
  getDeviceInfo,
  statisticalYuan,
  statisticalHealth,
  statisticalMoney,
  statisticalTask,
  toInvoice,
  unlock,
  login,
  getUserInfo,
  logout,
  getOriginalHead,
  openSession,
  startInvoice,
  stopInvoice,
  startInvalid,
  stopInvalid,
  queryUsers,
  queryOrgsAll,
  saveUser,
  saveOrg,
  deleteUser,
  deleteOrg,
  queryOrgsByUserId,
  getInvoices,
}
