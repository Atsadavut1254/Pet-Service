var express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
var router = express.Router();

let hotel = require('./hotel_schema');
let User = require('./userSchema');
let authenticate = require('./authentication_module');

/* GET home page. */

router.get('/edit_:id', authentication.isLoggedIn, (req,res)=>{
    let id = req.params.id;
    let sessionname = req.session;
    console.log("1234");
    if(authentication.checkLogIn(req,res) && sessionname.passport.user === id){
        // console.log(sessionname.passport.user);
        hotel.findOne({_id : id}, (err,data)=>{
            if(err){
                return console.log(err);
            }

            res.render('edit_hotel',{_id : data, authen: true});
        });
    }else{
        res.redirect('/detail/edit_'+sessionname.passport.user);
        // res.render('test');
    }
});


module.exports = router;
