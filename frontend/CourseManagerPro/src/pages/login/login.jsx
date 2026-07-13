import React from 'react'
import './login.css'

const LoginPage = () => {
  return (
    <>
      {/* page title */}
      <title>Login Page</title>

      <div className='login-page-container'>
          <div className='login-page-header'>
            <h1>Login</h1>
          </div>

          <div className='login-page-form'>
            <form action='/login' method='POST'>
              <div className='login-page-form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' placeholder='email@example.com' required />
              </div>
              <div className='login-page-form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' placeholder='Enter your password' required />
                <a href='/forgot-password' target='_blank'>Forgot Password?</a>
              </div>
              <div>
                <button className='login-page-form-button' type='submit'>Login</button>
              </div>
            </form>
          </div>
      </div>
      <p className='login-page-signup-link'>Don't have an account? <a href='/sign-up' target='_blank'> Sign Up</a></p>
    </>
  )
}

export default LoginPage