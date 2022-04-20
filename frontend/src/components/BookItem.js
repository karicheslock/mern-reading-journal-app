import {useDispatch} from 'react-redux';
import { deleteBook } from '../features/books/bookSlice';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

function BookItem({book}) {
    const dispatch = useDispatch();

  return (
    <div className='container flex flex-col bg-amber-50 mb-4 font-mono border rounded shadow-2xl shadow-gray-900 max-w-md'>
        <p className='border-b-2 border-solid border-black px-1.5 pt-1.5'>Title: {book.title}</p>
        <p className='border-b-2 border-solid border-black px-1.5 pt-1.5'>Author: {book.author}</p>
        <p className='border-b-2 border-solid border-black px-1.5 pt-1.5'>Date: {book.date}</p>
        <p className='border-b-2 border-solid border-black px-1.5 pt-1.5'>Synopsis: {book.synopsis}</p>
        <p className='border-b-2 border-solid border-black px-1.5 pt-1.5'>My Notes: {book.notes}</p>
        <div className='container flex border-b-2 border-solid border-black px-1.5 pt-1.5'>
            <p className='pr-2'>My rating: </p>
            <ReactStars edit={false} value={book.rating} />
        </div>
        <button className='flex mx-auto border border-solid border-black px-1 hover:text-lg mt-1' onClick={() => dispatch(deleteBook(book._id))}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete Entry
        </button>
        <Link to={'/edit-book/' + book._id} className='flex mx-auto border border-solid border-black px-2 hover:text-lg mt-1 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Entry
        </Link>
    </div>
  )
}

export default BookItem;

