var express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
var router = express.Router();

let grooming = require('./grooming_schema');
let User = require('./userSchema');
let authenticate = require('./authentication_module');

/* GET home page. */




router.get('/', authenticate.isLoggedIn,function(req, res, path) {
    User.findOne({username:req.session.passport.user},(err,user)=>{
        if(err){
            res.redirect('/login');
        }else {
            res.render('grooming',{userdata:user});

        }
    })
});

router.post('/new',(req,res)=>{
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

    grooming.create(data);
    res.redirect('/detail_grooming');
});

router.get('/delete/:id',(req,res)=>{
    let id = req.params.id;

    grooming.findByIdAndDelete(id,(err,del)=>{
        if(err){
            console.log(err);

        }
        res.redirect('/detail_grooming');
    })
})

module.exports = router;
