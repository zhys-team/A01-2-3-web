import request from '@/plugin/axios'

const BASE_URL = '/dataBase/'

// 发票分页列表
export function list (parentId) {
  return request({
    url: BASE_URL + 'queryList',
    method: 'post',
    data: {parentId}
  })
}
