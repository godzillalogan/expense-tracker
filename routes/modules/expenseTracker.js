// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

//Create
router.get('/records/new', (req, res) => {
  return Category.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((categories) => {
      res.render('new', { categories }) // 將資料傳給 new 樣板
    })
    .catch(error => console.error(error)) // 錯誤處理
})

router.post('/records', (req, res) => {
  const userId = req.user._id
  const { name, date, category,amount } = req.body
  return Record.create({ name, name, date, category, amount, userId })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//Update
router.get('/records/:id/edit', async (req, res) => {
  const userId = req.user._id
  const categories = await Category.find().lean()
  const _id = req.params.id
  return Record.findOne({ _id, userId})
    .lean()
    .then((record) => res.render('edit', { record ,categories}))
    .catch(error => console.log(error))
})

router.put('/records/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  /////解構賦值
  const { name, date, category, amount } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

//delete
router.delete('/records/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router