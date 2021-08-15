const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Schema，Schema是mongoose提供的定義資料結構的方式
const categorySchema = new Schema({
  categoryName:{
    type: String,
    required: true
  },
  categoryEnName:{
    type: String,
    required: true
  },
  categoryIcon:{
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Category', categorySchema)