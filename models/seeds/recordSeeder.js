db = require('../../config/mongoose')
const Record = require('../record') //載入 record model

const recordSeed = [
  {
    "name": "看哥吉拉電影",
    "date": "2021-03-27",
    "category": "休閒娛樂",
    "amount": 150
  },
  {
    "name": "吃麥當勞",
    "date": "2021-03-29",
    "category": "餐飲食品",
    "amount": 120
  },
  {
    "name": "買啤酒",
    "date": "2021-03-30",
    "category": "餐飲食品",
    "amount": 70
  },
]

// db.once('open', () => {
//   recordSeed.forEach(record => {
//     Record.create({
//       name: record.name,
//       date: record.date,
//       category: record.category,
//       amount: record.amount
//     });
//   })
//   console.log("record done")
// })

db.once('open', () => {
  Record.create(recordSeed)
    .then(() => {
      console.log('Add record seeder!')
      // 資料庫要先關閉，才能兩個種子資料都能執行
      return db.close()
    })
    .catch(err => console.error(err))
})
