// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const record = require('./modules/record')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

//條件嚴謹的要先判斷
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)
router.use('/', authenticator, record)

// 準備引入路由模組
// 匯出路由器
module.exports = router