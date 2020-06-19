var express = require('express');
var router = express.Router({mergeParams:true});
const Hotel = require('../models/hotel');
const middlewareObj = require('../middleware')




router.get('/', function(req,res){
    Hotel.find({},function(err,hotels){
        if(err){
            console.log(err);
        }else{
            res.render('hotels/index',{hotels:hotels});
        }
    });
});

router.post('/',middlewareObj.isLggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newHotel = {name:name,image:image,description:desc,author:author};
    Hotel.create(newHotel,function(err,hotel){
        if(err){
            console.log(err);
        }else{
            console.log(hotel);
            res.redirect('/hotels');
        }
    });
    
});

router.get('/new',middlewareObj.isLggedIn,function(req,res){
    res.render('hotels/new');
});

router.get('/:id',function(req,res){
    Hotel.findById(req.params.id).populate('comments').exec(function(err,foundHotel){
        if(err){
            console.log(err);
        }else{
            res.render('hotels/show',{hotel:foundHotel});
        }
    });
    
});


router.get('/:id/edit',middlewareObj.checkHotelOwnership,function(req,res){
    Hotel.findById(req.params.id, function(err,hotel){
        if(err){
            console.log(err)
        }else{
            res.render('hotels/edit',{hotel:hotel});
        }
    })
    
});

router.put('/:id',middlewareObj.checkHotelOwnership,function(req,res){
    Hotel.findByIdAndUpdate(req.params.id,{name:req.body.name,image:req.body.image,description:req.body.description},
        function(err,hotel){
        if(err){
            console.log(err);
        }else{
            console.log(hotel);
            res.redirect('/hotels/'+req.params.id);
        }
    });
 });

 router.delete('/:id',middlewareObj.checkHotelOwnership,function(req,res){
    Hotel.findByIdAndRemove(req.params.id,function(err,hotel){
        if(err){
            console.log(err);
        }else{
            res.redirect('/hotels');
        }
    });
 });

module.exports = router;

