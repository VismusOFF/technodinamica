import './Auth.css'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, provider } from '../../../assets/firebase'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false) // Добавлено состояние
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
            alert('Вход успешен')
            navigate('/profile')
        })
        .catch((error) => {
            console.log(error)
            alert('Неправильный логин или пароль')
        })
    }

    const onGoogleSignIn = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            try {
                await signInWithPopup(auth, provider)
                navigate('/profile')
            } catch (error) {
                setErrorMessage(error.message)
                setIsSigningIn(false)
            }
        }
    }

    return (
        <div className='auth-page'>
            <form className='form-container-signin' onSubmit={signIn}>
                <div className='displayFlex'> 
                    <div className='logo-icon-form'></div>
                    <div className='logo-text'>ТЕХНОДИНАМИКА</div>
                </div>

                <div className='authText'>Авторизация</div>

                <div className='emailText'>Почта</div>
                <div className='email-icon'></div>

                <input type="email" placeholder='your@email.com' 
                value={email} onChange={(e) => setEmail(e.target.value)} />

                <div className='emailText'>Пароль</div>
                <div className='lock-icon'></div>

                <input className='margin-bottom-80px' type="password" placeholder='********' 
                value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className='signInButton' type="submit">Войти</button>

                <div className='forgotPass'>
                    <a className='forgotPassLink' href="">Забыли пароль ?</a> 
                </div>

                <div className='separator'>
                    <span>или</span>
                </div>

                <button className='googleButton' onClick={onGoogleSignIn}><div className='googleIcon'></div>Войти с Google</button>

                <div className='noAccount'>
                    Нет аккаунта?ᅟ 
                    <Link to={'/signup'}>Зарегистрироваться</Link>
                </div>
            </form>
        </div>
    )
}

export default SignIn;
