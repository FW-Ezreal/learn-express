module.exports = app => {
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  });

  router.get('/', async(req, res) => {
    const result = await req.Model.find();
    res.send(result)
  })

  router.post('/', async(req, res) => {
    const result = await req.Model.create(req.body)
    res.send(result)
  })

  router.delete('/:id', async(req, res) => {
    const result = await req.Model.findByIdAndDelete(req.params.id)
    res.send(result)
  })


  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource', authMiddleware(app), resourceMiddleware(), router)

  const AdminUser = require('../../models/User');

  app.post('/admin/api/login', async (req, res) => {
    const { name, password } = req.body

    const user = await AdminUser.findOne({ name })
    assert(user, 422, '用户不存在')

    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    const token = jwt.sign({id: user._id}, app.get('secret'))

    res.send({ token })
  })

  app.post('/admin/api/registe', async (req, res) => {
    const { name } = req.body
    const user = await AdminUser.findOne({ name })
    assert(!user, 422, '用户已存在')
    await AdminUser.create(req.body)
    
    res.send('ok')
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}