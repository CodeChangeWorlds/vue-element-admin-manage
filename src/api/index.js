import request from '@/utils/request'
// 获取商品列表
export function getGoodsList(params) {
  return request.get('/goodsApi', { params })
}
// 登陆
export function login(data) {
  return request.post('/adminApi/login', data)
}
// 获取用户信息
export function getInfo(params) {
  return request.get('/adminApi/info', { params })
}
// 获取分类
export function getTag() {
  return request.get('/goodsApi/getCategory')
}
// 删除商品
export function delGoods(params) {
  return request.get('/adminApi/delete', { params })
}
// 获取商品详情
export function goodsDetail(params) {
  return request.get('/goodsApi/details', { params })
}
// 新增商品
export function addGoods(data) {
  return request.post('/adminApi/insertGoods', data)
}
// 修改商品
export function updateGoods(data) {
  return request.post('/adminApi/updateGoods', data)
}
// 查询管理员列表
export function getAdmin() {
  return request.get('/adminApi/getAdmin')
}
// 新增管理员
export function addAdmin(data) {
  return request.post('/adminApi/addAdmin', data)
}
// 获取banner图
export function getBanner() {
  return request.get('/bannerApi')
}
// 新增轮播图
export function addBanner(data) {
  return request.post('/bannerApi/addBanner', data)
}
// 删除轮播图
export function delBanner(params) {
  return request.get('/bannerApi/delBanner', { params })
}
