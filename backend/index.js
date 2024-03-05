const express=require('express')
const cors=require("cors")
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('./db/config')
const path=require('path')
const User=require("./db/users")
const Product=require("./db/products")
const app=express()
const dotenv=require('dotenv');
dotenv.config();
app.use(cors())
app.use(express.json())
app.post('/register',async(req,res)=>{
    let result =await User.create(req.body)
    result=result.toObject()
    delete result.password;
    res.send(result);
 
})
 
app.post('',(req,res)=>{
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
//http://localhost:5000/cards?username=swayam&email=fse
 // [[{"productName":"kurta2","productDesc":"size M","productPrice":7990,"productImg":["fscsddf","scdv","fcsd"]}]]
 
  // new model schema --
  app.put('/cards', async (req, res) => {
    // const userID = req.params.id;
    const { userName,userID } = req.query;
    const newProducts = req.body;

    try {
        // Find the existing Card document
        let existingCard = await Product.findOne({ userID: userID });

        if (!existingCard) {
            // If the card doesn't exist, create a new one
            existingCard = new Product({
                userID: userID,
                name: userName,
                products: newProducts,
            });

            await existingCard.save();
            res.json(existingCard);
        } else {
            // If the card exists, update the products array
            const updatedCard = await Product.findOneAndUpdate(
                { userID: userID },
                { $push: { products: { $each: newProducts } } },
                { new: true }
            );

            if (updatedCard) {
                res.json(updatedCard);
            } else {
                res.status(500).json({ error: 'Error updating the card' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


  // API endpoint to get the product array length for a user
app.get('/products/length', async (req, res) => {
  const { userID} = req.query;

  try {
    // Find the user based on the provided username and email
    const user = await Product.findOne({ userID: userID});

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
// Set up Cloudinary configuration (replace with your Cloudinary credentials)
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/uploading', upload.single('file'), async (req, res) => {
  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          console.log('File uploaded to Cloudinary:', result);

          // Additional processing or response to the client
          res.json({  url: result.url });
        }
      }
    ).end(req.file.buffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/products', async (req, res) => {
    const {userID}=req.query
  try{
      const response=await Product.findOne({userID:userID});
      res.send(response.products)
      console.log(response)
  }catch(e){
      res.send({err:e})
  
  }

})

//getting all cards data fromm products
app.get("/getProducts",async(req,res)=>{
  const response=await Product.find();
  res.send(response);
})
app.listen(5000)
