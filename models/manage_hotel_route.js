var express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
var router = express.Router();

// let grooming = require('./grooming_schema');
let hotel = require('./hotel_schema');
let User = require('./userSchema');
let authenticate = require('./authentication_module');

/* GET home page. */
router.get('/', authenticate.isLoggedIn,function(req, res, path) {
    User.findOne({username:req.session.passport.user},(err,user)=>{
        hotel.find({},(err,data)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }else{
                console.log(user);
                res.render('manage_hotel',{data: data,userdata:user});
            }
        });
    })

});

module.exports = router;

