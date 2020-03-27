//也可以引入store这个库,兼容性更好,数据都是解析过的,不用再用JSON.stringify() 或 JSON.parse() 去解析数据
import store from 'store'

//原生的操作localstorage数据的工具函数
const USER_KEY = 'user_key'

export default {
  saveUser (user) {
    // localStorage.setItem( USER_KEY ,JSON.stringify(user))
    store.set( USER_KEY , user )
  },

  getUser () {
    // return JSON.parse(localStorage.getItem( USER_KEY ) || '{}')
    return store.get( USER_KEY ) || {}
  },

  removeUser () {
    // localStorage.removeItem( USER_KEY )
    store.remove( USER_KEY )
  }


}