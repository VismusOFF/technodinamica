import './Auth.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../../assets/firebase'
import AuthDetails from './AuthDetails'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        })
        .catch((error) => {
            console.log(error)
            alert('Неправильный логин или пароль')
        })
    }

    return (
        <div className='auth-page' onSubmit={signIn}>
            <form className='form-container-signin'>
                <div className='logo-text'>РЕСПИРАТОР ID</div>
                <div className='logo-icon-form'>
                </div>
                <div  className='email-icon'></div>

                <input type="email" placeholder='почта' 
                value={email} onChange={(e) => setEmail(e.target.value)} />

                <div className='lock-icon'></div>

                <input className='margin-bottom-80px' type="password" placeholder='пароль' 
                value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className='auth-header-button' type="submit">Войти</button>

                <div className='forgotPass'>
                    Забыли <a className='forgotPassLink' href="">пароль</a> ?
                </div>
            </form>
        </div>
    )
}

export default SignIn;