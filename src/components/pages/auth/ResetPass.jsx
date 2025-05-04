import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../assets/firebase';
import { useNavigate } from 'react-router-dom';
import './ResetPass.css'

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage('Письмо для сброса пароля отправлено на ваш адрес электронной почты.');
            })
            .catch((error) => {
                console.error('Ошибка при отправке письма для сброса пароля:', error);
                setMessage('Произошла ошибка при отправке письма. Пожалуйста, проверьте введенный адрес электронной почты.');
            });
    };

    return (
        <div className='reset-password-page'>
            <form className='reset-container' onSubmit={handleResetPassword}>
            <div className='displayFlex'>
                <div className='logo-icon-form'></div>
                <div className='logo-text'>ТЕХНОДИНАМИКА</div>
            </div>

            <div className='authText'>Сброс пароля</div>
            
                <div className='emailText'>Почта</div>
                <input 
                    type="email" 
                    placeholder='your@email.com' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                
                <button className='buttonReset' type="submit">Сбросить пароль</button>
                <button className='buttonReset' onClick={() => navigate('/signin')}>Назад к входу</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;
