const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: [true, 'Please enter a title']
        },
        author: {
            type: String,
            required: [true, 'Please enter an author or Anonymous for none']
        },
        synopsis: {
            type: String,
        },
        date: {
            type: String,
        },
        notes: {
            type: String
        },
        rating: {
            type: Number,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Book', bookSchema);