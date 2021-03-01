module.exports = options => {

  return async (req, res, next) => {
    const model = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${model}`)
    next()
  }
}