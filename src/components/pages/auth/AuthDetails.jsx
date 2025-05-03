import React, { useEffect, useState } from 'react';
import { firestore } from '../../../assets/firebase'; // Импортируйте Firestore
import { auth } from '../../../assets/firebase'; // Импортируйте аутентификацию
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Импортируйте необходимые функции
import { signOut } from 'firebase/auth'; // Импортируйте метод signOut
import './Auth.css'; // Импортируйте стили

const AuthDetails = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('работник'); // Установим базовую роль "Работник"
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setEmail(user.email || '');

                const userDoc = await getDoc(doc(firestore, 'users', user.email));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setFullName(userData.fullName || '');
                    setPhoneNumber(userData.phoneNumber || '');
                    setRole(userData.role || 'работник'); // Установим роль из данных пользователя или базовую роль
                    setIsAdmin(userData.role === 'администратор');
                } else {
                    // Если пользователь не найден в Firestore, создаем его с базовой ролью
                    await setDoc(doc(firestore, 'users', user.email), {
                        fullName: '',
                        phoneNumber: '',
                        role: 'работник' // Установим базовую роль
                    });
                }
            } else {
                setEmail('');
                setFullName('');
                setPhoneNumber('');
                setRole('работник'); // Сбрасываем роль на базовую
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const user = auth.currentUser ;
        if (user) {
            const updateData = {
                fullName: fullName,
                phoneNumber: phoneNumber,
                role: isAdmin ? role : 'работник', // Если не администратор, устанавливаем роль на "Работник"
            };

            try {
                await setDoc(doc(firestore, 'users', user.email), updateData, { merge: true });
                alert('Данные профиля обновлены!');
            } catch (error) {
                console.error("Ошибка при обновлении профиля:", error);
                alert('Не удалось обновить данные профиля. Пожалуйста, попробуйте еще раз.');
            }
        } else {
            
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            alert('Вы вышли из профиля.');
        } catch (error) {
            console.error("Ошибка при выходе:", error);
            alert('Не удалось выйти из профиля. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <div className="auth-page">
            <form className='form-container-signin1' onSubmit={handleUpdateProfile}>
                
            <div className='displayFlex'> 
                <div className='logo-icon-form'></div>
                <div className='logo-text'>ТЕХНОДИНАМИКА</div>
            </div>

            <div className='authText'>Ваш профиль</div>

            <div className='emailText'>ФИО</div>
            <input
                className='inputAuth'
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ваше ФИО"
                required
            />
                
                
            <div className='emailText'>Номер телефона</div>
            <input
                className='inputAuth'
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Номер телефона"
                required
            />
                
                
            <div className='emailText'>Почта</div>
            <input
                className='inputAuth'
                type="email"
                value={email}
                readOnly // Сделаем поле только для чтения
            />
                
                
            <div className='emailText'>Роль</div>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={!isAdmin} // Делаем поле недоступным, если пользователь не администратор
                >
                    <option value="работник">Работник</option>
                    <option value="мастер">Мастер</option>
                    <option value="администратор">Администратор</option>
                </select>
                
                <button className='signInButton' type="submit">Сохранить изменения</button>
                <button className='signInButton' onClick={handleSignOut}>Выйти </button>
            </form>
        </div>
    );
};

export default AuthDetails;
