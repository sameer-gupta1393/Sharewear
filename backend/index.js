const express=require('express')
const cors=require("cors")
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('./db/config')
const { app, server } = require("./socket/socket.js");

const messageRoutes = require("./routes/message.routes.js");
const userRoutes = require("./routes/user.routes.js");


const User=require("./models/users.model")
const Product=require("./models/products.model")
const Wishlist = require('./models/wishlist.model.js');
 
const dotenv=require('dotenv');
 
dotenv.config();
app.use(cors())
app.use(express.json())

app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.post('/register',async(req,res)=>{
    let result =await User.create(req.body)
    result=result.toObject()
    delete result.password;
    res.send(result);
 
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

// app.post('/wishlist/:id', async (req, res) => {

//   const userId = req.params.id;
//   const { sellerId, productId } = req.body;
//   console.log(req.body);

//   try {
//     // Check if the combination of sellerId and productId already exists
//     const user = await User.findById(userId);
//     const isAlreadyInWishlist = user.wishlist.some(item => 
//       item.sellerId === sellerId && item.productId === productId
//     );

//     if (isAlreadyInWishlist) {
//       res.status(400).json({ message: 'Item already exists in wishlist' ,code:0});
//     } else {
//       // If not exists, add the item to the wishlist
//       const updatedUser = await User.findByIdAndUpdate(
//         userId,
//         { $push: { wishlist: { sellerId, productId } } },
//         { new: true } // To return the updated document
//       );

//       if (updatedUser) {
//         res.status(200).json({ message: 'Item added to wishlist successfully',code:1 });
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// In your backend API

app.get('/wishlist/length', async (req, res) => {
  try {
    const userId = req.query.userID; // Assuming the user ID is passed as a query parameter

    const user = await User.findById(userId);

    if (user) {
      const wishlistLength = user.wishlist.length;
      res.status(200).json({ wishlistArrayLength: wishlistLength });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/getWishlist/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Find wishlist items in products schema using sellerId
      // const wishlistItems = await Product.find({ 'userID': user.wishlist });

      res.json(user.wishlist);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/getWishlistProducts/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }else{
      console.log(user)
    }

    // Array to store product cards with seller IDs
    let productCardsWithSeller = [];

    // Iterate through user's wishlist
    for (const wishlistItem of user.wishlist) {
      // Find the product using productId in wishlistItem
      const product = await Product.findById(wishlistItem.productId);

      if (product) {
        // Push product details along with seller ID to the array
        productCardsWithSeller.push({
          product: product,
          sellerId: wishlistItem.sellerId
        });
      }
    }

    // Send the array as response
    res.json(productCardsWithSeller);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/wishlist/:id",async(req,res)=>{
   const userId = req.params.id;
   const { sellerId, productId } = req.body;
   console.log(req.body)
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
      const isAlreadyInWishlist = user.wishlist.some(item => 
        item.productId == productId 
      );
  
      if (isAlreadyInWishlist) {
        return res.status(400).json({ message: 'Item already exists in wishlist' ,code:0});
      }

        // Find the product
        const product = await Product.findOne({ 
          _id: sellerId});
         
        const productitem=product.products.filter((item)=>{
          return item[0]._id==productId;
        })

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        console.log(productitem)
        const wishlistItem = new Wishlist({
            sellerId: sellerId, // Linking to user
            products: productitem[0][0] // Linking to product
        });
        // Save wishlist entry
        await wishlistItem.save();

        // // Return the found product
        // res.status(200).json({wishlistItem});
       
        //saving wishlist to user wishlist 
        const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { wishlist: {wishlistId:wishlistItem._id,productId:productId } } },
        { new: true } // To return the updated document
      );
       if(updatedUser){
        res.status(200).json({ message: 'Item added to wishlist successfully',code:1 });
       }
       else{
        res.status(404).json({ message: 'User not found' });
       }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

 app.get("/wishlistpop/:id", async (req, res) => {
  try {
      const userId = req.params.id;
      
      // Find the user and populate the wishlist array with the referenced documents
      const user = await User.findById(userId).populate('wishlist.wishlistId');

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
  }
});
 
app.get("/productName/:id", async (req, res) => {
  try {
      const productId = req.params.id;

      // Fetch product details by product _id
      const product = await Product.findById(productId);

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      const productName = product.name;

      res.status(200).json({ productName });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
  }
});

// Route to remove wishlist item from user schema and delete corresponding data from wishlist schema
app.delete('/wishlist/:userId/:wishlistId', async (req, res) => {
  try {
      const userId = req.params.userId;
      const wishlistId = req.params.wishlistId;

      // Remove wishlist item from user schema
      await User.findByIdAndUpdate(userId, { $pull: { wishlist: { wishlistId: wishlistId } } });

      // Delete corresponding data from wishlist schema
      await Wishlist.findByIdAndDelete(wishlistId);

      return res.status(200).json({ message: 'Wishlist item removed successfully.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


server.listen(5000)
