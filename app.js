var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/rescue-rovers", {
   useMongoClient: true
});
app.use(express.static(__dirname + "/public"));

var dogSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
});

var Dog = mongoose.model("Dog", dogSchema);


// Dog.create({
//   name: "Bowser",
//   description: "Lorem ipsum dolor sit amet, non ullamcorper nec gravida magna fermentum dictum, in sit eos, neque bibendum ligula wisi justo, nullam imperdiet, dolor enim. Dui ipsum ut eros optio erat,",
//   image: "https://farm5.staticflickr.com/4125/5172102774_3e4ce230d9.jpg"
// },
//   {
//     name: "Gustav",
//     description: "Sodales nec integer, dignissim mauris justo aenean et, nullam felis euismod id libero vulputate luctus. Mauris lorem arcu sed nullam, gravida pulvinar tempus nulla, eu pellentesque justo maecenas nunc.",
//     image: "https://farm4.staticflickr.com/3940/15473596487_5ed985dd35.jpg"
//   }
// );

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
  })
});

// NEW
app.get("/new", function(req, res){
  res.render("new");
});

// CREATE
app.post("/dogs", function(req, res){
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
      res.render("show", {dog: foundDog});
    }
  });
});

// EDIT

app.get("/dogs/:id/edit", function(req, res){
  Dog.findById(req.params.id, function(err, dog){
    if(err){
      res.redirect("/dogs");
    } else {
      res.render("edit", {dog: dog});
    }
  });
});

// UPDATE

app.put("/dogs/:id", function(req, res){
  Dog.findByIdAndUpdate(req.params.id, req.body.dog, function(err, updatedDog){
   if(err){
     res.redirect("/dogs");
   } else {
     res.redirect("/dogs/" + req.params.id);
   }
  });
});

// DESTROY
app.delete("/dogs/:id", function(req, res){
  Dog.findByIdAndRemove(req.params.id, function(err, deletedDog){
    if(err){
      res.redirect("/dogs");
    } else {
      res.redirect("/dogs");
    }
  });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("*** SERVER STARTED ***");
});