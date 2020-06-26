const mongoose = require('mongoose');

const ballSchema = new mongoose.Schema({
    height: {
        type: [],
    },
    bounce: {
        type: String,
    },
    time: {
        type: []
    },
    e: {
        type: String
    },
    h: {
        type: String
    }

})
module.exports = mongoose.model('Ball', ballSchema);