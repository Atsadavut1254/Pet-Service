var express = require('express');
const path = require('path');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
        let user = '/user/' + req.session.passport.user;
        res.redirect(user);
    } else {
        res.render('login');
    }
});




module.exports = router;
