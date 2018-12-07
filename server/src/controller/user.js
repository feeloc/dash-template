import Base from './base'
import crypto from 'crypto'
import { encodeToken } from '../tool/util'

module.exports = class extends Base {
  async loginAction () {
    const userName = this.params('userName')
    const password = this.params('password')
    const userAgent = this.ctx.header['user-agent']

    const encodePassword = crypto.createHash('md5').update(`${password}${this.config('PASSWORD_KEY')}`).digest('hex')
    const encodedUA = crypto.createHash('md5').update(`${userAgent}${this.config('UA_KEY')}`).digest('hex')
    const token = encodeToken(userName, encodePassword, encodedUA)
    const userDB = await this.cache(`user_${userName}`, () => {
      const users = this.config('USERS')
      return users.find(u => {
        return u.userName === userName
      })
    })

    if (userName && password) {
      if (userDB.password === encodePassword) {
        return this.success({
          token: token
        })
      } else {
        return this.fail(this.config('ERROR_NO').PASS_ERROR, this.config('ERROR_MSG').PASS_ERROR)
      }
    } else {
      return this.fail(this.config('ERROR_MSG').PARAM_ERROR)
    }
  }

  async getInfoAction () {
    const userName = this.header('x-access-user')
    const userDB = await this.cache(`user_${userName}`, () => {
      const users = this.config('USERS')
      return users.find(u => {
        return u.userName === userName
      })
    })

    return this.success({
      userName: userDB.userName,
      access: userDB.access,
      avatar: userDB.avatar
    })
  }

  async getPassAction () {
    const password = this.params('password')
    const encodePassword = crypto.createHash('md5').update(`${password}${this.config('PASSWORD_KEY')}`).digest('hex')

    return this.success({
      ciphertext: encodePassword
    })
  }

  logoutAction () {
    return this.success({})
  }
}
