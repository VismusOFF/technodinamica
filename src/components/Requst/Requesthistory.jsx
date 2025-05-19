import React, { useEffect, useState } from 'react';
import { database } from '../../assets/firebase';
import { ref, onValue } from 'firebase/database';
import { useAuth } from '../context/authContext';
import { Collapse, List, ListItem, ListItemText, ListItemButton, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import './RequestHistory.css';

const CustomScrollBox = styled(Box)({
  height: '550px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
});

const RequestHistory = () => {
  const { authUser  } = useAuth();
  const [requests, setRequests] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (authUser ) {
      const requestsRef = ref(database, 'заявки');
      onValue(requestsRef, (snapshot) => {
        const data = snapshot.val();
        const userRequests = [];

        for (let id in data) {
          if (data[id].почта === authUser .email) {
            userRequests.push({ id, ...data[id] });
          }
        }

        setRequests(userRequests);
      });
    }
  }, [authUser ]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='requestHistoryContainer'>
      <div className='request-history-form'>
        <Typography variant="h4" style={{ position: 'sticky', top: 0, backgroundColor: '#050E18', zIndex: 1 }}>
          Ваша история заявок
        </Typography>
        {requests.length === 0 ? (
          <Typography>У вас нет заявок.</Typography>
        ) : (
          <CustomScrollBox>
            <List>
              {requests.map((request, index) => (
                <div key={request.id}>
                  <ListItemButton onClick={() => handleToggle(index)}>
                    <ListItemText primary={`Оборудование: ${request.продукт}`} />
                  </ListItemButton>
                  <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem>
                        <ListItemText secondary={`Модель: ${request.модель}`} />
                        <ListItemText secondary={`Тип поломки: ${request.тип_поломки}`} />
                        <ListItemText secondary={`Дата: ${request.дата}`} />
                        <ListItemText secondary={`Количество: ${request.количество}`} />
                        <ListItemText secondary={`Статус: ${request.статус}`} />
                      </ListItem>
                    </List>
                  </Collapse>
                </div>
              ))}
            </List>
          </CustomScrollBox>
        )}
      </div>
    </div>
  );
};

export default RequestHistory;
