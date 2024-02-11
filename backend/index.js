const express=require('express')
const cors=require("cors")
require('./db/config')
const multer =require('multer')
const path=require('path')
const User=require("./db/users")
const app=express()
app.use(cors())
app.use(express.json())
app.post('/register',async(req,res)=>{
    let result =await User.create(req.body)
    result=result.toObject()
    delete result.password;
    res.send(result);
 
})
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
     cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})
app.post('/upload',(req,res)=>{
  console.log(req.file)
})
app.post('/login',async (req,res)=>{
    
    
    if(req.body.password && req.body.email){
        let user=await User.findOne(req.body).select('-password');
        if(user){
            res.send(user)
        }
        else{
            res.send({result:"no user found"})
        }
        
    
    }else{
        res.send({result:"no user found"})
    }
  
})
app.listen(5000)
