import request from '@/plugin/axios'

const BASE_URL = '/pc-web/invoiceHeads/'

// 发票分页列表
export function page(url, { pageSize, currentPage }, data) {
  return request({
    url: url + '?pageSize=' + pageSize + '&pageNum=' + currentPage,
    method: 'post',
    data,
  })
}

// 发票删除
export function deleteInvoice(id) {
  return request({
    url: BASE_URL + 'state/' + id,
    method: 'get',
  })
}

// 导出
export function exportInvoice(data) {
  return request({
    url: BASE_URL + 'export',
    method: 'post',
    responseType: 'blob',
    data,
  })
}

// 全部导出
export function exportInvoiceAll(data) {
  return request({
    url: BASE_URL + 'exportData',
    method: 'post',
    responseType: 'blob',
    data,
  })
}

// 进项统计
export function jxtj(data) {
  return request({
    url: BASE_URL + 'jxtj',
    method: 'post',
    data,
  })
}

// 发票勾选
export function invoicesGX(data) {
  return request({
    url: BASE_URL + 'gx',
    method: 'post',
    data,
  })
}

// 发票撤销勾选
export function invoicesCancelGX(data) {
  return request({
    url: BASE_URL + 'cancel_gx',
    method: 'post',
    data,
  })
}

// 批量申报
export function updateRzState(params) {
  return request({
    url: BASE_URL + 'updateRzState',
    method: 'get',
    params,
  })
}
