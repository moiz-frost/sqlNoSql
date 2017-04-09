var mongoose = require('mongoose');

var schema = mongoose.Schema;

// Create a new schema
var customerSchema = new schema({
    name: {
        type: String,
        //required: true,
        unique: true
    },
    address: {
        type: String
    },
    zipCode: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    },
    added: {
        type: Date,
        default: Date.now()
    }
});

// Export it publicly
module.exports = mongoose.model("CustomerDetails", customerSchema);
