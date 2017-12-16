// DEPENDENCIES
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

// ROUTES
var dogRoutes = require('./routes/dogs'),
    indexRoutes = require("./routes/index");

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

app.use(indexRoutes);
app.use(dogRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("*** SERVER STARTED ***");
});