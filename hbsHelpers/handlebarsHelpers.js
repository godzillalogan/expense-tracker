const dayjs = require('dayjs')

module.exports={
  categoryTurnIcon: function (recordCategory,categories){
    const categoryFind = categories.find(category =>  recordCategory === category.categoryName )
    return categoryFind.categoryIcon
  },
  Selected: function (a, b){
    if (a === b){
      return 'selected'
    }
  },
  dateFormat:function (a){
    return dayjs(a).format('YYYY 年 MM 月 DD')
  },
  dateFormatAnother: function (a) {
    return dayjs(a).format('YYYY-MM-DD')
  }
}