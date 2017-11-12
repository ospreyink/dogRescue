var express = require('express'),
    mongoose = require('mongoose'),
    app = express();

app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/rescue-rovers", {
   useMongoClient: true
});


app.get("/", function(req, res){
   res.render("landing") ;
});

app.get("/dogs", function(req, res){
  res.render("index");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("*** SERVER STARTED ***");
});