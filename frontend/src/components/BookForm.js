import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createBook} from '../features/books/bookSlice';
import {reset} from '../features/books/bookSlice';
import Header from './Header';
import {Link, useNavigate} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

function BookForm() {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        synopsis: '',
        date: '',
        notes: '',
        rating: 0,
    });

    const {title, author, synopsis, date, notes, rating} = bookData;
    
    const ratingChanged = (newRating) => {
        setBookData((prevState) => ({
            ...prevState,
            rating: newRating
        }))
      };

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        navigate('/');
    }

    return (
        <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen bg-teal-500'>
            <Header />
            <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen'>
                <div className='border-dashed border-sky-300 border-2 rounded h-fit w-1/4 bg-amber-50'>
                    <form onSubmit={onSubmit} className='flex flex-col'>
                        
                        <input 
                            type='text' 
                            className="px-1 pt-3 font-mono"
                            name='title'
                            id='title'
                            value={title}
                            onChange={onChange}
                            placeholder='Enter book title'
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='title'>Title</label>
                        
                        <input 
                            type='text' 
                            className="px-1 pt-3 font-mono"
                            name='author'
                            id='author'
                            value={author}
                            onChange={onChange}
                            placeholder='Enter book author'
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='title'>Author</label>
                        
                        <input 
                            type='text' 
                            className="px-1 pt-3 font-mono"
                            name='date'
                            id='date'
                            value={date}
                            onChange={onChange}
                            placeholder='Enter the date'
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='date'>Date</label>
                        
                        <textarea 
                            type='text'
                            className='font-mono h-36 px-1' 
                            name='synopsis'
                            id='synopsis'
                            value={synopsis}
                            onChange={onChange}
                            placeholder='Enter a summary of the plot'
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='synopsis'>Synopsis</label>
                        
                        <textarea 
                            type='text' 
                            className='font-mono h-36 px-1'
                            name='notes'
                            id='notes'
                            value={notes}
                            onChange={onChange}
                            placeholder='Enter your thoughts about the book'
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='notes'>Notes</label>
                        
                        <ReactStars  
                            className='pt-2'
                            name='rating'
                            id='rating'
                            value={rating}
                            count={5}
                            onChange={ratingChanged}
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='rating'>Rate the Book from 1 to 5 Stars</label>
                        <button type='submit' className='border rounded border-rose-300 border-4 mb-4 bg-amber-50 hover:py-2 hover:text-lg w-2/3 mx-auto text-teal-600 font-bold mt-4 py-1'>
                            Add Book to Reading List
                        </button>
                        <div className='mx-auto'><Link to='/'><p className='text-rose-500 hover:text-lg'>Cancel</p></Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookForm;