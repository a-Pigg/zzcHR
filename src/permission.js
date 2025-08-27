//#region 模板-鉴权
// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     //登录成功之后，再访问login界面，不会让你访问，而是直接跳转到主页
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/
//     //在白名单里，直接放行
//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
//#endregion
import router from "./router";
import store from "./store";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from "./utils/get-page-title";
import { getToken } from "./utils/auth";

NProgress.configure({ showSpinner: false }) // NProgress Configuration

//白名单
const whiteList = ['/login','/404'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  //开启进度条
  NProgress.start()

  //设置标题
  document.title = getPageTitle(to.meta.title)

  //token标识
  const hasToken = getToken()

  if(hasToken){//有token——登录过
    //登录成功之后，再访问login界面，不会让你访问，而是直接跳转到主页
    if(to.path === '/login'){
      next('/')
      //自己跳自己，不会走全局后置守卫，手动关闭进度条
      NProgress.done()
    }else{
      //判断是否获取了用户资料
      let userId = store.getters.userId
      console.log('ddddddddddddddddddddddddd',userId)
      //没有获取到用户资料
      if(!userId){
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  }else{//没有token——未过
    //在白名单里，放行
    if(whiteList.includes(to.path)){
      next()
    }else{//不在，返回到登录页
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(()=>{
  // console.log('xxxxxxxxxxxxx')
  //关闭进度条
  NProgress.done()
})