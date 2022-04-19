import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {updateBook, getSingleBook} from '../features/books/bookSlice';
import {reset} from '../features/books/bookSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';

function BookForm() {
    
    /* const [newBookData, setNewBookData] = useState({
        title: '',
        author: '',
        synopsis: '',
        date: '',
        notes: '',
        rating: '',
    }); */

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [rating, setRating] = useState(0);

    // const {title, author, synopsis, date, notes, rating} = newBookData;
    
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* useEffect(() => {
        dispatch(getSingleBook(id))
            .then(res => {
                setNewBookData(res.data)
            })
    }, [id, dispatch]); */


    useEffect(() => {
        dispatch(getSingleBook(id))
            .then(res => {
                setTitle(res.data.title)
            })
            .then(res => {
                setAuthor(res.data.author)
            })
            .then(res => {
                setSynopsis(res.data.synopsis)
            })
            .then(res => {
                setDate(res.data.date)
            })
            .then(res => {
                setNotes(res.data.notes)
            })
            .then(res => {
                setRating(res.data.rating)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id, dispatch]);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const onAuthorChange = (e) => {
        setAuthor(e.target.value);
    }

    const onSynopsisChange = (e) => {
        setSynopsis(e.target.value);
    }

    const onDateChange = (e) => {
        setDate(e.target.value);
    }

    const onNotesChange = (e) => {
        setNotes(e.target.value);
    }

    const onRatingChange = (e) => {
        setRating(e.target.value);
    }


   /*  const onChange = (e) => {
        setNewBookData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    } */

    const onSubmit = e => {
        e.preventDefault();

        const newBookData = {
            title,
            author,
            synopsis,
            date,
            notes,
            rating,
        }

        dispatch(updateBook(newBookData));
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
                            onChange={onTitleChange}
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='title'>Title</label>
                        
                        <input 
                            type='text' 
                            className="px-1 pt-3 font-mono"
                            name='author'
                            id='author'
                            value={author}
                            onChange={onAuthorChange}
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='title'>Author</label>
                        
                        <input 
                            type='text' 
                            className="px-1 pt-3 font-mono"
                            name='date'
                            id='date'
                            value={date}
                            onChange={onDateChange}
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='date'>Date</label>
                        
                        <textarea 
                            type='text'
                            className='font-mono h-36 px-1' 
                            name='synopsis'
                            id='synopsis'
                            value={synopsis}
                            onChange={onSynopsisChange}
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='synopsis'>Synopsis</label>
                        
                        <textarea 
                            type='text' 
                            className='font-mono h-36 px-1'
                            name='notes'
                            id='notes'
                            value={notes}
                            onChange={onNotesChange}
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='notes'>Notes</label>
                        
                        <input 
                            type='text' 
                            className='pt-2'
                            name='rating'
                            id='rating'
                            value={rating}
                            onChange={onRatingChange}
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='rating'>Rate the Book from 1 to 5 Bookmarks</label>
                        <button type='submit' className='border rounded border-rose-300 border-4 mb-4 bg-amber-50 hover:py-2 hover:text-lg w-2/3 mx-auto text-teal-600 font-bold mt-4 py-1'>
                            Save Changes
                        </button>
                        <div className='mx-auto'><Link to='/'><p className='text-rose-500 hover:text-lg'>Cancel</p></Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookForm;