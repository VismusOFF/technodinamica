import React, { useState } from 'react';
import { database } from '../../assets/firebase';
import { set, ref, push } from 'firebase/database';
import { useAuth } from '../context/authContext';
import './Request.css';

const RequestForm = () => {
  const { authUser } = useAuth();
  const [product, setProduct] = useState('');
  const [model, setModel] = useState('');
  const [breakType, setBreakType] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestsRef = ref(database, 'заявки');
    const newRequestRef = push(requestsRef);
    
    const currentDate = new Date().toISOString().split('T')[0]; // Формат YYYY-MM-DD

    set(newRequestRef, {
      продукт: product,
      модель: model,
      тип_поломки: breakType,
      дата: date,
      количество: quantity,
      статус: 'новая',
      почта: authUser?.email || 'не указано',
      дата_заявки: currentDate
    });
    
    setProduct('');
    setModel('');
    setBreakType('');
    setDate('');
    setQuantity(1);
  };

  return (
    <div className='requestContainer'>
      <form onSubmit={handleSubmit} className='request-form'>
        <div className='displayFlex'> 
          <div className='logo-icon-form'></div>
          <div className='logo-text'>ТЕХНОДИНАМИКА</div>
        </div>

        <div className='authText'>Форма заявки</div>
        <div className='emailText'>Продукт</div>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Продукт"
          required
        />
        <div className='emailText'>Модель</div>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Модель"
          required
        />
        <div className='emailText'>Тип поломки</div>
        <input
          type="text"
          value={breakType}
          onChange={(e) => setBreakType(e.target.value)}
          placeholder="Тип поломки"
          required
        />
        <div className='emailText'>Дата</div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Дата"
          required
        />
        <div className='emailText'>Количество</div>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Количество"
          min="1"
          required
        />
        <button className='signInButton' type="submit">Отправить заявку</button>
      </form>
    </div>
  );
};

export default RequestForm;
