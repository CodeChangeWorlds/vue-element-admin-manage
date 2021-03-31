import request from '@/utils/request'

export function login(data) {
  return request.post('/adminApi/login', data)
}

export function getInfo(params) {
  return request.get('/adminApi/info', { params })
}
