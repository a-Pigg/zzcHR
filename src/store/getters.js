const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  // 头像
  avatar: state => state.user.userInfo.staffPhoto,
  // 名称
  name: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId
}
export default getters
