const mongoose=require('mongoose')
 
const userSchema=new mongoose.Schema({   //  { "name": "swayam","email":"fse","password":"cas","products":[[{"productName":"kurta","productDesc":"size l","productPrice":990,"productImg":["fsdf","scdv","fcsd"]}]] }
    name:String,
    email:String,
    password:String,
    Location:String,
    
})

module.exports=mongoose.model("user",userSchema)