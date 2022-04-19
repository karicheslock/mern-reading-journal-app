const express = require('express');
const router = express.Router();
const { getBooks, createBook, getSingleBook, updateBook, deleteBook } = require('../controllers/bookController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getBooks);

router.post('/create-book', protect, createBook);

router.get('/edit-book/:id', protect, getSingleBook);

router.put('/edit-book/:id', protect, updateBook);

router.delete('/:id', protect, deleteBook);

module.exports = router;