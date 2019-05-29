var express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
var router = express.Router();

let uploadpic = require('./upload_module');
let User = require('./userSchema');
let authenticatione = require('./authentication_module');

/* GET home page. */
router.get('/edit_:username', authentication.isLoggedIn, (req, res) => {
    let val = req.params.username;

    if (req.session.passport.user === val) {
        post.find({ owner: val }, (err, data) => {
            if (err) {
                console.log(err);
                return res.redirect('/user/' + val);
            } else {
                User.findOne({ username: val }, (err, udata) => {
                    if (err) {
                        console.log(err);
                        res.redirect('/user/' + val);
                    } else {
                        res.render('postHistory', { postdata: data, userdata: udata , authen: true});
                    }
                });
                // console.log(data);
            }
        });
    } else {
        res.redirect('/view/user_post_' + req.session.passport.user);
    }
});


module.exports = router;
