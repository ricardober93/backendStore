const mongoose = require('mongoose');


const ImageSchema = new mongoose.Schema({
    images: { 
        type: Array, 
    },
    product: {
        required: true,
        type: Schema.ObjectId,
        ref: 'product'
    }
})

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;