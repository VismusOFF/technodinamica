import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { database } from '../../../assets/firebase';
import { ref, onValue, update } from 'firebase/database';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import './Table.css'

const AdminRequestsTable = () => {
  const { authUser } = useAuth(); // Получаем информацию о пользователе из контекста
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate(); // Получаем объект navigate для перенаправления

  useEffect(() => {
    const requestsRef = ref(database, 'заявки');
    onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      const requestsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      }));
      setRequests(requestsArray);
    });
  }, []);

  const handleStatusChange = (id, status) => {
    const statusRef = ref(database, `заявки/${id}`);
    update(statusRef, { статус: status });
  };

  const handleStartWork = async (id) => {
    const userEmail = authUser?.email; // Получаем почту текущего пользователя
    if (!userEmail) {
      console.error("Пользователь не аутентифицирован");
      return;
    }

    // Обновляем статус на "в обработке"
    const statusRef = ref(database, `заявки/${id}`);
    await update(statusRef, { статус: 'в обработке', почта_мастера: userEmail });

    // Создаем новый узел для проделанных работ
    const workRef = ref(database, `работы/${id}`);
    await update(workRef, {
      проделанные_работы: {
        перечень_работ: [] // Инициализируем пустым массивом
      }
    });

    // Перенаправляем на страницу описания работ
    navigate(`/work/${id}`); // Используем navigate для перенаправления
  };

  const columns = [
    { name: 'Продукт', selector: row => row.продукт, sortable: true },
    { name: 'Модель', selector: row => row.модель, sortable: true },
    { name: 'Тип Поломки', selector: row => row.тип_поломки, sortable: true },
    { name: 'Дата', selector: row => row.дата, sortable: true },
    { name: 'Количество', selector: row => row.количество, sortable: true },
    { name: 'Статус', selector: row => row.статус, sortable: true, cell: row => (
      <select className='select-container' value={row.статус} onChange={(e) => handleStatusChange(row.id, e.target.value)}>
        <option value="новая">Новая</option>
        <option value="отклонена">Отклонена</option>
        <option value="в обработке">В обработке</option>
        <option value="выполнена">Выполнена</option>
      </select>
    )},
    { name: 'Действия', cell: row => (
      <button className='button-delete' onClick={() => handleStartWork(row.id)}>Начать работу</button>
    )}
  ];

  return (
    <div className='table-request'>
      <DataTable
        title="Заявки пользователей"
        columns={columns}
        data={requests}
        pagination
        customStyles={{
          header: {
            style: {
              minHeight: '56px',
              backgroundColor: '#050E18',
              color: '#C4D1ED'
            },
          },
          headRow: {
            style: {
              backgroundColor: '#050E18',
              color: '#C4D1ED'
            },
          },
          rows: {
            style: {
              color: 'white',
              backgroundColor: '#050E18',
              '&:hover': {
                backgroundColor: '#525252'
              }
            },
            stripedStyle: {
              color: 'black',
              backgroundColor: '#F2F2F2'
            }
          },
          pagination: {
            style: {
              backgroundColor: '#050E18',
              color: 'white',
              fill: 'white'
            },
            pageButtonsStyle: {
              color: 'white',
              fill: 'white',
              backgroundColor: 'transparent',
              '&:disabled': {
                cursor: 'unset',
                color: '',
                fill: '#919191',
              },
              '&:hover:not(:disabled)': {
                backgroundColor: '#525252',
              },
              '&:focus': {
                outline: 'none',
                backgroundColor: '#919191',
              },
            },
          }
        }}
      />
    </div>
  );
};

export default AdminRequestsTable;
