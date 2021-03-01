module.exports = (options) => {
  const express = require('express');
  const router = express.Router();

  router.get('/getArtist', async(req, res) => {
    res.send('getArtist')
  })
  return router;
}