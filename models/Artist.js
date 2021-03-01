const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {type: String},
  content: { type: String  }
})

module.exports = mongoose.model('Artist', schema)