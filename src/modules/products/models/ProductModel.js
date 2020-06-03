const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, },
  description: { type: String, },
  price: { type:Number },
  image: { type:String },
  raiting: { type: Number },
  SKU: { type:String },
  comentaries: { type: Array},
  state: { type:String },
  mark: { type:String },
  buyers: { type: Array },
  publish: { type: String },
}, {
    timestamps: true
});


module.exports = mongoose.model('Product', ProductSchema );