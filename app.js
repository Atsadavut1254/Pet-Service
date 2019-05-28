let createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    // User                    = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

const port = process.env.PORT || 5000;


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var registerRouter = require('./routes/register');
var serviceRouter = require('./routes/service');
var loginRouter = require('./routes/login');
var hotelRouter = require('./routes/hotel');
var groomingRouter = require('./routes/grooming');
var adminRouter = require('./routes/admin');
var usescchemaRouter = require('./routes/useschema');
var uploadRouter = require('./routes/upload');
var authenticattionRouter = require('./routes/authentication');
var imgRouter = require('./routes/img');


var app = express();

// view engine setup
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/register', registerRouter);
// app.use('/service', serviceRouter);
// app.use('/login', loginRouter);
app.use('/hotel', hotelRouter);
app.use('/grooming', groomingRouter);
app.use('/admin', adminRouter);
app.use('/image', imgRouter);


// //mongoose
mongoose.connect("mongodb+srv://stn:stn1998@cluster0-mb8sl.mongodb.net/findmyhouse?retryWrites=true");


app.use(require('express-session')({
    secret: 'Find My House',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(usescchemaRouter.authenticate()));
passport.serializeUser(usescchemaRouter.serializeUser());
passport.deserializeUser(usescchemaRouter.deserializeUser());


app.get('/service', function (req, res, path) {
    console.log(req.session);
    if (authenticattionRouter.checkLogIn(req, res)) {
        // console.log(req.session);
        usescchemaRouter.findOne({username: req.session.passport.user}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.render('service', {userdata: data});
            }
        })
    } else {
        res.render('service', {userdata: null});
    }


});

//register
app.post('/register', uploadRouter.upload.single("pic"), function (req, res) {
    let imgfile = uploadRouter.uploadIMG(req, res);
    let userData = {
        username: req.body.username,
        name: req.body.name,
        lname: req.body.lname,
        gender: req.body.gender,
        address: req.body.address,
        village: req.body.village,
        road: req.body.road,
        subdistrict: req.body.subdistrict,
        district: req.body.district,
        province: req.body.province,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        pic: imgfile,
        status: req.body.status

    };
    usescchemaRouter.register(new usescchemaRouter(userData), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/user/' + req.session.passport.user);
        });
    });
});

app.get('/register', (req, res) => {
    if (authenticattion.checkLogIn(req, res)) {
        res.redirect('/user/' + req.session.passport.user);
    } else {
        res.render('register');
    }

});

// //login
app.get('/login', (req, res) => {
    console.log(req.session);
    console.log("55555");
    if (req.isAuthenticated()) {
        let service = '/user/' + req.session.passport.user;
        res.redirect('/user/' + req.session.passport.user);
    } else {
        res.render('login');
    }
});

app.post('/login', authenticattionRouter.passport.authenticate('local', {
    successRedirect: '/service',
    failureRedirect: '/login'
}), (req, res) => {

});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('service');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

app.listen(port, function () {
    console.log("server started.......");
});