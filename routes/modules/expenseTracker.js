// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()



router.get('/records/new', (req, res) => {
  res.render('new')
})

module.exports = router