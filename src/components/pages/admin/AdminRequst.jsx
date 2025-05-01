import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { database } from '../../../assets/firebase';
import { ref, onValue, update } from 'firebase/database';

const AdminRequestsTable = () => {
  const [requests, setRequests] = useState([]);

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

  const tableCustomStyles = {
    header: {
      style: {
        minHeight: '56px',
              backgroundColor: '#0B0C0F',
              color: '#C4D1ED'
      },
    },
    headRow: {
      style: {
        backgroundColor: '#0B0C0F',
              color: '#C4D1ED'
        
      },
    },
      rows: {
          style: {
            color: 'white',
            backgroundColor: '#0B0C0F',
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
              backgroundColor: '#0B0C0F',
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
    )}
  ];

  return (
    <div>
    <DataTable
      title="Заявки Пользователей"
      columns={columns}
      data={requests}
      defaultSortField="дата"
      defaultSortAsc={false}
      pagination
      customStyles={tableCustomStyles}
    />
    </div>
  );
};

export default AdminRequestsTable;
