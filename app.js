const express = require('express');
const app = express();
const ejs = require('ejs');

app.use(express.static('public'));
app.set('view engine', "ejs");


app.get('/menu', function (req, res) {
    res.render('index');
})

app.get('/login', function (req, res) {
    res.render('login');
})

app.get('/register', function (req, res) {
    res.render('index');
})
app.get('/submit', function (req, res) {
    res.render('submit');
})


app.listen(3000, function () {
    console.log("Server is open on port 3000")
})