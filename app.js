// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars') //沒有給 ./ ，代表去node_modules裡面去找
const bodyParser = require('body-parser') //body-Parser
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const PORT = process.env.PORT || 3000

const routes = require('./routes')  // 引用路由器

const usePassport = require('./config/passport')
require('./config/mongoose')


// setting template engine, extname: '.hbs'，是指定副檔名為.hbs，有了這行以後，我們才能把預設的長檔名改寫成短檔名
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: require('./hbsHelpers/handlebarsHelpers')  //handlebars helper之後可能會用到
}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

app.use(routes)  // 將 request 導入路由器

// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})