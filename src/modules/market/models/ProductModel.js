const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image_preview: { type: String, default: '.' },
        image: { 
            type: Schema.ObjectId,
            ref: 'image'
        },
        raiting: { type: Number },
        SKU: { type: String, required: true },
        stock: { type: Number, required: true },
        state: { type: String,  required: true },
        brand: { 
            type: Schema.ObjectId,
            ref: 'brand' 
        },
        category: { 
            type: Schema.ObjectId,
            ref: 'category'
        },
        publish: { type: Boolean },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;