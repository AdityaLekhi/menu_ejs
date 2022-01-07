const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        required: true,
        type: String
    },
    Password: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("User", userSchema);