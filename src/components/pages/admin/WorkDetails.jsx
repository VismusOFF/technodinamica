import React, { useEffect, useState } from 'react';
import { database } from '../../../assets/firebase';
import { ref, onValue, update } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './WorkDetails.css'
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
} from '@mui/material';

const WorkDetails = () => {
  const { id } = useParams(); // Получаем ID заявки из URL
  const { authUser  } = useAuth(); // Получаем информацию о пользователе из контекста
  const [request, setRequest] = useState(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestRef = ref(database, `заявки/${id}`);
    const unsubscribe = onValue(requestRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRequest(data);
        setStatus(data.статус); // Устанавливаем текущий статус заявки
        setNote(data.примечание || ''); // Загружаем текущее примечание из базы данных
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Отменяем подписку при размонтировании компонента
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      if (status) {
        const statusRef = ref(database, `заявки/${id}`);
        await update(statusRef, { статус: status, примечание: note }); // Сохраняем статус и примечание
        alert('Статус и примечание обновлены!');
      }
    } catch (error) {
      console.error("Ошибка обновления статуса:", error);
      alert('Не удалось обновить статус. Попробуйте еще раз.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    ); // Показываем индикатор загрузки
  }

  return (
    <div className='margin-top-80px'>
      <Container sx={{
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        justifyContent: 'center',
        border: '1px solid #212A39',
        borderRadius: '10px',
        backgroundColor: '#050E18',
        width: '800px',
        color: 'white'}}>
            <div className='displayFlex'> 
                <div className='logo-icon-form'></div>
                <div className='logo-text'>ТЕХНОДИНАМИКА</div>
            </div>
        <Typography variant="h4" gutterBottom>
          Детали заявки
        </Typography>
        <Typography variant="h6">Продукт: {request.продукт}</Typography>
        <Typography variant="h6">Модель: {request.модель}</Typography>
        <Typography variant="h6">Тип Поломки: {request.тип_поломки}</Typography>
        <Typography variant="h6">Дата: {request.дата}</Typography>
        <Typography variant="h6">Количество: {request.количество}</Typography>
        <Typography variant="h6">Статус: {request.статус}</Typography>
        <Typography variant="h6">ФИО: {authUser ?.fullName || 'Не указано'}</Typography>
        <Typography variant="h6">Номер телефона: {authUser ?.phoneNumber || 'Не указано'}</Typography>
        <Typography variant="h6">Почта мастера: {authUser  ?.email}</Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Статус</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="новая">Новая</MenuItem>
            <MenuItem value="отклонена">Отклонена</MenuItem>
            <MenuItem value="в обработке">В обработке</MenuItem>
            <MenuItem value="выполнена">Выполнена</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Примечание"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Введите примечание..."
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={handleUpdateStatus}>
          Обновить
        </Button>
      </Container>
    </div>
  );
};

export default WorkDetails;
