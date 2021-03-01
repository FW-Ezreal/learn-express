const express = require('express');
const app = express();
const path = require('path')

app.use(express.json());

const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/node-express', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
/**
  * 连接成功
  */
 mongoose.connection.on('connected', function () {    
  console.log('Mongoose connection success ');  
});    

/**
* 连接异常
*/
mongoose.connection.on('error',function (err) {    
  console.log('Mongoose connection error: ' + err);  
});    

/**
* 连接断开
*/
mongoose.connection.on('disconnected', function () {    
  console.log('Mongoose connection disconnected');  
});



// ------

const userModel = mongoose.model('User', new mongoose.Schema({
  name: String,
  age: String
}))

const router = express.Router();


router.get('/users', async(req, res) => {
  const result = await userModel.find();
  res.send(result);
})
router.post('/user', async(req, res) => {
  const result = await userModel.create(req.body)
  res.send(result);
})
router.put('/user/:id', async(req, res) => {
  const result = await userModel.findByIdAndUpdate(req.params.id, req.body)
  res.send(result);
})

router.delete('/user/:id', async(req, res) => {
  const result = await userModel.findOneAndDelete(req.params.id)
  res.send({
    message: 'ok'
  });
})

app.use((req, res, next) => {
  console.log(new Date())
  next();
})

// 路径都要写/   没写/ 找不到路径
app.use('/public', express.static(path.join(__dirname + '/public')))
// app.use('/public', express.static('public'))
// app.use(() => }])
// app.use('/public', express.static(path.join(__dirname, 'public')))


app.use(router)

// curd


app.listen(3100, () => {
  console.log('express listen 3100')
})

