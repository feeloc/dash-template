import axios from 'axios'
import store from '@/store'
import { Message } from 'iview'
import Cookies from 'js-cookie'
import { TOKEN_KEY, USER_KEY } from '@/libs/util'

const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      if (!config.url.includes('/users')) {
        config.headers['X-Access-Token'] = Cookies.get(TOKEN_KEY)
        config.headers['X-Access-User'] = Cookies.get(USER_KEY)
      }
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res

      if (data.errno !== 0) {
        if (data.errno === 401) {
          Cookies.remove(TOKEN_KEY)
          Message.error('未登录，或登录失效，请登录')
          setTimeout(() => {
            window.location.href = '/client/login'
          }, 500)
        } else {
          if (data.errmsg) Message.error(data.errmsg)
        }
      }

      return {
        data: data.data, status
      }
    }, error => {
      this.destroy(url)
      console.log(error.response)
      addErrorLog(error.response)
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
