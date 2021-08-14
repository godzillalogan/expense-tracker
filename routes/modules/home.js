// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/record') // 載入 Todo model
const Category = require('../../models/category') // 載入 Todo model
const dayjs = require('dayjs')
const months = require('../../tools/months.json').results

router.get('/', async (req, res) => {
  try{
    const userId = req.user._id
    const categories = await Category.find().lean()

    return Record.find({ userId }) // 取出 Record model 裡的所有資料
      .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
      .then((records) =>{ 
        let totalAmount = 0
        records.forEach(record => {
          totalAmount += record.amount
        });
        res.render('index', { categories, records, totalAmount, months}) // 將資料傳給 index 樣板
      }) 
      .catch(error => console.error(error)) // 錯誤處理
  }catch(error){
    console.log(error)
  }
})

router.get('/filter', async (req, res) => {
  try{
    const userId = req.user._id
    const categories = await Category.find().lean()
    const currentCategory = req.query.categoryOption
    const currentYearMonth = req.query.yearMonthOption
    const currentYearMonthtoDate = dayjs(currentYearMonth).toDate() //轉成Date
    const startTime = dayjs(currentYearMonthtoDate).add(8, 'hour').$d  //+8小時
    const endTimet = dayjs(currentYearMonthtoDate).add(1, 'month').$d  //+1個月

    //把category英文轉成中文
    let currentCategoryCH = ''
    categories.forEach(category => {
      if (currentCategory === category.categoryEnName) {
        currentCategoryCH = category.categoryName
      }
    })
    //$Match
    const allFilter ={
      userId
    }
    currentCategory ? allFilter.category = currentCategoryCH:''
    currentYearMonth ? allFilter.date = { $gte: startTime, $lte: endTimet } : ''  //從gte開始,$lte結束的範圍找
    const records = await Record.aggregate([
      { $project: { name: 1, date: 1, category: 1, merchant:1 , amount: 1, userId: 1 }},
      { $match: allFilter},
      { $sort : { date: 1 }}
    ])
    //計算總額
    let totalAmount = 0
    records.forEach(record => {
      // const category = categories.find(category.categoryName === record.category)
      totalAmount += record.amount
    });
    return res.render('index', { categories, records, totalAmount, currentCategory, currentYearMonth}) // 將資料傳給 index 樣板
  }catch(error){
    console.log(error)
  }
})
module.exports = router

