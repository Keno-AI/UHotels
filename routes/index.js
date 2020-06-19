var express = require('express');
var router = express.Router();
const User = require('../models/user')
const passport = require('passport');

router.get('/',function(req,res){
    res.render('landing');
});

router.get('/register',function(req,res){
    res.render('register');
});

router.post('/register',function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err)
            req.flash('error',err.message)
            res.redirect('register');
        }
        passport.authenticate('local')(req,res,function(){
            req.flash('success','Welcome to the Uhotels '+newUser.username)
            res.redirect('hotels');
        });
    });
});

router.get('/login',function(req,res){
    res.render('login');
});

router.post('/login',passport.authenticate("local",{
    successRedirect:'/hotels',
    failureRedirect:'/login'
}),function(req,res){
    
});

router.get('/logout',function(req,res){
    req.logout();
    req.flash('success','You Logged Out!')
    res.redirect('/hotels');
})


module.exports = router;