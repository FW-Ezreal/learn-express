const express = require('express')

const app = express()

app.use(express.json())
app.use(require('cors')())

app.set('secret', '@$HGU%$HH')


app.use('/web', express.static('web'))


// 引入db
require('./plugin/db')();
require('./router/admin')(app)

app.listen(9000, () => {
  console.log('=== serve is running ===')
})
