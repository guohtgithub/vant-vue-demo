import axios from 'axios'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = '/';

// 请求拦截
axios.interceptiors.request.use(config => {
  if(config.method === 'post')
    config.data = JSON.stringify(config.data)
  return config
}, err => {
  console.log('错误的传参')
  return Promise.reject(err)
})

// 响应拦截
axios.interceptiors.response.use(res => {
  if(!res.data.success) return Promise.resolve(res)

  return res
},err => {
  console.log('网络异常')
  return Promise.reject(err)
})

export default{
  fetchGet(url,param){
    return new Promise((resolve,reject) =>{
      axios.get(url,{param:param})
        .then(res => {
          resolve(res)
        },err => {
          reject(err)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  fetchPost(url,param){
    return new Promise((resolve,reject) => {
      axios.post(url,param)
        .then(res => {
          resolve(res)
        },err => {
          reject(err)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}