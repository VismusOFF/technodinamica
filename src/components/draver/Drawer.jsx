import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../assets/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Drawer.css';
import { useLocation } from 'react-router-dom';
import { Drawer as MuiDrawer, IconButton, ThemeProvider, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const CustomDrawer = () => {
    const [authUser , setAuthUser ] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser (user);
        });
        return () => unsubscribe();
    }, []);

    const isActive = (path) => (location.pathname === path ? 'active' : '');

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className='drawer-container'>
                <IconButton onClick={toggleDrawer} className='menu-button'>
                    <MenuIcon />
                </IconButton>
                <MuiDrawer
                    anchor='left'
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    variant="temporary"
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#050E18",
                        },
                    }}
                >
                    <div className='drawer-header'>
                        <IconButton onClick={toggleDrawer} className='close-button'>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className='drawer-content'>
                        {['/', '/request', '/master', '/admin', '/partner', '/product', '/tableusers'].map((path, index) => (
                            <Link to={path} key={index} onClick={toggleDrawer}>
                                <button className={`action-margin ${isActive(path)}`}>
                                    {path === '/' ? 'Домой' : path === '/request' ? 'Сотрудникам' : path === '/master' ? 'Проверяющим' : path === '/admin' ? 'Администраторам' : path === '/partner' ? 'Партнёры' : path === '/product' ? 'Продукция' : 'Пользователи'}
                                </button>
                            </Link>
                        ))}
                        {!authUser  && (
                            <>
                                <Link to={'/signin'} onClick={toggleDrawer}>
                                    <div className='auth-drawer-link'>Войти</div>
                                </Link>
                                <Link to={'/signup'} onClick={toggleDrawer}>
                                    <div className='auth-drawer-link'>Зарегистрироваться</div>
                                </Link>
                            </>
                        )}
                        {authUser  && (
                            <Link to={'/profile'} onClick={toggleDrawer}>
                                <div className='auth-drawer-link'>
                                    <div className='userIcon'></div>
                                    Профиль
                                </div>
                            </Link>
                        )}
                    </div>
                </MuiDrawer>
            </div>
        </ThemeProvider>
    );
};

export default CustomDrawer;
