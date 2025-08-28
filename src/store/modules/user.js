//#region 模板store
// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }

// const state = getDefaultState()

// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           return reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
// }
//#endregion
import { getUserInfoAPI, login } from "@/api/user"
import { getToken, removeToken, setToken } from "@/utils/auth"

const state = {
  token: getToken(),
  userInfo: {},   //存储用户基本资料状态
}

const actions = {

  //登录
  async login(context, data) {
    console.log('登录', data)
    //todo: 调用登录接口
    let resData = await login(data)
    context.commit('setUserToken', resData)
  },

  //获取用户信息
  async getUserInfo(context, data) {
    let resData = await getUserInfoAPI()
    console.log('获取用户资料', resData)
    context.commit('setUserInfo', resData)
  },

  //退出登录
  logout(context, data){
    context.commit('removeUserToken') //删除token
    context.commit('setUserInfo', {}) //设置用户信息为空对象
  }
}

const mutations = {
  setUserToken(state, token) {
    state.token = token
    //同步到缓存
    // localStorage.setItem('userToken', token)
    setToken(token)
  },

  removeUserToken(state, token) {
    state.token = null
    removeToken()
  },

  setUserInfo(state, data) {
    state.userInfo = data
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

