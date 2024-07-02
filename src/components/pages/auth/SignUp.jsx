import React, { useState } from 'react';
import './Auth.css';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../assets/firebase'
import AuthDetails from './AuthDetails'

const SignUp = () => {
    const [email, setEmail] = useState('')
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
            })
            .catch((error) => {
                console.error('Ошибка при регистрации пользователя:', error);
            });
    };

    const criteriaClass = (criteria) => {
        return criteria ? 'criteria-met' : 'criteria-not-met';
    };

    return (
        <div className='auth-page'>
            <form className='form-container-signin' onSubmit={signUp}>
                <div className='logo-text'>РЕСПИРАТОР ID</div>
                <div className='logo-icon-form'></div>
                <div className='email-icon'></div>
                <input type="email" placeholder='почта' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='lock-icon'></div>
                <input
                    name="password"
                    type="password"
                    placeholder='пароль'
                    value={password}
                    onChange={handlePasswordChange}
                />
                <div className='lock-icon2'></div>
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder='подтвердите пароль'
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <div className='password-criteria'>
                    <span className={criteriaClass(passwordCriteria.minLength)}>Минимум 6 символов</span>
                    <span className={criteriaClass(passwordCriteria.oneLowercase)}>Одна строчная буква</span>
                    <span className={criteriaClass(passwordCriteria.oneUppercase)}>Одна заглавная буква</span>
                    <span className={criteriaClass(passwordCriteria.oneNumber)}>Одна цифра</span>
                    <span className={criteriaClass(passwordCriteria.oneSpecialChar)}>Один спецсимвол</span>
                    <span className={criteriaClass(passwordCriteria.passwordsMatch)}>Пароли совпадают</span>
                </div>
                <button className='auth-header-button2' type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default SignUp;