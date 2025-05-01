//ДАННЫЙ КОМПОНЕНТ БОЛЬШЕ НЕ ТРЕБУЕТСЯ

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Admin.css'

// const AdminConfirm = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (username === 'admin' && password === 'admin') {
//       // Перенаправление на страницу администратора
//       navigate('/admin');
//     } else {
//       alert('Неверные учетные данные');
//     }
//   };

//   return (
//     <div className='auth-page'>
//     <form className='form-container-signin' onSubmit={handleLogin}>
//         <div className='logo-text'>РЕСПИРАТОР ID</div>
//             <div className='logo-icon-form'>
//         </div>
//         <div  className='email-icon'></div>

//         <input placeholder='логин'
//           id="username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <div className='lock-icon'></div>
      
//         <input placeholder='пароль' className='margin-bottom-80px'
//           id="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
      
//       <button className='auth-header-button' type="submit">Войти</button>
//     </form>
//     </div>
//   );
// };

//export default AdminConfirm;