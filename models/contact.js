const mongoose = require("mongoose")

const contactS = mongoose.Schema({
    name:{
        type: String
    }
})

const ContactModel = mongoose.model('contact',contactS)
module.exports = ContactModel