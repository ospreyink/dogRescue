var express = require("express");
var passport = require("passport");
var router = express.Router();
var User = require("../models/user");

router.get("/", function(req, res){
   res.render("landing") ;
});

router.get("/dashboard", isLoggedIn, function(req, res){
   res.render("dashboard");
});

// AUTH ROUTES
router.get("/dashboard", isLoggedIn, function(req, res){
   res.render("dashboard");
});

router.get("/register", isLoggedIn, function(req, res){
   res.render("register");
});

router.post("/register", isLoggedIn, function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render("register");
      }
      passport.authenticate("local")(req, res, function(){
          res.redirect("/dashboard");
      });
   });
});

router.get("/login", function(req, res){
   res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
    }), function(req, res){
    });

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } res.redirect("/login");
}

module.exports = router;