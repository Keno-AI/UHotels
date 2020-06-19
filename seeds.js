var mongoose = require("mongoose");
var Hotel = require("./models/hotel");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Treehotel", 
        image: "https://www.smartertravel.com/uploads/2019/04/treehotel-northern-lights.jpg",
        description:"Kids don’t think twice about sleeping in a treehouse, but as adults, we forget how much fun it is. Revive that childhood magic at Sweden’s remarkable Treehotel, which consists of seven living pods suspended in tall pines up to 20 feet above the forest floor.You get into them via ladder, suspended bridge, or electric stairs.Choices include an abode that looks like a humongous bird’s nest, one shaped like a UFO, and the reflective “Mirrorcube.” Guests get enchanted views of the woods, the Lule River, and (at the right time of year) the aurora borealis. From September to March, the hotel’s employees give guided northern lights tours; all year long, you can eat at the on-site restaurant, which specializes in northern Swedish cuisine, and explore the 600-person village of Harads."

    },
    {
        name: "Bambu Indah", 
        image: "https://cdn.shopify.com/s/files/1/0114/7600/9017/products/Moon_House-6.jpg?v=1549458315",
        description: "A fusion of two worlds lies at Bambu Indah. Serenity and peace of mind is on full display, accompanied by warm local hospitality and luxury service to ensure the most memorable experience possible. We’ve combined all the elements we love about hospitality and travel to create an adventure for your senses that we feel is truly unparalleled."
    },
    {
        name: "Kakslauttanen Arctic Resort", 
        image: "https://pix10.agoda.net/hotelImages/7200672/-1/affdb060500e9b15a8306e89644b55fe.jpg?s=1024x768",
        description: "But if you’re more interested in finding out what it’s like spend the night in a real-life igloo, head to Finland for a stay at Kakslauttanen Arctic Resort, 150 miles north of the Arctic Circle. Most images of it show its rows of glass-domed “igloos,” which are eminently worthwhile in and of themselves, particularly for their unobstructed view of aurora borealis. For the true igloo experience sans quotation marks, however, opt for one of the property’s dozens of actual snow igloos, where you’ll find calm, quiet, and a sleeping bag to keep you toasty in the room’s below-freezing temperature."
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Hotel.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed hotels!");
        Comment.deleteMany({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Hotel.create(seed, function(err, hotel){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a hotel");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer Simpson"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    hotel.comments.push(comment);
                                    hotel.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
}

module.exports = seedDB;