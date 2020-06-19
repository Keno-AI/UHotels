var express = require('express');
var router = express.Router({mergeParams:true});
const Hotel = require('../models/hotel');
const Comment = require('../models/comment');
const middlewareObj = require('../middleware')





router.post('/',middlewareObj.isLggedIn,function(req,res){
    Hotel.findById(req.params.id, function(err,hotel){
        if(err){
            console.log(err);
        }else{
            Comment.create({text:req.body.text,author:req.body.author},function(err,comment){
                if(err){
                    console.log(err)
                }else{
                    comment.author.id =req.user._id;
                    
                    comment.author.username = req.user.username;
                    comment.save();
                    hotel.comments.push(comment);
                    hotel.save();
                    res.redirect('/hotels/'+req.params.id)
                }
            })
        }
    })
    
});

router.get('/new',middlewareObj.isLggedIn,function(req,res){
    Hotel.findById(req.params.id, function(err,hotel){
        if(err){
            console.log(err);
        }else{
            res.render('comments/new',{hotel:hotel});
        }
    })
    
});

router.get('/:comment_id/edit',middlewareObj.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,comment){
        if(err){
            console.log(err)
        }else{
            
            res.render('comments/edit',{hotel_id:req.params.id,comment:comment})
        }
    })
});

router.put('/:comment_id',middlewareObj.checkCommentOwnership,function(req,res){

    Comment.findByIdAndUpdate(req.params.comment_id,{text:req.body.text}, function(err,comment){
        if(err){
            console.log(err)
        }else{
            
            res.redirect('/hotels/'+req.params.id)
        }
    })
});

router.delete('/:comment_id',middlewareObj.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err,comment){
        if(err){
            console.log(err);
        }else{
            res.redirect('/hotels/'+req.params.id);
        }
    });
 });






module.exports = router;