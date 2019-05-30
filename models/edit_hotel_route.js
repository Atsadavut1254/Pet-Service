var express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
var router = express.Router();

// let grooming = require('./grooming_schema');
let hotel = require('./hotel_schema');
let User = require('./userSchema');
let authenticate = require('./authentication_module');

router.get('/:id', authenticate.isLoggedIn,function(req, res, path) {
    let id = req.params.id;

    User.findOne({username:req.session.passport.user},(err,user)=>{
        hotel.findById(id,(err,data)=>{
            if(err){
                console.log(err);
                res.redirect('/detail_hotel');
            }else{
                res.render('edit_hotel',{data: data,userdata:user});
            }
        })
    })


});

router.post('/:id', authenticate.isLoggedIn,function(req, res, path) {
    let id = req.params.id;
    let data = {
        daycare_name : req.body.__daycare_name,
        daycare_remark : req.body.__daycare_remark,
        daycare_type : req.body.__daycare_type,
        start_date : req.body.__start_date,
        end_date : req.body.__end_date,
        pet_name : req.body.__pet_name,
        room_type : req.body.__room_type,
        count_day :req.body. __count_day,
    };

    console.log(data);

    hotel.findByIdAndUpdate(id,data,(err,data)=>{
        if(err){
            console.log(err);
            res.redirect('/detail_hotel');
        }else{
            res.redirect('/detail_hotel');
        }
    })
    // res.redirect('/detail_grooming');
});


module.exports= router;