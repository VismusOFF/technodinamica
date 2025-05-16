import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { firestore } from '../../assets/firebase'; 
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import '../../components/pages/admin/Admin.css';

const TableUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const tableCustomStyles = {
        header: {
            style: {
                minHeight: '56px',
                backgroundColor: '#0B0C0F',
                color: '#C4D1ED',
                border: 'none',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#0B0C0F',
                color: '#C4D1ED',
                border: 'none',
            },
        },
        rows: {
            style: {
                color: 'white',
                backgroundColor: '#0B0C0F',
                border: 'none',
                '&:hover': {
                    backgroundColor: '#525252',
                },
            },
            stripedStyle: {
                color: 'black',
                backgroundColor: '#F2F2F2',
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
        {
            name: 'Email',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'ФИО',
            selector: row => row.fullName,
            sortable: true,
        },
        {
            name: 'Номер',
            selector: row => row.phoneNumber,
            sortable: true,
        },
        {
            name: 'Роль',
            selector: row => row.role,
            sortable: true,
            cell: row => (
                <select className='select-container'
                    value={row.role} 
                    onChange={(e) => handleRoleChange(row.id, e.target.value)}
                >
                    <option value="работник">Работник</option>
                    <option value="мастер">Мастер</option>
                    <option value="администратор">Администратор</option>
                </select>
            ),
        }
    ];

    const handleRoleChange = async (userId, newRole) => {
        try {
            const userDoc = doc(firestore, 'users', userId);
            await updateDoc(userDoc, { role: newRole });

            // Обновление состояния пользователей
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.id === userId ? { ...user, role: newRole } : user
                )
            );
        } catch (error) {
            console.error("Ошибка при обновлении роли пользователя", error);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(firestore, 'users');
                const usersSnapshot = await getDocs(usersCollection);
                const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersList);
            } catch (error) {
                console.error("Ошибка при получении пользователей", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="marginTop">
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <DataTable
                    title="Пользователи"
                    columns={columns}
                    data={users}
                    pagination
                    customStyles={tableCustomStyles}
                    highlightOnHover={false}
                />
            )}
        </div>
    );
};

export default TableUsers;
