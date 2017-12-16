var express = require("express");
var router = express.Router();
var Dog = require("../models/dog");

// INDEX
router.get("/dogs", function(req, res){
  Dog.find({}, function(err, dogs){
    if(err){
      console.log(err);
    } else {
      res.render("index", {dogs: dogs});
    }
  });
});

// NEW
router.get("/new", isLoggedIn, function(req, res){
  res.render("new");
});

// CREATE
router.post("/dogs", isLoggedIn, function(req, res){
  Dog.create(req.body.dog, function(err, newDog){
    if(err){
      console.log("Error! " + err);
    } else {
      res.redirect("/dogs");
    }
  });
});

// SHOW
router.get("/dogs/:id", function(req, res){
  Dog.findById(req.params.id, function(err, foundDog){
    if(err){
      res.redirect("/dogs");
    } else {
      res.render("show", {dog: foundDog, currentUser: req.user});
    }
  });
});

// EDIT

router.get("/dogs/:id/edit", isLoggedIn, function(req, res){
  Dog.findById(req.params.id, function(err, dog){
    if(err){
      res.redirect("/dogs");
    } else {
      res.render("edit", {dog: dog});
    }
  });
});

// UPDATE

router.put("/dogs/:id", isLoggedIn, function(req, res){
  Dog.findByIdAndUpdate(req.params.id, req.body.dog, function(err, updatedDog){
   if(err){
     res.redirect("/dogs");
   } else {
     res.redirect("/dogs/" + req.params.id);
   }
  });
});

// DESTROY
router.delete("/dogs/:id", isLoggedIn, function(req, res){
  Dog.findByIdAndRemove(req.params.id, function(err, deletedDog){
    if(err){
      res.redirect("/dogs");
    } else {
      res.redirect("/dogs");
    }
  });
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } res.redirect("/login");
}

module.exports = router;