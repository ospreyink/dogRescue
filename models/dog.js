var mongoose = require("mongoose");

var dogSchema = new mongoose.Schema({
  age: String,
  gender: String,
  name: String,
  catsOK: Boolean,
  childrenOK: Boolean,
  description: String,
  image: String,
  specialCare: Boolean,
});

module.exports = mongoose.model("Dog", dogSchema);