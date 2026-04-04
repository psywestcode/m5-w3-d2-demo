const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model('Book', bookSchema);