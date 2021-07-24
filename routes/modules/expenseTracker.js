// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//Create
router.get('/records/new', (req, res) => {
  return res.render('new')
})

router.post('/records', (req, res) => {
  const { name, date, category,amount } = req.body
  return Record.create({ name, name, date, category, amount })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//Update
router.get('/records/:id/edit', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  /////解構賦值
  const { name, date, category, amount } = req.body
  return Record.findById(id)
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




module.exports = router