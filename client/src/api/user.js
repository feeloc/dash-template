import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: '/user/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: '/user/getInfo',
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/user/logout',
    method: 'post'
  })
}
