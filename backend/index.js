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
app.post('',(req,res)=>{
  console.log(req.file)
})
// app.put('/upload',upload.array('files',4),async (req,res)=>{
//     console.log(req.body)
//     let db=await dbConnection()
//     let result=await db.updateOne({name:req.params.name},{$set:req.body})
//     res.send(result)
// })
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
//http://localhost:5000/cards?username=swayam&email=fse
app.put('/cards', async (req, res) => {// [[{"productName":"kurta2","productDesc":"size M","productPrice":7990,"productImg":["fscsddf","scdv","fcsd"]}]]
    const { username ,email } = req.query;
  
    // Define the new products to add
    const newProducts = req.body;
  
    try {
      // Find the existing Card document and update the arrays
      const updatedCard = await User.findOneAndUpdate(
        { name: username,email:email },
        { $push: { products: { $each: newProducts } } },
        { new: true } // Return the updated document
      );
  
      if (updatedCard) {
        res.json(updatedCard);
      } else {
        res.status(404).json({ error: 'Card not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // API endpoint to get the product array length for a user
app.get('/products/length', async (req, res) => {
  const { username, email } = req.query;

  try {
    // Find the user based on the provided username and email
    const user = await User.findOne({ name: username, email: email });

    if (user) {
      // Return the length of the products array
      res.json({ productArrayLength: user.products.length ,productsArray:user.products});
    } else {
      // If user is not found, return an error
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(5000)
