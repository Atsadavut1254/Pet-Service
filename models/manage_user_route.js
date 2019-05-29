var express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, path) {
    res.render('manage_user' ,{path:"manage_user.ejs"});
});

module.exports = router;
