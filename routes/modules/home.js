// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/record') // 載入 Todo model
const Category = require('../../models/category') // 載入 Todo model


router.get('/', async (req, res) => {
  const categories = await Category.find().lean()

  return Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((records) => res.render('index', { categories ,records})) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理

})

module.exports = router


// router.get('/', (req, res) => {

//   Record.find() // 取出 Record model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .then((records) => {
//       res.render('index', { records })}) // 將資料傳給 index 樣板
//     .catch(error => console.error(error)) // 錯誤處理

//   Category.find() // 取出 Record model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .then(categories => res.render('index', { categories })) // 將資料傳給 index 樣板
//     .catch(error => console.error(error)) // 錯誤處理
// })

// module.exports = router