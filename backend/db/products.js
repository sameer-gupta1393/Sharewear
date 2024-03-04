const mongoose=require('mongoose')
const productSchema = new mongoose.Schema({
    productCat: String,
    productName: String,
    productDesc:String,
    productLocation:String,
    productPrice:String,
    lat_long:String,
    productImg: [String],
  });
const conSchema=new mongoose.Schema({   //  { "name": "swayam","email":"fse","password":"cas","products":[[{"productName":"kurta","productDesc":"size l","productPrice":990,"productImg":["fsdf","scdv","fcsd"]}]] }
    userID:String,
    name:String,
    
    products:[
    {
      type: [productSchema],
      default: [],
    },
  ]
})
module.exports=mongoose.model("products",conSchema)
