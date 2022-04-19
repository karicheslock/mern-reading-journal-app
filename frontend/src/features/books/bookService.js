import axios from 'axios';

const API_URL = '/api/books/';

// Create new book
const createBook = async (bookData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}create-book`, bookData, config);

    return response.data;
}

// Get books
const getBooks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
}

// Get single book
const getSingleBook = async(bookId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}edit-book/${bookId}`, config);

    return response.data;
}

// Update book
const updateBook = async (bookId, bookData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}edit-book/${bookId}`, bookData, config);

    return response.data;
}

// Delete book
const deleteBook = async (bookId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + bookId, config);

    return response.data;
}

const bookService = {
    createBook,
    getBooks,
    getSingleBook,
    updateBook,
    deleteBook,
}

export default bookService;