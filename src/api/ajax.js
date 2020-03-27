import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  const {method,data} = config
  if(method.toLowerCase() === 'post' && typeof data === 'object') {
    config.data = qs.stringify(data)
  }
  return config;
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  response = response.data
  return response;
}, function (error) {
  message.error('请求失败1'+error.message)
  // console.log('请求失败1',error.message)
  // return Promise.reject(error);
  return new Promise(()=>{})
});

export default axios   