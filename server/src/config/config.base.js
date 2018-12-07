// default config
const ERROR_MSG = {
  PARAM_ERROR: '参数错误',
  TOKEN_ERROR: '请重新登录',
  PASS_ERROR: '密码错误',
  DB_ERROR: '操作数据库错误',
  API_ERROR: '上层接口错误',
  DB_FIND_EMPTY: '查找数据库为空'
}

const ERROR_NO = {
  TOKEN_ERROR: 401,
  PASS_ERROR: 1001,
  DB_ERROR: 1002,
  API_ERROR: 1003
}

const SUCCESS_MSG = {}

const PASSWORD_KEY = '#h@u9M7uq2K^^aKQ'
const TOKEN_KEY = 'TL#ra8hk1oxJTUz1'
const UA_KEY = 'LQIvIHmq#lae!hCh'

const NO_TOKEN_URL = [
  '/',
  '/client',
  '/client/*',
  '/user/login',
  '/user/logout',
  '/user/getPass',
  '/tool/getPhoto'
]

const COOKIE_EXPIRES = 2 * 24 * 3600 * 1000 + 10000

const USERS = [
  {
    userName: 'feeloc',
    access: ['super_admin', 'admin'],
    password: '4e3cbde61273c3db85864c43288b998e', // feeloc
    avatar: 'https://cdn.yuque.com/yuque/0/2018/jpeg/113308/1524708070492-avatar/fdb56e57-a560-4a2b-a38b-0b08e823f832.jpeg?x-oss-process=image/resize,m_fill,w_192,h_192/format,png'
  }, {
    userName: 'admin',
    access: ['admin'],
    password: 'ae33b74d044131563ba21af8470970c3', // admin
    avatar: 'https://cdn.yuque.com/yuque/0/2018/jpeg/113308/1524708070492-avatar/fdb56e57-a560-4a2b-a38b-0b08e823f832.jpeg?x-oss-process=image/resize,m_fill,w_192,h_192/format,png'
  }
]

const API = {}

module.exports = {
  port: 8360,
  PASSWORD_KEY,
  TOKEN_KEY,
  UA_KEY,
  SUCCESS_MSG,
  ERROR_MSG,
  ERROR_NO,
  NO_TOKEN_URL,
  COOKIE_EXPIRES,
  USERS,
  API
}
