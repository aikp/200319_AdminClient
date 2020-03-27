import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'


export default class Admin extends Component {
  render() {
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}' )
    // const user = storageUtils.getUser()
    const user = memoryUtils.user
    console.log(user)
    if(!user._id) {
      // this.props.history.replace('/login')  //注意用于回调函数中的路由跳转方法
      return <Redirect to='/login' />  //用于render渲染时跳转
    }

    return (
      <div>
        hello,{user.username}
      </div>
    )
  }
}
