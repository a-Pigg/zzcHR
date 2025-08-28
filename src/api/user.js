// #region 模板代码
// import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
//#endregion
import request from "@/utils/request";

//登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

//获取用户基本资料
export function getUserInfoAPI() {
  return request({
    url: '/sys/profile',
    method: 'get',
  })
}

//修改用户密码
export function updatePassAPI(data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}