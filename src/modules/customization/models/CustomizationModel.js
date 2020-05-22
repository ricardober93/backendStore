const mongoose = require('mongoose');

const CustomizationSchema = new mongoose.Schema({
    color_primary: {type: String, required: true },
    color_secondary: {type: String, required: true},
    text_primary: {type: String, required: true},
    text_secondary: {type: String, required: true},
    logo: {type: String, required: false},
    logo_title: {type: String, required: false},
    logo_mode: {type: String, required: false},
    logo_preview: {type: String, required: false},
    language: {type: String, required: true},
})

const Customization = mongoose.model('customization', CustomizationSchema);

module.exports = Customization;