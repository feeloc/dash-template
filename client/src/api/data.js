import axios from '@/libs/api.request'

export const errorReq = () => {
  return axios.request({
    url: '/error/error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: '/error/save_error_logger',
    data: info,
    method: 'post'
  })
}
