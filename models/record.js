const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Schema，Schema是mongoose提供的定義資料結構的方式
const recordSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)