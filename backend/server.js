const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/Book');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Connect to MongoDB (ensure MongoDB is running locally or use an Atlas connection string)
mongoose.connect('mongodb://127.0.0.1:27017/booklistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// --- RESTful API Routes ---

// READ (GET all books)
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    // MongoDB uses '_id', but our React frontend expects 'id'. We map it here.
    const formattedBooks = books.map(book => ({
      id: book._id,
      title: book.title,
      author: book.author
    }));
    res.json(formattedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ (GET single book for the Update/Delete modals)
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json({ id: book._id, title: book.title, author: book.author });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE (POST new book)
app.post('/api/books', async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author
    });
    await newBook.save();
    res.status(201).json({ id: newBook._id, title: newBook.title, author: newBook.author });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE (PUT existing book)
app.put('/api/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id, 
      { title: req.body.title, author: req.body.author }, 
      { new: true }
    );
    res.json({ id: updatedBook._id, title: updatedBook.title, author: updatedBook.author });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE (DELETE existing book)
app.delete('/api/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));