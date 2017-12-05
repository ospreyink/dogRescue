var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    app = express(),
    Dog = require("./models/dog"),
    User = require("./models/user"),
    seedDB = require("./seeds");

seedDB();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/rescue-rovers", {
   useMongoClient: true
});
app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Stay sexy don't get murdered",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
   res.render("landing") ;
});

// INDEX
app.get("/dogs", function(req, res){
  Dog.find({}, function(err, dogs){
    if(err){
      console.log(err);
    } else {
      res.render("index", {dogs: dogs});
    }
  });
});

// NEW
app.get("/new", isLoggedIn, function(req, res){
  res.render("new");
});

// CREATE
app.post("/dogs", isLoggedIn, function(req, res){
  Dog.create(req.body.dog, function(err, newDog){
    if(err){
      console.log("Error! " + err);
    } else {
      res.redirect("/dogs");
    }
  });
});

// SHOW
app.get("/dogs/:id", function(req, res){
  Dog.findById(req.params.id, function(err, foundDog){
    if(err){
      res.redirect("/dogs");
    } else {
      res.render("show", {dog: foundDog, currentUser: req.user});
    }
  });
});

// EDIT

app.get("/dogs/:id/edit", isLoggedIn, function(req, res){
  Dog.findById(req.params.id, function(err, dog){
    if(err){
      res.redirect("/dogs");
    } else {
      res.render("edit", {dog: dog});
    }
  });
});

// UPDATE

app.put("/dogs/:id", isLoggedIn, function(req, res){
  Dog.findByIdAndUpdate(req.params.id, req.body.dog, function(err, updatedDog){
   if(err){
     res.redirect("/dogs");
   } else {
     res.redirect("/dogs/" + req.params.id);
   }
  });
});

// DESTROY
app.delete("/dogs/:id", isLoggedIn, function(req, res){
  Dog.findByIdAndRemove(req.params.id, function(err, deletedDog){
    if(err){
      res.redirect("/dogs");
    } else {
      res.redirect("/dogs");
    }
  });
});

app.get("/dashboard", isLoggedIn, function(req, res){
   res.render("dashboard");
});

// AUTH ROUTES

app.get("/register", isLoggedIn, function(req, res){
   res.render("register");
});

app.post("/register", isLoggedIn, function(req, res){
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

app.get("/login", function(req, res){
   res.render("login");
});

app.post("/login", passport.authenticate("local",
    {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
    }), function(req, res){
    });

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


// MIDDLEWARE

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("*** SERVER STARTED ***");
});