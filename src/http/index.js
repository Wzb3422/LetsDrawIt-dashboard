import axios from 'axios'

// default configuration
axios.defaults.baseURL = 'http://101.132.107.146';
axios.defaults.timeout = 600
axios.defaults.headers.post['Content-Type'] = 'application/json';

// interceptors
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    throw new Error(error)
  }
)

axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      !res.data.status && window.alert(res.data.message)
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    const { status } = error.response
    if (status) {
      switch (status) {
        case 401:
          window.alert('未登录')
          window.location.pathname = '/'
          break
        case 403:
          window.localStorage.clear()
          window.location.pathname = '/login'
          window.alert('登陆过期')
          break
        case 404:
          window.location.pathname = '/login'
          window.alert('网络请求目标不存在')
          break
        default:
          window.alert(error.response.data.message)
      }
    }
    return Promise.reject(error.response);
  }
)

/**
 * get method
 * @param {String} url [requesting url]
 * @param {Object} params [request params]
 */
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then(res => {
      resolve(res.data)
    }).catch(err=> {
      reject(err.data)
    })
  })
}

/**
 * post method
 * @param {String} url [requesting url]
 * @param {Object} params [request params]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err.data)
      })
  });
}
