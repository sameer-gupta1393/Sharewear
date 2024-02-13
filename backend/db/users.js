const mongoose=require('mongoose')
const productSchema = new mongoose.Schema({
    productCat: String,
    productName: String,
    productDesc:String,
    productLocation:String,
    productPrice:Number,
    productImg: [String],
  });
const userSchema=new mongoose.Schema({   //  { "name": "swayam","email":"fse","password":"cas","products":[[{"productName":"kurta","productDesc":"size l","productPrice":990,"productImg":["fsdf","scdv","fcsd"]}]] }
    name:String,
    email:String,
    password:String,
    products:[
    {
      type: [productSchema],
      default: [],
    },
  ]
})

module.exports=mongoose.model("user",userSchema)