import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../assets/firebase';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail) {
            setEmail(savedEmail);
        }
        if (savedPassword) {
            setPassword(savedPassword);
        }
    }, []);

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                alert('Вход успешен');

                // Сохраняем данные в localStorage, если чекбокс выбран
                if (rememberMe) {
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                } else {
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                }

                navigate('/profile');
            })
            .catch((error) => {
                console.log(error);
                alert('Неправильный логин или пароль');
            });
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
            navigate('/profile');
        } catch (error) {
            console.error('Ошибка входа с Google:', error);
        }
    };

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
                <input 
                    type="email" 
                    placeholder='your@email.com' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <div className='emailText'>Пароль</div>
                <div className='lock-icon'></div>
                <input 
                    className='marginBottom'
                    type="password" 
                    placeholder='********' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={rememberMe} 
                            onChange={() => setRememberMe(!rememberMe)} 
                            sx={{
                                color: 'primary.main',
                                '&.Mui-checked': {
                                    color: 'primary.main',
                                },
                            }} 
                        />
                    }
                    label="Запомнить меня"
                />

                <button className='signInButton' type="submit">Войти</button>

                <div className='forgotPass'>
                    <div className='noAccount1'> <Link to="/reset">Забыли пароль ?</Link></div> 
                </div>

                <div className='separator'>
                    <span>или</span>
                </div>

                <button className='googleButton' onClick={onGoogleSignIn}>
                    <div className='googleIcon'></div>Войти с Google
                </button>

                <div className='noAccount'>
                    <div className='noAccountText'>Нет аккаунта? </div><div className='noAccount1'><Link to="/signup">Зарегистрироваться</Link></div>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
