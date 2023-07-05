const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const ratingsSchema = mongoose.Schema({
  userId: String,
  grade: Number,
});

const bookSchema = mongoose.Schema({
  userId: { type : String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre : { type: String, required: true },
  ratings :  [ratingsSchema],
  averageRating: { type: Number },
  
});

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Book", bookSchema);