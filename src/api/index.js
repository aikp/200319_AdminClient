import ajax from './ajax'
// const BASE = 'http://localhost:5000'
const BASE = ''


//请求登录1  不用这种function的形式,用简写的箭头函数形式
// export function reqLogin (username,password) {
//   return ajax({
//     method: 'post',
//     url: BASE+'/login2',
//     headers: { 'content-type': 'application/x-www-form-urlencoded' },
//     data: {
//       username,
//       password
//     }
//     // data: qs.stringify({username,password})
//   })
// }

//请求登录2  不用这种function的形式,用简写的箭头函数形式
// export const reqLogin = (username,password) => (
//   ajax({
//     method: 'post',
//     url: BASE+'/login2',
//     headers: { 'content-type': 'application/x-www-form-urlencoded' },
//     data: {
//       username,
//       password
//     }
//     // data: qs.stringify({username,password})
//   })
// )

//请求登录3  不用这种function的形式,用简写的箭头函数形式  ajax改用对象.方法的形式
export const reqLogin = (username,password) => ajax.post(BASE+'/login',{username,password})


// const name = 'admin'
// const pwd = 'admin'
// reqLogin(name,pwd).then(response => {
//   // const result = response.data
//   console.log('请求成功了,',response)
// },error => {
//   console.log('请求失败了2,',error)
// })   