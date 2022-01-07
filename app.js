const express = require('express');
const app = express();
const mongoose = require("mongoose");
const ejs = require('ejs');
const ejsMate = require("ejs-mate");
const Menu = require("./models/menu_model");
const User = require("./models/user_model");
const md5 = require("md5");

let name = "";

// function capture_user(req, res, next) {
//     user_name = req.body.user_name
//     next();
// }

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.set('view engine', "ejs");



mongoose.connect("mongodb+srv://AdityaLekhi:Togosomewhere@cluster0.rhhiw.mongodb.net/menus?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((e) => {
        console.log("Error has occured in Menu Database");
        console.log(e);
    });


app.get('/', function (req, res) {
    res.redirect("menu")
})

app.get('/menu', function (req, res) {
    Menu.find({}, function (err, results) {
        if (err) {
            console.log(err);
            res.send("A problem has occured while looking for Menus");
        } else {
            res.render('menu', { results: results, user_name: name });
        }
    })

})

app.get('/login', function (req, res) {
    res.render('login');
})

app.post('/login', function (req, res) {
    const { user_name, password } = req.body
    let hash_password = md5(password)
    name = user_name
    User.findOne({ Name: user_name }, function (err, found) {
        if (err) {
            console.log(err)
        } else
            if (found) {

                if (found.Password === hash_password) {

                    res.redirect("menu");
                } else {
                    res.redirect("authen")
                }
            } else {
                res.redirect("authen")
            }
    })
})

app.get("/logout", function (req, res) {
    name = "";
    res.redirect("authen")
})

app.get('/authen', function (req, res) {
    res.render('authen');
})

app.get('/register', function (req, res) {
    res.render('register');
})

app.post('/register', async function (req, res) {
    const { user_name, password } = req.body;
    let hash_password = md5(password)
    console.log(hash_password);
    name = user_name
    const new_user = new User({
        Name: user_name,
        Password: hash_password
    });
    await new_user.save()
        .then(() => {
            console.log("New user has been saved");
        })
        .then(() => {
            res.redirect("menu");
        })

})

app.get('/submit', function (req, res) {
    if (name === "") {
        res.render('submit_fake');
    } else {
        res.render('submit');
    }
})


app.listen(3000, function () {
    console.log("Server is open on port 3000")
})