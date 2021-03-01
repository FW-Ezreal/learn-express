module.exports = {
  outputDir: __dirname + '/../web',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/web'
    : '/'
}