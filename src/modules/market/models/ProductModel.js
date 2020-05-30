const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String,  
        required: true,
    },
    image_1: {
        type: String,  
        required: true,
    },
    image_2: {
        type: String, 
    },
    image_3: {
        type: String,  
    },
    description: { 
        type: String,  
        required: true,
    },
    long_description: { 
        type: String,  
    },
    price: { 
        type: Number,  
        required: true,
    },
    stock: { 
        type: Number,  
        required: true,
    },
    featured: { 
        type: Boolean,  
        required: true,
    },
    state: {  
        required: true,
        type: Schema.ObjectId,
        ref: 'state'
    },
    category: {  
        required: true,
        type: Schema.ObjectId,
        ref: 'category'
    },
})

const Product = mongoose.model('product', productSchema);

module.exports = Product;