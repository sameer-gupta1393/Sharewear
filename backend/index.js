const express=require('express')
const path=require('path');
const cors=require("cors")
const multer = require('multer');
const calcCrow = require('./utils/Distance.js');
const dotenv=require('dotenv');
dotenv.config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
const connectToMongoDB= require('./db/connectToMongoDB.js')
const { app, server } = require("./socket/socket.js");
const messageRoutes = require("./routes/message.routes.js");
const userRoutes = require("./routes/user.routes.js");
const User=require("./models/users.model")
const Product=require("./models/products.model")
const Wishlist = require('./models/wishlist.model.js');

const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

app.use(cors())
app.use(express.json())

app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(path.resolve(), "/frontend/dist")));



app.post('/api/register',async(req,res)=>{
    let result =await User.create(req.body)
    result=result.toObject()
    delete result.password;
    res.send(result);
 
})
app.get('/',(req,res)=>{
  res.send("hello");
})
app.post('/api/login',async (req,res)=>{
    
    
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
  app.put('/api/cards', async (req, res) => {
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
app.get('/api/products/length', async (req, res) => {
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
 

// Set up multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/uploading', upload.single('file'), async (req, res) => {
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
app.get('/api/products', async (req, res) => {
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
app.get("/api/getProducts",async(req,res)=>{
  const response=await Product.find();
  res.send(response);
})
//search filter api
app.post('/api/getProducts', async (req, res) => {
  try {
      const searchData = req.body;
      // console.log(searchData)
      // Prepare the query based on the search criteria
    //   const query = {};

    //   // Check if searchText is provided
    //   if (searchData.searchText) {
    //     query['products.productName'] = { $regex: searchData.searchText, $options: 'i' };
    // }

    //   // Check if selectedCategories is provided
    //   if (searchData.selectedCategories && searchData.selectedCategories.length > 0) {
    //       query.productCat = { $in: searchData.selectedCategories };
    //   }

    //   // Check if distance is provided
    //   // Assuming distance is not implemented in this example

    //   // Check if minPrice and maxPrice are provided
    //   if (searchData.minPrice !== null && searchData.maxPrice !== null) {
    //       query.productPrice = { $gte: searchData.minPrice, $lte: searchData.maxPrice };
    //   }

      // Fetch products based on the query
      const product = await Product.find();
      let cards=[];
      
      let filtered = product.map((item0) => {
        let filteredCards=item0.products.filter((item) => {
          const searchText = searchData?.searchText.trim().toLowerCase();
          const productName = item[0].productName.trim().toLowerCase();
          const productDesc = item[0].productDesc.trim().toLowerCase();
  
          //category checker
          let category =true;
          if(searchData?.selectedCategories.length>0){
             category = searchData?.selectedCategories.some(selectedCat =>
                item[0].productCat.toLowerCase() === selectedCat.toLowerCase()
            );
            }
           
          //serachText checker for product name and product description
          let productText=true;
          // Check if productName or productDesc contains searchText
          const nameMatch = productName.includes(searchText);
          const descMatch = productDesc.includes(searchText);
          const nameMatch2 = searchText.includes(productName);
          const descMatch2 =searchText.includes(productDesc);
          const match = nameMatch || descMatch ||nameMatch2 || descMatch2;
         

          // Check if price is within the specified range
        let priceMatch=true;
        if(searchData.minPrice!==null && searchData.maxPrice!==null){
          const minPrice = searchData?.minPrice  ;
          const maxPrice = searchData?.maxPrice  ;
          priceMatch = parseFloat(item[0].productPrice) >= minPrice && parseFloat(item[0].productPrice) <= maxPrice;
          // console.log(minPrice,maxPrice,priceMatch)
        }
          
        let distanceMatch=true;
        let distance_nearMe=null;
        if(searchData.distance){
          let latitude=searchData.distance.latitude;
          let longitude= searchData.distance.longitude;
          let nearBy=searchData.distance.nearBy;
          let lat_long=item[0].lat_long.split(',')
       
          const distance = calcCrow(latitude,longitude,lat_long[0],lat_long[1]);
          console.log(nearBy,distance)
          if(distance< parseFloat(nearBy)){
            distanceMatch=true;
            distance_nearMe=distance;
          }else{
            distanceMatch=false;
          }
          // console.log(distance,latitude,longitude,lat_long[0],lat_long[1]);
        }
      
           let allChecked=category  && match && priceMatch && distanceMatch;
          
           if(allChecked){
            if(distance_nearMe){
              cards.push([item0._id,item0.name,item,distance_nearMe,item0.userID])
            }else{
              cards.push([item0._id,item0.name,item,null,item0.userID])
            }
        
           }
          
            // console.log(category, item[0].productCat);
            return category;
        });
    });
      res.json(cards);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
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

app.get('/api/wishlist/length', async (req, res) => {
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

app.post("/api/wishlist/:id",async(req,res)=>{
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

//  app.get("/api/wishlistpop/:id", async (req, res) => {
//   try {
//       const userId = req.params.id;
      
//       // Find the user and populate the wishlist array with the referenced documents
//       const user = await User.findById(userId).populate('wishlist.wishlistId');

//       if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//       }

//       res.status(200).json({ wishlist: user.wishlist });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Server error" });
//   }
// });
 
app.get("/api/wishlistpop/:id", async (req, res) => {
  try {
      const userId = req.params.id;
      
      // Find the user and populate the wishlist array with the referenced documents
      const user = await User.findById(userId).populate('wishlist.wishlistId');

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Filter out wishlist items that don't have a reference or couldn't be populated
      user.wishlist = user.wishlist.filter(item => item.wishlistId);

      // Save the user document with filtered wishlist
      await user.save();

      res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/productName/:id", async (req, res) => {
  try {
      const productId = req.params.id;

      // Fetch product details by product _id
      const product = await Product.findById(productId);

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      const productName = product.name;
      const sellerID=product.userID;

      res.status(200).json({ productName,sellerID });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
  }
});

// Route to remove wishlist item from user schema and delete corresponding data from wishlist schema
app.delete('/api/wishlist/:userId/:wishlistId', async (req, res) => {
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

app.get('/api/getProducts/:sellerId/:productId',async(req,res)=>{
  const {sellerId,productId} =req.params;
  console.log(sellerId)
  let user=await Product.find({_id:sellerId})
  
  const product=user[0].products.filter((item)=>{
    return item[0]._id == productId;
  })
  res.send({name:user[0].name,sellerId:user[0].userID,productCard:product})
})

app.delete('/api/deleteProductCard/:userID/:productId', async (req, res) => {
  try {
    const { userID, productId } = req.params;

    // Find the user by userID
    const userProducts = await Product.findOne({ userID });

    if (!userProducts) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Find the index of the product to be deleted
    const productIndex = userProducts.products.findIndex(product => product[0]._id == productId);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Remove the product from the products array
    userProducts.products.splice(productIndex, 1);

    // Save the updated user products document
    await userProducts.save();
    

    // Delete product from wishlist where products._id matches productId
    await Wishlist.deleteMany({ 'products._id': productId });

    res.status(200).json({ message: 'Product deleted successfully from product and wishlist schema' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
}
});

//wild card route 
app.get("*", (req, res) => {
	res.sendFile(path.join(path.resolve(), "frontend", "dist", "index.html"));
});
server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
