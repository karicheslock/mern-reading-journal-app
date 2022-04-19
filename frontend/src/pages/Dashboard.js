import {useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import BookItem from '../components/BookItem';
import Spinner from '../components/Spinner';
import {getBooks, reset} from '../features/books/bookSlice';
import Header from '../components/Header';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const {books, isLoading, isError, message} = useSelector((state) => state.books); 

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getBooks());

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className='container flex flex-col items-center mx-auto justify-center max-w-screen bg-teal-500'>
      <Header />
      <div className='container flex flex-col items-center mx-auto min-h-screen max-w-screen'>
        <div className='mt-8 mb-8 text-3xl bg-amber-50 text-rose-500 px-24 border rounded border-solid border-rose-300 border-4 font-mono py-3 font-bold'>
          <p className='mb-4'>Welcome to your Personal Library, {user && user.firstName}!</p>
          <img src='../../images/bookshelf-clipart-md.png' alt='Bookshelf clipart' className='w-1/2 h-1/2 mx-auto' />
        </div>
        
      
        {books.length > 0 ? (
          <div>
            {books.map((book) => (
              <BookItem key={book._id} book={book} />
            ))}
            <p className='border rounded border-solid border-rose-400 border-4 px-4 py-2 mb-4 bg-amber-50 hover:px-6 hover:py-4 hover:text-xl font-mono text-teal-600 font-bold text-lg text-center'><Link to='/create-book'>Add another book</Link></p>
          </div>
        ) : (
          <div className='container flex flex-col items-center justify-center'>
            
            <div className='font-mono text-2xl mt-4 bg-amber-50 px-24 py-8 text-rose-500 font-bold border rounded border-solid border-rose-300 border-4 flex flex-col items-center'>
            <p className='font-mono text-2xl mb-4 bg-amber-50 px-6 py-8 text-rose-500 font-bold'>Time to start reading!</p>
              <p className='border rounded border-teal-500 border-4 px-4 py-2 mb-4 bg-teal-50 hover:px-6 hover:py-4 hover:text-3xl'><Link to='/create-book'>Add a book</Link></p> <p className='mt-6'>and begin your journey.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard;