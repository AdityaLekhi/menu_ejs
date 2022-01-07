const mongoose = require("mongoose");


const menuSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Image: String,
})

module.exports = mongoose.model("Menu", menuSchema);