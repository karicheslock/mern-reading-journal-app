import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';


function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (    
        <div className='container flex bg-amber-50 h-24 items-center justify-between'>               
            <Link to='/' className='px-10 font-mono text-3xl text-teal-700 font-bold'>Reading Journal Builder</Link>
                {user ? (
                    <div className='flex'>
                        <button onClick={onLogout}>
                            <FaSignOutAlt className='text-teal-500' /> 
                            <p className='px-2 text-teal-600'>Logout</p>
                        </button>
                    </div>
                ) : (
                    <div className='flex px-10'>
                                                    
                        <Link to='/login'>
                            <div className='flex px-5 items-center'>
                                <FaSignInAlt className='text-cyan-700' />
                                <p className='px-2 text-teal-600'>Login</p>
                            </div>
                        </Link>
                        
                        
                        <Link to='/register'>
                            <div className='flex px-5 items-center'>
                                <FaUser className='text-cyan-700' /> 
                                <p className='px-2 text-teal-600'>Register</p>
                            </div>
                        </Link>
                        
                    </div>   
                )}
        </div>
    
  )
}

export default Header;