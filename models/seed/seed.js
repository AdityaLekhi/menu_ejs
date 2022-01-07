const mongoose = require("mongoose");
const Menu = require("../menu_model");
const menuList = require("./seedData");

mongoose.connect("mongodb://localhost:27017/menu_ejs")
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((e) => {
        console.log("Error has occured");
        console.log(e);
    })


function createMenu(arr) {
    console.log(arr.Name)
    const newItem = new Menu({
        Name: arr.Name,
        Description: arr.Description,
        Image: arr.Image
    })
    newItem.save()
        .then(() => {
            console.log("Item Saved");
        })
}

menuList.map(createMenu);

