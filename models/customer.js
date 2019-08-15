const mongoose = require('mongoose');

//Customer schema
const customerSchema = mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    email: { type: String }
});

//Define and export schema
module.exports = mongoose.model("Customer", customerSchema);