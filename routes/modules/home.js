// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/record') // 載入 Todo model
const Category = require('../../models/category') // 載入 Todo model

router.get('/', async (req, res) => {
  const categories = await Category.find().lean()

  return Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((records) =>{ 
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.amount
      });
      res.render('index', { categories, records, totalAmount}) // 將資料傳給 index 樣板
    }) 
    .catch(error => console.error(error)) // 錯誤處理
})

router.get('/filter', async (req, res) => {
  const categories = await Category.find().lean()
  // console.log(categories)
  const currentCategory = req.query.categoryOption

  function categoryENToCH(EN){
    if (EN === "home"){
      return '家居物業'
    } else if (EN ==="transportation"){
      return '交通出行'
    } else if (EN === "entertainment") {
      return '休閒娛樂'
    } else if (EN === "food") {
      return '餐飲食品'
    } else if (EN === "other") {
      return '其他'
    }
  }
  return Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })
    .then((records) => {
      records = records.filter(record => {
        // console.log(categoryCHToEN(record.category, categories))
        return record.category === categoryENToCH(currentCategory)
      })
      let totalAmount = 0
      records.forEach(record => {
        // const category = categories.find(category.categoryName === record.category)
        totalAmount += record.amount
      });
      res.render('index', { categories, records, totalAmount, currentCategory }) // 將資料傳給 index 樣板
    })
    .catch(error => console.error(error)) // 錯誤處理

})
module.exports = router

