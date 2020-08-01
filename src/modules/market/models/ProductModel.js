import {
    Schema,
    model
  } from "mongoose";
  
const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image_preview: { type: String, default: '.' },
        image: { type: Array },
        raiting: { type: Number },
        SKU: { type: String, required: true },
        stock: { type: Number },
        featured: { type: Boolean },
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

const Product = model('product', ProductSchema);

module.exports = Product;