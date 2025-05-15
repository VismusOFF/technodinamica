import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../assets/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Header.css';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const [authUser , setAuthUser ] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isIndicatorVisible, setIsIndicatorVisible] = useState(false);
    const location = useLocation();
    const buttonRefs = useRef([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser (user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Определяем активный индекс на основе текущего пути
        const paths = ['/request', '/master', '/admin', '/partner', '/product', '/tableusers'];
        const newIndex = paths.indexOf(location.pathname);
        if (newIndex !== -1) {
            setActiveIndex(newIndex);
            setIsIndicatorVisible(true); // Показываем индикатор, если путь соответствует
        } else {
            setIsIndicatorVisible(false); // Скрываем индикатор, если путь не соответствует
        }
    }, [location.pathname]); // Запускаем эффект при изменении пути

    const isActive = (path) => location.pathname === path ? 'active' : '';

    const handleButtonClick = (index) => {
        setActiveIndex(index);
        setIsIndicatorVisible(true); // Показываем индикатор при нажатии
    };

    return (
        <div className='header-container'>
            <div className='header-container-label'>
                <Link to={'/'}>
                    <div className='icon'></div>
                    <div className='present'>Презентационный</div>
                </Link>
                <a href="https://rostec.ru/">
                    <div className='rostech-icon'></div>
                </a>
                <div className='action-container'>
                    {isIndicatorVisible && (
                        <div
                            className='indicator'
                            style={{
                                left: buttonRefs.current[activeIndex]?.offsetLeft,
                                width: buttonRefs.current[activeIndex]?.offsetWidth,
                            }}
                        ></div>
                    )}
                    {['/request', '/master', '/admin', '/partner', '/product', '/tableusers'].map((path, index) => (
                        <Link to={path} key={index}>
                            <button
                                className={`action-margin ${isActive(path)}`}
                                onClick={() => handleButtonClick(index)}
                                ref={el => buttonRefs.current[index] = el}
                            >
                                {path === '/request' ? 'Сотрудникам' :
                                 path === '/master' ? 'Проверяющим' :
                                 path === '/admin' ? 'Администраторам' :
                                 path === '/partner' ? 'Партнёры' :
                                 path === '/product' ? 'Продукция' : 'Пользователи'}
                            </button>
                        </Link>
                    ))}
                </div>
                <div className='auth-margin-button'>
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
