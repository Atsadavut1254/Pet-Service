var express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
var router = express.Router();

let grooming = require('./grooming_schema');
let User = require('./userSchema');
let authenticatione = require('./authentication_module');

/* GET home page. */
router.get('/', function (req, res, path) {
    if (authenticatione.checkLogIn(req, res)) {
        User.findOne({username: req.session.passport.user}, (err, user) => {
            grooming.find({}, (err, data) => {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    console.log(data);
                    res.render('manage_Grooming', {data: data, userdata: user});
                }
            });
        })
    } else {
        res.redirect('/login');
    }
});


module.exports = router;
