var express = require('express');
const path = require('path');
var router = express.Router();
const BodyParser = require('body-parser');


let hotel = require('./hotel_schema');
let User = require('./userSchema');
let authenticate = require('./authentication_module');

/* GET home page. */
router.get('/', authenticate.isLoggedIn,function(req, res, path) {
    User.findOne({username:req.session.passport.user},(err,user)=>{
        if(err){
            res.redirect('/login');
        }else {
            res.render('hotel',{userdata:user});

        }
    })
});

router.post('/new',(req,res)=>{
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

    hotel.create(data);
    res.redirect('/detail_hotel');
});


module.exports = router;
