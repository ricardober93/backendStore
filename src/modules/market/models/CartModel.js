const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    total_discount: { 
        type: Number, 
    },
    total_price: { 
        type: Number,  
        required: true,
    },
    order_date: { 
        type: String,  
        required: true,
    },
    arrived_date: { 
        type: String,
    },
    state: {  
        type: String,  
        required: true,
    },
    user: {  
        required: true,
        type: Schema.ObjectId,
        ref: 'user'
    },
})

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;