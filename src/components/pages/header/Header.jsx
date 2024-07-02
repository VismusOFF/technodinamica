import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {

    return (
        <div className='header-container'>
            <div className='header-container-label'>
                <Link to={'/'}>
                
                <div className='icon'>
                </div>
                </Link>
                <a href="https://rostec.ru/">
                <div className='rostech-icon'>
                </div>
                </a>
                <div className='action-container'>
                    <Link to={'/adminconfirm'}>
                        <button className='action-margin'>Администраторам</button>
                    </Link>
                    <Link to={'/request'}>
                        <button className='action-margin'>Сотрудникам</button>
                    </Link>
                    <Link to={'/masterconfirm'}>
                        <button className='action-margin'>Проверяющим</button>
                    </Link>
                    <a href="http://www.respiro-oz.ru/actioner/">
                    <button className='action-margin'>Акционерам</button>
                    </a>
                    <Link to={'/partner'}>
                        <button className='action-margin'>Партнёры</button>
                    </Link>
                    <Link to={'/product'}>
                    <button className='action-margin'>Продукция</button>
                    </Link>
                </div>
                <div className='auth-margin-button'>
                <Link to={'/signin'}><button className='auth-header-button'>Войти</button></Link>
                <Link to={'/signup'}><button className='auth-header-button2'>Зарегистрироваться</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Header;