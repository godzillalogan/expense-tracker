if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db = require('../../config/mongoose')
const Category = require('../category') //載入 record model

const categorySeed = [
  {
    "categoryName": "家居物業",
    "categoryEnName": "home",
    "categoryIcon": "fas fa-home",
  },
  {
    "categoryName": "交通出行",
    "categoryEnName": "transportation",
    "categoryIcon": "fas fa-shuttle-van",
  },
  {
    "categoryName": "休閒娛樂",
    "categoryEnName": "entertainment",
    "categoryIcon": "fas fa-grin-beam",
  },
  {
    "categoryName": "餐飲食品",
    "categoryEnName": "food",
    "categoryIcon": "fas fa-utensils",
  },
  {
    "categoryName": "其他",
    "categoryEnName": "other",
    "categoryIcon": "fas fa-pen",
  },
]

db.once('open', () => {
  Promise.all(categorySeed.map(async category =>{
    await Category.create({
      categoryName: category.categoryName,
      categoryEnName: category.categoryEnName,
      categoryIcon: category.categoryIcon,
    })
  }))
  .then(() => {
    console.log('Add category seeder!')
    // 資料庫要先關閉，才能兩個種子資料都能執行
    return db.close()
  })
  .catch(err => console.error(err))
})
