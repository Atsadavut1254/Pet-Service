const express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
const router = express.Router();

let User = require('./userSchema');
let authentication = require('./authentication_module');
// let uploadpic = require('./upload_module');
// let post = require('./post_schema');

router.use(express.static(path.resolve('./public')));
express().use(BodyParser.urlencoded({extended: true}));


router.get('/:id', (req, res) => {
    let id = req.params.id;
    let sessionname = req.session;

    if (authentication.checkLogIn(req, res) && sessionname.passport.user === id) {
        // console.log(sessionname.passport.user);
        User.findOne({ username: id }, (err, data) => {
            if (err) {
                return console.log(err);
            }
            res.render('user', { userdata: data, authen: true });
            // console.log(data);
            // res.redirect('/');
            // res.render('user',{userdata : data, authen: true});
        });
    } else {
        User.findOne({ username: id }, (err, data) => {
            if (err) {
                return console.log(err);
            }
            res.render('user', { userdata: data, authen: false });
            // console.log(data);
            // res.redirect('/');
            // res.render('user',{userdata : data, authen: false});
        });
    }
});


module.exports = router;