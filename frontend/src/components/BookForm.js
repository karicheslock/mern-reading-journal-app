import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createBook} from '../features/books/bookSlice';
import {reset} from '../features/books/bookSlice';
import DatePicker from 'react-date-picker';
import Header from './Header';


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
        <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen bg-teal-500'>
            <Header />
            <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen'>
                <div className='border-dashed border-sky-300 border-2 rounded h-2/3 w-1/4 bg-amber-50'>
                    <form onSubmit={onSubmit} className='flex flex-col'>
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
                        <button type='submit'>
                            Add Book to Reading List
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookForm;