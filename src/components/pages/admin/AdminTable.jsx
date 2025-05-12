import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { database } from '../../../assets/firebase';
import { ref, onValue, update, remove } from 'firebase/database';
import * as XLSX from 'xlsx';
import './Admin.css';

const AdminTable = () => {
  const [requests, setRequests] = useState([]);

  // Стили для DataTable
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

  // Функция для экспорта данных в Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(requests);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Заявки");
    XLSX.writeFile(wb, "заявки.xlsx");
  };

  // Получение данных из Firebase
  useEffect(() => {
    const requestsRef = ref(database, 'заявки');
    onValue(requestsRef, (snapshot) => {
      const data = snapshot.val() ?? {};
      const requestsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      }));
      setRequests(requestsArray);
    });
  }, []);

  // Обработчики изменения статуса и удаления заявки
  const handleStatusChange = (id, status) => {
    const statusRef = ref(database, `заявки/${id}`);
    update(statusRef, { статус: status });
  };

  const handleDeleteRequest = (id) => {
    const requestRef = ref(database, `заявки/${id}`);
    remove(requestRef);
  };

  // Колонки для DataTable
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
      </select>)},
    { name: 'Действия', cell: row => (
      <>
        <button className='button-delete' onClick={() => handleDeleteRequest(row.id)}>Удалить</button>
      </>
    )}
  ];

  return (
    <div className='marginTop' >
      <DataTable
        title="Заявки Пользователей"
        columns={columns}
        data={requests}
        defaultSortField="дата"
        defaultSortAsc={false}
        pagination
        customStyles={tableCustomStyles}
      />
      <div className='marginLeft'>
      <button className='button-submit' onClick={exportToExcel}>Экспорт в Excel</button>
      </div>
    </div>
  );
};

export default AdminTable;