var express = require('express');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, path) {
    res.render('register' ,{path:"register.ejs"});
});

module.exports = router;
