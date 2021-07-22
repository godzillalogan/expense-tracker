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
  categorySeed.forEach(category => {
    Category.create({
      categoryName: category.categoryName,
      categoryEnName: category.categoryEnName,
      categoryIcon: category.categoryIcon,
    });
  })
  console.log("done")
})
