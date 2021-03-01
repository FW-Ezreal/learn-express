module.exports = options => {

  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/User')

  return async (req, res, next) => {
    const token = (req.headers.authorization || '').split(' ').pop()
    console.log('%c%s', 'color: #994d75', token);
    assert(token, 401, '登录')
    console.log(req.app)
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '登录')
    req.user = await AdminUser.findById(id)
    assert(id, 401, '登录')
    await next()
  }
}