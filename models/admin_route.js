var express = require('express');
const path = require('path');
var router = express.Router();

let User = require('./userSchema');

/* GET home page. */
router.get('/', function(req, res, path) {
    User.findOne({username:req.session.passport.user}, (err,data)=>{
        if(err){
            res.render('/login');
        }else {
         res.render('admin',{userdata:data});
        }
    })
});

module.exports = router;
