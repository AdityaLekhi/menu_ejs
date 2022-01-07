const express = require('express');
const app = express();
const mongoose = require("mongoose");
const ejs = require('ejs');
const ejsMate = require("ejs-mate");
const Menu = require("./models/menu_model");
const User = require("./models/user_model")

app.use(express.static('public'));
app.engine("ejs", ejsMate);
app.set('view engine', "ejs");

mongoose.connect("mongodb://localhost:27017/menu_ejs")
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((e) => {
        console.log("Error has occured");
        console.log(e);
    })


app.get('/menu', function (req, res) {
    Menu.find({}, function (err, results) {
        if (err) {
            console.log(err);
            res.send("A problem has occured while looking for Menus");
        } else {
            res.render('menu', { results: results });
        }
    })

})

app.get('/login', function (req, res) {
    res.render('login');
})

app.get('/authen', function (req, res) {
    res.render('authen');
})

app.get('/register', function (req, res) {
    res.render('register');
})
app.get('/submit', function (req, res) {
    res.render('submit');
})


app.listen(3000, function () {
    console.log("Server is open on port 3000")
})