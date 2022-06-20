const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    quantity : {
        type : String,
        required : true
    },

    price : {
        type : String,
        required : true
    },

    createdBy : {
        type : String,
        required : true
    },

    createdById : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Product',productSchema);