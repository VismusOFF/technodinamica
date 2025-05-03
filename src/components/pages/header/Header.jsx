import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../assets/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Header.css';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const [authUser , setAuthUser ] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser (user);
        });

        return () => unsubscribe();
    }, []);

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <div className='header-container'>
            <div className='header-container-label'>
                <Link to={'/'}>
                    
                    <div className='icon'></div>
                </Link>
                <a href="https://rostec.ru/">
                    <div className='rostech-icon'></div>
                </a>
                <div className='action-container'>
                    <Link to={'/admin'}>
                        <button className={`action-margin ${isActive('/admin')}`}>Администраторам</button>
                    </Link>
                    <Link to={'/request'}>
                        <button className={`action-margin ${isActive('/request')}`}>Сотрудникам</button>
                    </Link>
                    <Link to={'/master'}>
                        <button className={`action-margin ${isActive('/master')}`}>Проверяющим</button>
                    </Link>
                    <Link to={'/partner'}>
                        <button className={`action-margin ${isActive('/partner')}`}>Партнёры</button>
                    </Link>
                    <Link to={'/product'}>
                        <button className={`action-margin ${isActive('/product')}`}>Продукция</button>
                    </Link>
                    <Link   to={'/tableusers'}>
                        <button className={`action-margin ${isActive('/tableusers')}`} >Пользователи</button>
                    </Link>
                </div>
                <div className='auth-margin-button'>
                    {/* Условное отображение кнопок "Войти" и "Зарегистрироваться" */}
                    {!authUser  && (
                        <>
                            <Link to={'/signin'}>
                                <button className='auth-header-button'>Войти</button>
                            </Link>
                            <Link to={'/signup'}>
                                <button className='auth-header-button2'>Зарегистрироваться</button>
                            </Link>
                        </>
                    )}
                    {/* Кнопка "Профиль" всегда отображается, если пользователь вошел */}
                    {authUser  && (
                        <Link to={'/profile'}>
                            <button className='auth-header-button2'>
                                <div className='userIcon'></div>
                                Профиль
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Header;
