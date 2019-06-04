const express = require('express');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const passportLocalMongoose = require('passport-local-mongoose');
const path = require('path');
const portNumber = process.env.PORT || 5000;
const connectString = 'mongodb+srv://stn:' + encodeURIComponent('stn1998') + '@cluster0-mb8sl.mongodb.net/findmyhouse?retryWrites=true';
mongoose.connect(connectString);
// const mongoURI = 'mongodb://localhost/FindMyHouse2';
// mongoose.connect(mongoURI);

const app = express();
app.set('view engine', 'ejs');
app.use(BodyParser.urlencoded({extended: true}));
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
let image_route = require('./models/image_route');
let grooming_route = require('./models/grooming_route');
let hotel_route = require('./models/hotel_route');
let admin_route = require('./models/admin_route');
let detail_hotel_route = require('./models/detail_hotel_route');
let detail_grooming_route = require('./models/detail_grooming_route');
// let manage_user_route = require('./models/manage_user_route');
// let manage_grooming_route = require('./models/manage_Grooming_route');
// let manage_hotel_route = require('./models/manage_hotel_route');
let edit_groom = require('./models/edit_grooming_route');
let edit_hotel = require('./models/edit_hotel_route');



app.use('/user', user_route);
app.use('/image', image_route);
app.use('/grooming', grooming_route);
app.use('/hotel', hotel_route);
app.use('/admin', admin_route);
app.use('/detail_hotel', detail_hotel_route);
app.use('/detail_grooming', detail_grooming_route);
// app.use('/manage_user', manage_user_route);
// app.use('/manage_Grooming', manage_grooming_route);
// app.use('/manage_hotel', manage_hotel_route);
app.use('/editgroom', edit_groom);
app.use('/edithotel', edit_hotel);


app.get('/', (req, res) => {
    res.redirect('/service');
});


app.get('/service', function (req, res, path) {
    console.log(req.session);
    if (authentication.checkLogIn(req, res)) {
        // console.log(req.session);
        User.findOne({username: req.session.passport.user}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.render('service', {userdata: data});
            }
        })
    }  else {
        res.render('service', {userdata: null});
    }

});

app.get('/register', (req, res) => {
    if (authentication.checkLogIn(req,res)){
        res.redirect('/login');
    } else {
        res.render('register',{userdata:null});
    }
});

app.post('/register', uploadpic.upload.single("picture"), function (req, res) {
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
    console.log(userData);
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
        let user = '/user/' + req.session.passport.user;
        res.redirect(user);
    }  else {
        res.render('login');
    }
});

app.post('/login', authentication.passport.authenticate('local', {
    successRedirect: '/login',
    failureRedirect: '/login'
}), (req, res) => {

});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/service');
});

app.listen(portNumber, () => {
    console.log("SERVER START");
});