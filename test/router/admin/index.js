module.exports = (options) => {
  const express = require('express');
  const router = express.Router();

  router.get('/login', async(req, res) => {
    res.send('login')
  })
  router.get('/addArtist', async(req, res) => {
    res.send('login')
  })
  router.get('/secret', async(req, res) => {
    res.send(options.get('secret'))
  })
  return router;
}