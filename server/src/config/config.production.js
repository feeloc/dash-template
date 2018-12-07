// production config, it will load in production enviroment
import CONFIG_BASE from './config.base'

module.exports = Object.assign(CONFIG_BASE, {
  workers: 0
})
