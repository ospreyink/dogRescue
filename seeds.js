var mongoose = require("mongoose"),
    Dog = require("./models/dog");

var data = [
  {
    age: "Adult",
    gender: "Male",
    name: "Bowser",
    catsOK: false,
    childrenOK: true,
    description: "Lorem ipsum dolor sit amet, egestas quis donec wisi vehicula. Urna risus viverra duis leo, fugit cursus vulputate mi dui nullam nulla, commodo scelerisque pellentesque aliquam quis diam, sem non pellentesque tortor, eget litora eu aenean mauris volutpat. Ullamcorper condimentum id enim turpis.",
    image: "https://farm4.staticflickr.com/3909/14556331266_3a249df3b9.jpg",
    specialCare: false,
  },
  {
    age: "Senior",
    gender: "Female",
    name: "Trudie",
    catsOK: true,
    childrenOK: true,
    description: "Lorem ipsum dolor sit amet, in nulla est luctus, adipiscing turpis, eget duis mollis est, tellus adipiscing mus tellus iaculis, arcu at elit bibendum. Fringilla tincidunt bibendum quam a nulla, vestibulum nullam sed ante consequat tempora, velit eu leo mattis nascetur, lacinia sed est rutrum et per congue.",
    image: "https://farm4.staticflickr.com/3744/9237128492_5efd4609e0.jpg",
    specialCare: true,
  },
  {
    age: "Young",
    gender: "Male",
    name: "Copper",
    catsOK: false,
    childrenOK: false,
    description: "Lorem ipsum dolor sit amet, amet mi, eu nibh laoreet, phasellus a wisi libero, mauris vestibulum. Tristique nunc vivamus nisl lectus in lacinia. Non sed in et nullam. Mattis nullam dignissimos sed quis ornare mi, quis conubia fringilla orci, auctor blandit felis amet. Quia nibh in ac tellus, rutrum ultricies, nunc vulputate sit nunc mattis euismod sit, donec pede suspendisse, egestas integer quam sit. Venenatis conubia nibh, vitae id eros dui mollis, suspendisse rhoncus viverra, metus commodo sodales sapien. Aliquam dolor ultricies aliquam venenatis, est lectus accumsan sodales.",
    image: "https://farm3.staticflickr.com/2564/3882108242_98373a3617.jpg",
    specialCare: false,
  }
  ];

function seedDB(){
  // Remove dogs from db
  Dog.remove({}, function(err){
    if(err){
      console.log("Error: " + err);
    } console.log("All dogs removed from DB.");
    // Add dogs to db
    data.forEach(function(seed){
    Dog.create(seed, function(err, data){
      if(err){
        console.log(err);
      } else{
        console.log("added dog");
      }
      });
    });
  });
}

module.exports = seedDB;