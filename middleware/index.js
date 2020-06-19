const Hotel = require('../models/hotel');
const Comment = require('../models/comment');

var middlewareObj = {}

middlewareObj.checkHotelOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Hotel.findById(req.params.id, function(err,hotel){
            if(err){
                res.redirect("back")
            }else{
                if(hotel.author.id.equals(req.user._id)){
                    next()
                }else{
                    res.redirect("back")
                }
            }
        })
    }else {
        res.redirect("back");
    };
}

middlewareObj.isLggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','You have to Log In to do this operation!')
    res.redirect('/login');
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err,comment){
            if(err){
                res.redirect("back")
            }else{
                if(comment.author.id.equals(req.user._id)){
                    next()
                }else{
                    res.redirect("back")
                }
            }
        })
    }else {
        res.redirect("back");
    };
}

module.exports = middlewareObj;
