const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name: { 
        type: String,  
        required: true,
    },
    description: { 
        type: String,
    },
    image_url: { 
        type: String,
    },
    featured: { 
        type: Boolean,  
        required: true,
    },
    state: {  
        type: String,  
        required: true,
    },
})

const Brand = mongoose.model('brand', BrandSchema);

module.exports = Brand;