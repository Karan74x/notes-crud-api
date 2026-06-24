const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model("note", noteSchema);
