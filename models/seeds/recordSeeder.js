const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const Record = require('../record') //載入 record model

db = require('../../config/mongoose')

const recordSeeds = [
  {
    "name": "看哥吉拉電影",
    "date": "2021-03-27",
    "category": "休閒娛樂",
    "merchant":"電影院",
    "amount": 150
  },
  {
    "name": "吃麥當勞",
    "date": "2021-03-29",
    "category": "餐飲食品",
    "merchant": "麥當勞",
    "amount": 120
  },
  {
    "name": "買啤酒",
    "date": "2021-03-30",
    "category": "餐飲食品",
    "merchant": "7-11",
    "amount": 70
  },
  {
    "name": "計程車錢",
    "date": "2021-03-31",
    "category": "交通出行",
    "merchant": "計程車",
    "amount": 120
  },
  {
    "name": "買樂透",
    "date": "2021-02-28",
    "category": "其他",
    "merchant": "彩券行",
    "amount": 300
  },
  {
    "name": "房租",
    "date": "2021-02-26",
    "category": "家居物業",
    "merchant": "房東",
    "amount": 5000
  }
]

const SEED_USER = 
  {
    name: '哥吉拉',
    email: 'godzilla@example.com',
    password: 'godzilla',
  }

db.once('open', () => {
  bcrypt
   .genSalt(10)
   .then((salt) => bcrypt.hash(SEED_USER.password,salt))
    .then(hash =>User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password:hash
    }))
    .then(user =>{
      const userId =user._id
      recordSeeds.forEach((recordSeed) => (recordSeed.userId = userId))
      return Promise.all(
        Array.from({ length: recordSeeds.length}, //{'','','','',.....}
          (_,i) =>Record.create(recordSeeds[i])
        )
      )
    })
    .then(() => {
      console.log('Add record seeder!')
      process.exit()
    })
    .catch((err) => console.log(err))
})
