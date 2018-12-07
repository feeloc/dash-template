module.exports = (options, app) => {
  return (ctx, next) => {
    ctx.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Request-Method,Access-Control-Request-Headers,X-Access-Token, X-Access-User, X-Url-Path'
    })
    return next()
  }
}
