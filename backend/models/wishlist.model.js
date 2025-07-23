const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Assuming your user model is named 'User'
    },
    products: {
        productName: String,
        productCat: String,
        productDesc: String,
        productLocation:String,
        productPrice: Number,
        productImg: [String],
        lat_long:String,
        _id:mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('wishlist', wishlistSchema);
