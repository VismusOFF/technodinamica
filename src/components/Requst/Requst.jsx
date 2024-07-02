import React, { useState } from 'react';
import { database } from '../../assets/firebase';
import { set, ref, push } from 'firebase/database';
import './Request.css'

const RequestForm = () => {
  const [product, setProduct] = useState('');
  const [model, setModel] = useState('');
  const [breakType, setBreakType] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestsRef = ref(database, 'заявки');
    const newRequestRef = push(requestsRef);
    set(newRequestRef, {
      продукт: product,
      модель: model,
      тип_поломки: breakType,
      дата: date,
      количество: quantity,
      статус: 'новая'
    });
  };

  return (
    <form onSubmit={handleSubmit} className='request-form'>
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Продукт"
        required
      />
      <input
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder="Модель"
        required
      />
      <input
        type="text"
        value={breakType}
        onChange={(e) => setBreakType(e.target.value)}
        placeholder="Тип поломки"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Дата"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Количество"
        min="1"
        required
      />
      <button className='button-submit' type="submit">Отправить заявку</button>
    </form>
  );
};

export default RequestForm;