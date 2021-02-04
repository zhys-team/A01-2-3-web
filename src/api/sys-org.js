import request from '@/plugin/axios'

const BASE_URL = '/sysOrgs/'

// 发票分页列表
export function page ({pageSize, currentPage}, data) {
  return request({
    url: BASE_URL + 'page?pageSize=' + pageSize + '&pageNum=' + currentPage,
    method: 'post',
    data,
    headers: {'Content-type': 'application/json'}
    
  })
}
// 保存
export function save (data) {
  return request({
    url: BASE_URL + 'save',
    method: 'post',
    data,
    headers: {'Content-type': 'application/json'}
    
  })
}