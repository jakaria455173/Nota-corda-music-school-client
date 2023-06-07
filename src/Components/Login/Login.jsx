import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useRef, useState } from 'react'
import PasswordHideShow from '../Shared/PasswordHideShow'
import UseAuth from '../../Hooks/UseAuth'
import HandleGoogle from './HandleGoogle'
import { savedUser } from '../../CommonApi/Auth'
const Login = () => {
  const { loading, setLoading, signIn, resetPassword } = UseAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname||'/'
  {/* ====const handleSubmit===== */ }
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value
    console.log('userDetails:', email, password);
    signIn(email, password)
      .then(result => {
        console.log(result.user);
        //save user to db
        savedUser(result.user)
        toast.success('LogIn Account Successfully !!!')
        setTimeout(() => {
          navigate(from, { replace: true })
        }, 2000);
      }).catch(error => {
        setLoading(false)
        console.log(`Error:`, error.message);
        toast.error(error.message)
      })
  }

  const emailRef = useRef()
  {/* ====handleResetPassword===== */ }
  const handleResetPassword = () => {
    const email = emailRef.current.value
    console.log(`email`, email);
    resetPassword(email)
      .then(() => {
        setLoading(false)
        // toast.success('Please Chack your email reset the password !!!')
      }).catch(error => {
        setLoading(false)
        console.log(`Error:`, error.message);
        // toast.error(error.message)
      })

  }



  const [passwordshow, setPasswordshow] = useState(true)
  const handleShowPassowrd = () => {
    setPasswordshow(!passwordshow)
  }
  return (
    <div className='flex justify-center items-center min-h-screen mt-5'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                ref={emailRef}
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div className='relative'>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type={passwordshow ? 'text' : 'password'}
                name='password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
              <PasswordHideShow handleShowPassowrd={handleShowPassowrd} passwordshow={passwordshow} />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-rose-500 w-full text-center rounded-md py-3 text-white'
            >
              {loading ? <TbFidgetSpinner size={24} className='m-auto animate-spin' /> : 'Continue'}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button onClick={handleResetPassword} className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <HandleGoogle/>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don't have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login