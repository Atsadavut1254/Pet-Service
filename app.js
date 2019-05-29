const express = require('express');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const passportLocalMongoose = require('passport-local-mongoose');
const path = require('path');
const portNumber = process.env.PORT || 9000;
// const connectString = 'mongodb+srv://stn:' + encodeURIComponent('stn1998') + '@cluster0-mb8sl.mongodb.net/findmyhouse?retryWrites=true';
// mongoose.connect(connectString);
const mongoURI = 'mongodb://localhost/FindMyHouse2';
mongoose.connect(mongoURI);

const app = express();
app.set('view engine', 'ejs');
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('express-session')({
    secret: 'Find My House',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

let User = require('./models/userSchema');
let uploadpic = require('./models/upload');
let authentication = require('./models/authentication_module');
let user_route = require('./models/user_route');


app.use('/user',user_route);


app.get('/', (req, res) => {
    res.render('index');
});


app.get('/service', (req, res) => {
    res.render('service');
});

app.get('/register', (re, res) => {
    res.render('register');
});

app.post('/register', uploadpic.upload.single("pic"), function (req, res) {
    let imgfile = uploadpic.uploadIMG(req, res);
    let userData = {
        username: req.body.username,
        name: req.body.name,
        lname: req.body.lname,
        gender: req.body.gender,
        address: req.body.address,
        village: req.body.village,
        road: req.body.road,
        subdistrict: req.body.subdistrict,
        district: req.body.district,
        province: req.body.province,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        pic: imgfile,
        status: req.body.status

    };
    User.register(new User(userData), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/user/' + req.session.passport.user);
        });
    });
});

app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.send("LOGIN");
    } else {
        res.render('login');
    }
});

app.post('/login', authentication.passport.authenticate('local', {
    successRedirect: '/login',
    failureRedirect: '/register'
}), (req, res) => {

});

app.listen(portNumber, () => {
    console.log("START");
});