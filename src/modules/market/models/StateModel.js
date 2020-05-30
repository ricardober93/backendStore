const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: { 
        type: String,  
        required: true,
    },
    description: { 
        type: String,
    },
})

const State = mongoose.model('state', stateSchema);

module.exports = State;