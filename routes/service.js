const express = require('express');
const path = require('path');
const router = express.Router();
const BodyParser = require('body-parser'),
    passport                = require("passport"),
    // User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");

let User = require('./useschema');
let authentication = require('./authentication');

router.use(require('express-session')({
    secret: 'Find My House',
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.static(path.resolve('./public')));
express().use(BodyParser.urlencoded({extended: true}));

/* GET home page. */
router.get('/', function(req, res, path) {
    console.log(req.session.passport.user);
    res.render('service' ,{path:"service.ejs"});

});


module.exports = router;
