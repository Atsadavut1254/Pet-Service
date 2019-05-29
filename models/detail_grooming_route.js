var express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
var router = express.Router();

// let grooming = require('./grooming_schema');
let grooming = require('./grooming_schema');
let User = require('./userSchema');
let authenticate = require('./authentication_module');

/* GET home page. */
router.get('/', authenticate.isLoggedIn,function(req, res, path) {
    User.findOne({username:req.session.passport.user},(err,user)=>{
        grooming.find({},(err,data)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }else{
                console.log(data);
                res.render('detail_grooming',{data: data,userdata:user});
            }
        });
    })
});

module.exports = router;

