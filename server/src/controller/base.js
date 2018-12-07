import crypto from 'crypto'
import { decodeToken } from '../tool/util'

module.exports = class extends think.Controller {
  async __before () {
    if (this.method === 'OPTIONS') {
      this.body = 'ok'
      return false
    }

    this.params = (name) => {
      if (this.isGet) {
        return this.ctx.param(name) ? decodeURIComponent(this.ctx.param(name)) : null
      } else if (this.isPost) {
        return this.ctx.post(name) ? this.ctx.post(name) : null
      }
    }

    // verify token
    const matched = this.config('NO_TOKEN_URL').find(url => {
      if (url.match(/\*/) && this.ctx.path.match(new RegExp(url.replace('*', '')))) {
        return true
      } else if (url === this.ctx.path) {
        return true
      }
      return false
    })

    if (!matched) {
      const token = this.header('x-access-token')
      const userName = this.header('x-access-user')

      if (!token || !userName) {
        return this.fail(this.config('ERROR_NO').TOKEN_ERROR, this.config('ERROR_MSG').TOKEN_ERROR)
      }

      const plainObj = decodeToken(userName, token)
      const userAgent = this.ctx.header['user-agent']
      const encodedUA = crypto.createHash('md5').update(`${userAgent}${this.config('UA_KEY')}`).digest('hex')
      const userDB = await this.cache(`user_${userName}`, () => {
        const users = this.config('USERS')
        return users.find(u => {
          return u.userName === userName
        })
      })

      if (encodedUA !== plainObj.ua || plainObj.password !== userDB.password || (Date.now() - plainObj.date) > this.config('COOKIE_EXPIRES')) {
        return this.fail(this.config('ERROR_NO').TOKEN_ERROR, this.config('ERROR_MSG').TOKEN_ERROR)
      }
    }

    return true
  }
}
