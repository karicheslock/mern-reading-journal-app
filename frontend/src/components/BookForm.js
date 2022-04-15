import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createBook} from '../features/books/bookSlice';
import {reset} from '../features/books/bookSlice';
import DatePicker from 'react-date-picker';


function BookForm() {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        synopsis: '',
        date: new Date(),
        notes: '',
        rating: '',
    });

    const {title, author, synopsis, date, notes, rating} = bookData;

    const dispatch = useDispatch();

    const onChange = (e) => {
        setBookData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = e => {
        e.preventDefault();

        const bookData = {
            title,
            author,
            synopsis,
            date,
            notes,
            rating,
        }

        dispatch(createBook(bookData));
        dispatch(reset());
    }

    return (
        <section>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='title'>Title</label>
                    <input 
                        type='text' 
                        name='title'
                        id='title'
                        value={title}
                        onChange={onChange}
                        placeholder='Enter book title'
                    />
                    <label htmlFor='title'>Author</label>
                    <input 
                        type='text' 
                        name='author'
                        id='author'
                        value={author}
                        onChange={onChange}
                        placeholder='Enter book author'
                    />
                    <label htmlFor='date'>Date</label>
                    <DatePicker 
                        name='date'
                        id='date'
                        value={date}
                        onChange={onChange}
                        placeholder='Enter the date'
                    />
                    <label htmlFor='synopsis'>Synopsis</label>
                    <textarea 
                        type='text' 
                        name='synopsis'
                        id='synopsis'
                        value={synopsis}
                        onChange={onChange}
                        placeholder='Enter a summary of the plot'
                    />
                    <label htmlFor='notes'>Notes</label>
                    <textarea 
                        type='text' 
                        name='notes'
                        id='notes'
                        value={notes}
                        onChange={onChange}
                        placeholder='Enter your thoughts about the book'
                    />
                    <label htmlFor='rating'>Rate the Book from 1 to 5 Bookmarks</label>
                    <input 
                        type='text' 
                        name='rating'
                        id='rating'
                        value={rating}
                        onChange={onChange}
                        placeholder='🔖🔖🔖🔖🔖'
                    />
                </div>
                <div>
                    <button type='submit'>
                        Add Book to Reading List
                    </button>
                </div>
            </form>
        </section>
    )
}

export default BookForm;