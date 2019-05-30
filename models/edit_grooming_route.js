var express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
var router = express.Router();

// let grooming = require('./grooming_schema');
let grooming = require('./grooming_schema');
let User = require('./userSchema');
let authenticate = require('./authentication_module');

router.get('/:id', authenticate.isLoggedIn,function(req, res, path) {
    let id = req.params.id;

    User.findOne({username:req.session.passport.user},(err,user)=>{
        grooming.findById(id,(err,data)=>{
            if(err){
                console.log(err);
                res.redirect('/detail_grooming');
            }else{
                res.render('edit_groom',{data: data,userdata:user});
            }
        })
    })


});

router.post('/:id', authenticate.isLoggedIn,function(req, res, path) {
    let id = req.params.id;
    let data = {
        grooming_wash_name : req.body.__grooming_wash_name,
        grooming_wash_remark : req.body.__grooming_wash_remark,
        grooming_wash_start_date : req.body.grooming_wash_start_date,
        grooming_type : req.body.__grooming_type,
        pet_name : req.body.__pet_name,
        select_hour : req.body.__select_hour,
        select_minute : req.body.__select_minute
    };

    console.log(data);

    grooming.findByIdAndUpdate(id,data,(err,data)=>{
        if(err){
            console.log(err);
            res.redirect('/detail_grooming');
        }else{
            res.redirect('/detail_grooming');
        }
    })
    // res.redirect('/detail_grooming');
});


module.exports= router;