import React, { useState } from 'react';
import './Auth.css';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../../assets/firebase'
import AuthDetails from './AuthDetails'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        oneLowercase: false,
        oneUppercase: false,
        oneNumber: false,
        oneSpecialChar: false,
        passwordsMatch: false
    });

    const [errorMessage, setErrorMessage] = useState('');

    const updatePasswordCriteria = (password, confirmPassword) => {
        setPasswordCriteria({
            minLength: password.length >= 6,
            oneLowercase: /[a-z]/.test(password),
            oneUppercase: /[A-Z]/.test(password),
            oneNumber: /\d/.test(password),
            oneSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            passwordsMatch: password === confirmPassword
        });
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        updatePasswordCriteria(newPassword, confirmPassword);
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        updatePasswordCriteria(password, newConfirmPassword);
    };

    const signUp = (e) => {
        e.preventDefault();
        updatePasswordCriteria(password, confirmPassword);
        const allCriteriaMet = Object.values(passwordCriteria).every(criteria => criteria);
    
        if (!allCriteriaMet) {
            alert('Пожалуйста, убедитесь, что все критерии пароля выполнены.');
            return;
        }
    
        // Если все критерии выполнены, продолжаем регистрацию пользователя
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Пользователь успешно зарегистрирован:', userCredential);
                navigate('/profile')
            })
            .catch((error) => {
                console.error('Ошибка при регистрации пользователя:', error);
            });
    };

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

    const criteriaClass = (criteria) => {
        return criteria ? 'criteria-met' : 'criteria-not-met';
    };

    return (
        <div className='auth-page'>
            <div className='passworCriteriaContainer'>
            <div className='CriteriaText'>Критерии к паролю</div>
                <div className='password-criteria'>
                    <span className={criteriaClass(passwordCriteria.minLength)}>Минимум 6 символов</span>
                    <span className={criteriaClass(passwordCriteria.oneLowercase)}>Одна строчная буква</span>
                    <span className={criteriaClass(passwordCriteria.oneUppercase)}>Одна заглавная буква</span>
                    <span className={criteriaClass(passwordCriteria.oneNumber)}>Одна цифра</span>
                    <span className={criteriaClass(passwordCriteria.oneSpecialChar)}>Один спецсимвол</span>
                    <span className={criteriaClass(passwordCriteria.passwordsMatch)}>Пароли совпадают</span>
                </div>
            </div>
            <form className='form-container-signin' onSubmit={signUp}>
                <div className='displayFlex'>
                    <div className='logo-icon-form'></div>
                    <div className='logo-text'>ТЕХНОДИНАМИКА</div>
                </div>

                <div className='authText'>Регистрация</div>

                <div className='emailText'>Почта</div>
                <div className='email-icon1'></div>
                <input type="email" placeholder='your@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <div className='emailText'>Пароль</div>
                <div className='lock-icon1'></div>
                <input
                    name="password"
                    type="password"
                    placeholder='********'
                    value={password}
                    onChange={handlePasswordChange}
                />

                <div className='emailText'>Подтвердите пароль</div>
                <div className='lock-icon2'></div>
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder='********'
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                
                <button className='signInButton' type="submit">Зарегистрироваться</button>

                <div className='separator'>
                    <span>или</span>
                </div>

                <button className='googleButton' onClick={onGoogleSignIn}><div className='googleIcon'></div>Войти с Google</button>

                <div className='noAccount'>
                <div className='noAccountText'>Уже есть аккаунт?</div> <div></div>
                    <div className='noAccount1'><Link to='/signin'>Войти</Link></div>
                    </div>
            </form>
        </div>
    );
};

export default SignUp;