const asyncHandler = require('express-async-handler');

const Book = require('../models/bookModel');
const User = require('../models/userModel');

// @desc    Get books
// @route   GET /api/books
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({ user: req.user.id })

    res.status(200).json(books);
});

// @desc    Create book
// @route   POST /api/books
// @access  Private
const createBook = asyncHandler(async (req, res) => {
    const { title, author, synopsis, date, notes, rating } = req.body;

    if (!title || !author) {
        res.status(400)
        throw new Error('Please add a title and author')
    };

    const book = await Book.create({
        title,
        author,
        synopsis,
        date,
        notes,
        rating,
        user: req.user.id,
    })

    res.status(200).json(book);
});

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if(!book) {
        res.status(400)
        throw new Error('Book not found')
    };

    // check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    };

    // check if logged in user matches book user
    if(book.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    };

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedBook);
});

// @desc Delete book
// @route DELETE /api/books/:id
// @access Private
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if(!book) {
        res.status(400)
        throw new Error('Book not found')
    };

    // check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    };

    // check if logged in user matches book user
    if(book.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    };

    await book.remove();

    res.status(200).json({id: req.params.id });
});

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
};