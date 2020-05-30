const mongoose = require('mongoose');

const cartDetailSchema = new mongoose.Schema({
    discount: { 
        type: Number, 
    },
    price:{
        type: Number,   
        required: true,
    },
    quantity: { 
        type: Number,  
        required: true,
    },
    product: {  
        required: true,
        type: Schema.ObjectId,
        ref: 'product'
    },
    cart: {  
        required: true,
        type: Schema.ObjectId,
        ref: 'cart'
    },
})

const CartDetail = mongoose.model('cart_detail', cartDetailSchema);

module.exports = CartDetail;