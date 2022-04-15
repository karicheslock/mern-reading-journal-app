import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        password2: ''
    });

    const {firstName, lastName, email, username, password, password2} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                lastName, firstName, email, username, password
            }

            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen bg-teal-500'>
        <Header />
        <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen'>
            <div className='border-dashed border-sky-300 border-2 rounded h-7/8 w-1/4 bg-amber-50'>
                <p className='mb-1 text-xl p-4 text-slate-400 text-center font-mono'>Please create an account</p> 
                <form className='flex flex-col' onSubmit={onSubmit}>
                    <div>
                        <input 
                            type="text" 
                            className="px-3 pt-5 font-mono w-full" 
                            id="firstName" 
                            name="firstName" 
                            value={firstName} 
                            placeholder='Enter your first name' 
                            onChange={onChange} 
                        />
                    </div>
                    <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' for='firstName'>First Name</label>
                    <div>
                        <input 
                            type="text" 
                            className="px-3 pt-5 font-mono w-full" 
                            id="lastName" 
                            name="lastName" 
                            value={lastName} 
                            placeholder='Enter your last name' 
                            onChange={onChange} 
                        />
                    </div>
                    <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' for='lastName'>Last Name</label>
                    <div>
                        <input 
                            type="email" 
                            className="px-3 pt-5 font-mono w-full"
                            id="email" 
                            name="email" 
                            value={email} 
                            placeholder='Enter your email' 
                            onChange={onChange} 
                        />
                    </div>
                    <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' for='email'>Email</label>
                    <div>
                        <input 
                            type="text" 
                            className="px-3 pt-5 font-mono w-full" 
                            id="username" 
                            name="username" 
                            value={username} 
                            placeholder='Create a username' 
                            onChange={onChange} 
                        />
                    </div>
                    <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' for='username'>Username</label>
                    <div>
                        <input 
                            type="password" 
                            className="px-3 pt-5 font-mono w-full" 
                            id="password" 
                            name="password" 
                            value={password} 
                            placeholder='Create a password' 
                            onChange={onChange} 
                        />
                    </div>
                    <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' for='password'>Password</label>
                    <div>
                        <input 
                            type="password" 
                            className="px-3 pt-5 font-mono w-full" 
                            id="password2" 
                            name="password2" 
                            value={password2} 
                            placeholder='Confirm your password' 
                            onChange={onChange} 
                        />
                    </div>
                    <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' for='password2'>Confirm Password</label>
                    <button className='font-mono w-1/2 mx-auto py-2 border-solid border-slate-300 border-2 rounded mt-3 text-teal-700 font-bold bg-slate-50 hover:w-2/3 hover:py-3 hover:bg-slate-100' type='submit'>
                        Submit
                    </button>
                </form>
                <p className='mt-4 text-center text-slate-400 font-mono'>Already have an account?</p>
                <p className='text-center text-slate-400 font-mono mb-1'> Click <Link to='/login' className='text-teal-500 hover:font-bold hover:text-teal-700'>here</Link> to login.</p>
            </div>
        </div>
    </div>
  )
}

export default Register