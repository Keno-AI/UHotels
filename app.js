const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const mongoose = require('mongoose');
const flash = require('connect-flash');
const Hotel = require('./models/hotel');
const Comment = require('./models/comment');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const User = require('./models/user')

var hotelsRoutes = require('./routes/hotels'),
    commentsRoutes =require('./routes/comments'),
    indexRoutes=require('./routes/index')
  


mongoose.connect('mongodb://127.0.0.1:27017/hotels',{ useUnifiedTopology: true,useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
mongoose.set('useFindAndModify', false);
app.use(flash());

//PASSWORD CONFIGURATION
app.use(require('express-session')({
    secret:"Yeap,that is just simple@!",
    resave:false,
    saveUninitialized:false
}));
console.log(__dirname + "/public")
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})

app.use('/hotels',hotelsRoutes);
app.use(indexRoutes);
app.use('/hotels/:id/comments',commentsRoutes);






app.listen(port, function(){
    console.log(`Example app listening at http://localhost:${port}`);
});