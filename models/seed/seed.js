const mongoose = require("mongoose");
const Menu = require("../menu_model");
const menuList = require("./seedData");

mongoose.connect("mongodb+srv://AdityaLekhi:Togosomewhere@cluster0.rhhiw.mongodb.net/menus?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((e) => {
        console.log("Error has occured");
        console.log(e);
    })


async function createMenu(arr) {
    console.log(arr.Name)
    const newItem = new Menu({
        Name: arr.Name,
        Description: arr.Description,
        Image: arr.Image
    })
    await newItem.save()
        .then(() => {
            console.log("Item Saved");
        })
}

menuList.map(createMenu);

