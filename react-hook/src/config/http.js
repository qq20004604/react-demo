/**
 * Created by 王冬 on 2019/5/23.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
import axios from 'axios'

// api请求基路径
let baseURL = ''
// 图片url基路径
let imgURL = ''
if (process.env.NODE_ENV === 'development') { // 开发环境
    baseURL = '/api'
} else { // 生产环境
    baseURL = ''
}

axios.defaults.baseURL = baseURL

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error.response.data)
    }
)

let post = (url, data) => {
    return axios({
        method: 'post',
        url,
        data: data,
        headers: {
            'X-CSRFToken': window.csrftoken
        }
    })
}

let get = (url, params) => {
    return axios({
        method: 'get',
        url,
        params
    })
}

export {post, get}
