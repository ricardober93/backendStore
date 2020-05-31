const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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

const Category = mongoose.model('category', categorySchema);

module.exports = Category;