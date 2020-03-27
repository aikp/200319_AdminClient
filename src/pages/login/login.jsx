import React, { Component } from 'react'
import { Form, Input, Button ,Icon,message} from 'antd';
import {Redirect} from 'react-router-dom'
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

import logo from './images/logo.png'
import './login.less'
import {reqLogin} from '../../api'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'


class Login extends Component {
  handleSubmit = (event)=>{
    event.preventDefault()
    
    const form = this.props.form
    // const values = form.getFieldsValue()
    // const username = form.getFieldValue('username')
    // const password = form.getFieldValue('password')
    // console.log(values)
    // console.log(username,password)
    // alert('发送登录的Ajax请求')
    form.validateFields(async (err,{username,password})=>{
      if (!err) {
        // console.log(`发ajax请求,username=${username},password=${password}`)
        // try{} catch(error){console.log(error)}
        const result = await reqLogin(username,password)
        if(result.status === 0){
          const user = result.data
          localStorage.setItem('user_key',JSON.stringify(user))
          storageUtils.saveUser(user)  //这个方法保存user有点慢,所以必须要把user保存到内存里
          memoryUtils.user = user
          this.props.history.replace('/')
          message.success('欢迎您登录成功!') 
        }else{
          message.error(result.msg)
        }

        //不用async await 的写法
        // reqLogin(username,password)
        //   .then((response)=>{
        //     const result = response
        //     if(result.status === 0){
        //       this.props.history.replace('/')
        //       message.success('欢迎您登录成功!')
        //     }else{
        //       message.error(result.msg)
        //     }
        //   })
        //   .catch((error)=>{
        //     console.log(error)
        //   })        
      } else {
        console.log('验证失败')
      }
    })

  }

  validatePwd = (rule,value,callback)=>{
    // 1). 密码必须输入
    // 2). 密码必须大于等于4位
    // 3). 密码必须小于等于12位
    // 4). 密码必须是英文、数字或下划线组成
    value = value.trim()
    if (!value) {
      callback('密码必须输入')
    }else if (value.length<4) {
      callback('密码必须大于等于4位')
    }else if (value.length>12) {
      callback('密码必须小于等于12位')
    }else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    }else{
      callback()
    }
  }

  render() {
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}' )
    // const user = storageUtils.getUser()
    const user = memoryUtils.user
    if(user._id) {
      // this.props.history.replace('/')  //注意用于回调函数中的路由跳转方法 
      return <Redirect to='/' />  //用于render渲染时跳转
    }

    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目:后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登录</h1>

          <Form name="normal_login" className="login-form"
            onSubmit={this.handleSubmit}
          >
            <Form.Item  name="username">
              {
                getFieldDecorator('username',{
                  initialValue:'',
                  rules:[
                    // 1). 必须输入
                    // 2). 必须大于等于4位
                    // 3). 必须小于等于12位
                    // 4). 必须是英文、数字或下划线组成
                    {required:true,message:'请输入姓名!'},
                    {whitespace:true,message:'姓名不能包含空格!'},
                    {min:4,message:'必须大于等于4位!'},
                    {max:12,message:'必须小于等于12位!'},
                    {pattern:/^[a-zA-Z0-9_]+$/,message:'必须是英文、数字或下划线组成!'}
                  ]
                })(
                  <Input prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />} placeholder="用户名" />
                )
              }
            </Form.Item>

            <Form.Item name="password">
            {
                getFieldDecorator('password',{
                  initialValue:'',
                  rules:[
                    { validator : this.validatePwd }
                  ]
                })(
                  <Input prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.25)'}} />} type="password" placeholder="密码" />
                )
              }
              
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登  录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrapperForm = Form.create()(Login)

export default WrapperForm


/*
用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于等于4位
  3). 必须小于等于12位
  4). 必须是英文、数字或下划线组成
 */
