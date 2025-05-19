import React, { useEffect, useState, useRef } from 'react';
import { firestore } from '../../assets/firebase'; // Firestore для получения пользователей
import { collection, getDocs } from 'firebase/firestore';
import { getDatabase, ref, set, onValue } from 'firebase/database'; // Импортируем Realtime Database
import SendIcon from '@mui/icons-material/Send';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    List,
    ListItem,
    Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import './chat.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Стили для прокрутки
const CustomScrollBox = styled('div')({
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

const Chat = ({ authUser  }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const messagesEndRef = useRef(null); // Ссылка для прокрутки вниз

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(firestore, 'users');
                const usersSnapshot = await getDocs(usersCollection);
                const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setUsers(usersList);
                // Получаем последний открытый получатель из localStorage
                const lastRecipient = localStorage.getItem('lastRecipient');
                if (lastRecipient && usersList.some(user => user.id === lastRecipient)) {
                    setRecipientEmail(lastRecipient);
                } else if (usersList.length > 0) {
                    setRecipientEmail(usersList[0].id);
                }
            } catch (err) {
                setError('Ошибка при загрузке пользователей');
                setOpenSnackbar(true);
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const db = getDatabase();
        const messagesRef = ref(db, 'messages');

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const messagesList = [];
            snapshot.forEach((childSnapshot) => {
                const message = childSnapshot.val();
                messagesList.push({ id: childSnapshot.key, ...message });
            });
            const filteredMessages = messagesList.filter(message =>
                (message.sender === authUser .email && message.recipient === recipientEmail) ||
                (message.sender === recipientEmail && message.recipient === authUser .email)
            );
            setMessages(filteredMessages);
        });

        return () => unsubscribe();
    }, [authUser .email, recipientEmail]);

    // Прокрутка вниз при обновлении сообщений
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' }); // Прокрутка сразу вниз
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const db = getDatabase();

        try {
            const messageRef = ref(db, 'messages/' + Date.now());
            await set(messageRef, {
                sender: authUser .email,
                recipient: recipientEmail,
                content: newMessage,
                timestamp: new Date().toISOString(),
            });

            // Сохраняем последний получатель в localStorage
            localStorage.setItem('lastRecipient', recipientEmail);
            setNewMessage('');
        } catch (error) {
            setError("Ошибка при отправке сообщения:");
            setOpenSnackbar(true);
            console.error(error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: '#050E18', height: '650px', marginTop: '175px', border: '1px solid #212A39', borderRadius: '10px', display: 'flex', flexDirection: 'column' }}>
            
                <Toolbar sx={{ color: 'white' }}>
                    <Typography variant="h6">Чат</Typography>
                </Toolbar>
            

            <FormControl fullWidth margin="normal">
                <InputLabel id="recipient-label">Выберите получателя</InputLabel>
                <Select
                    labelId="recipient-label"
                    value={recipientEmail}
                    onChange={(e) => {
                        setRecipientEmail(e.target.value);
                        // Сохраняем последний получатель в localStorage
                        localStorage.setItem('lastRecipient', e.target.value);
                    }}
                >
                    {users.length > 0 ? (
                        users.map(user => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.fullname} ({user.id})
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>Нет доступных пользователей</MenuItem>
                    )}
                </Select>
            </FormControl>

            <CustomScrollBox sx={{marginBottom: '5px'}}>
                <List style={{ margin: 0, backgroundColor: 'transparent', }}>
                    {messages.map(message => {
                        const isSender = message.sender === authUser .email;
                        return (
                            <ListItem
                                key={message.id}
                                style={{
                                    justifyContent: isSender ? 'flex-end' : 'flex-start',
                                    paddingTop: 4,
                                    paddingBottom: 4,
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: isSender ? '#2F95F7' : '#1A6BB8',
                                        color: 'white',
                                        borderRadius: 12,
                                        padding: '8px 12px',
                                        maxWidth: '75%',
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        {message.sender}
                                    </Typography>
                                    <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                                        {message.content}
                                    </Typography>
                                    <Typography variant="caption" style={{ display: 'block', marginTop: 4, opacity: 0.8 }}>
                                        {new Date(message.timestamp).toLocaleString()}
                                    </Typography>
                                </div>
                            </ListItem>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </List>
            </CustomScrollBox>

            <form className='chatForm' onSubmit={handleSendMessage} style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
                <TextField
                    sx={{ padding: '0px 10px 10px 10px', width: '400px' }}
                    fullWidth
                    variant="outlined"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    required
                />
                <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    width: 50,
                    height: 50,
                    minWidth: 0,
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                    marginLeft: 1,
                    marginBottom: 1.5
                }}
                >
                <SendIcon />
                </Button>
            </form>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Chat;
