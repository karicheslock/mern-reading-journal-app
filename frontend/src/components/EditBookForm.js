import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getSingleBook} from '../features/books/bookSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';

function EditBookForm() {
    
    const [newBookData, setNewBookData] = useState({
        title: '',
        author: '',
        synopsis: '',
        date: '',
        notes: '',
        rating: 0,
    });

    const {title, author, synopsis, date, notes, rating} = newBookData;
    
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSingleBook(id))
            .then(res => {
                setNewBookData(res.payload)
            })
    }, [id, dispatch]);

    const ratingChanged = (newRating) => {
        setNewBookData((prevState) => ({
            ...prevState,
            rating: newRating
        }))
      };

    const onChange = (e) => {
        setNewBookData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const newBookData = {
            title,
            author,
            synopsis,
            date,
            notes,
            rating,
        }

        const token = user.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    
        await axios.put(`/api/books/edit-book/${id}`, newBookData, config);
        
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
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='title'>Title</label>
                        
                        <input 
                            type='text' 
                            className="px-1 pt-3 font-mono"
                            name='author'
                            id='author'
                            value={author}
                            onChange={onChange}
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='title'>Author</label>
                        
                        <input 
                            type='text' 
                            className="px-1 pt-3 font-mono"
                            name='date'
                            id='date'
                            value={date}
                            onChange={onChange}
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='date'>Date</label>
                        
                        <textarea 
                            type='text'
                            className='font-mono h-36 px-1' 
                            name='synopsis'
                            id='synopsis'
                            value={synopsis}
                            onChange={onChange}
                        />
                        <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='synopsis'>Synopsis</label>
                        
                        <textarea 
                            type='text' 
                            className='font-mono h-36 px-1'
                            name='notes'
                            id='notes'
                            value={notes}
                            onChange={onChange}
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
                            Save Changes
                        </button>
                        <div className='mx-auto'><Link to='/'><p className='text-rose-500 hover:text-lg'>Cancel</p></Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditBookForm;