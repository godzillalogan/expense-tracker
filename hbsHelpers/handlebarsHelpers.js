module.exports={
  categoryTurnIcon : function(recordsCategory){
    if(recordsCategory === "家居物業"){
      return 'fas fa-home'
    }else if(recordsCategory === "交通出行"){
      return "fas fa-shuttle-van"
    }else if(recordsCategory === "休閒娛樂"){
      return "fas fa-grin-beam"
    }else if(recordsCategory === "餐飲食品"){
      return "fas fa-utensils"
    }else if(recordsCategory === "其他"){
      return "fas fa-pen"
    }
  }
}