import React, { Component } from 'react'
import { Form, Input, Button ,Icon} from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

import logo from './images/logo.png'
import './login.less'

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
    form.validateFields((err,{username,password})=>{
      if (!err) {
        console.log(`发ajax请求,username=${username},password=${password}`)
      } else {
        // alert('验证失败')
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
