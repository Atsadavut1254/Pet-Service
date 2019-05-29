const express = require('express');
const BodyParser = require('body-parser');
const authentication = require('./authentication_module');
const router = express.Router();
const paths = require('path');

let hotel = require('./hotel_schema');
let grooming = require('./grooming_schema');
router.use(express.static(paths.resolve('./public')));

express().use(BodyParser.urlencoded({extended: true}));


router.get('/hotel/:id',authentication.isLoggedIn, (req,res)=>{
    let id = req.params.id;
    let ss = req.session.passport.user;

    hotel.findById(id,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            if(ss === data.owner){
                post.findByIdAndDelete(id,(err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect('/detail_hotel'+ss);
                    }
                });
            }else{
                res.redirect('/login');
            }
        }
    });
});



router.get('/grooming/:id',authentication.isLoggedIn, (req,res)=>{
    let id = req.params.id;
    let ss = req.session.passport.user;

    grooming.findById(id,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            if(ss === data.owner){
                post.findByIdAndDelete(id,(err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect('/detail_grooming'+ss);
                    }
                });
            }else{
                res.redirect('/login');
            }
        }
    });
});

