import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/pages/header/Header';
import MainPage from './components/pages/mainpage/MainPage';
import './fonts/Roboto.css';
import SignIn from './components/pages/auth/SignIn';
import SignUp from './components/pages/auth/SignUp';
import AdminTable from './components/pages/admin/AdminTable';
import RequestForm from './components/Requst/Requst';
import MasterPage from './components/pages/master/Master';
import Partner from './components/pages/Partner/Partner';
import Product from './components/pages/Product/Product';
import Footer from './components/pages/footer/Footer';
import Profile from './components/profile/profile';
import NewAuth from './components/newAuth/newAuth';
import { AuthProvider } from './components/context/authContext';
import PrivateRoute from './components/routes/privateRoute';
import TableUsers from './components/users/TableUsers';
import ResetPassword from './components/pages/auth/ResetPass';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header />
                <div style={{ marginTop: '80px' }}> {/* Учитываем высоту заголовка */}
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/signin' element={<SignIn />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/reset' element={<ResetPassword/>} />
                        
                        <Route path='/admin' element={
                            <PrivateRoute allowedRoles={['администратор']}>
                                <AdminTable />
                            </PrivateRoute>
                        } />
                        <Route path='/request' element={
                            <PrivateRoute allowedRoles={['работник', 'мастер', 'администратор']}>
                                <RequestForm />
                            </PrivateRoute>
                        } />
                        
                        <Route path='/master' element={
                            <PrivateRoute allowedRoles={['мастер', 'администратор']}>
                                <MasterPage />
                            </PrivateRoute>
                        } />
                        <Route path='/partner' element={<Partner />} />
                        <Route path='/product' element={<Product />} />
                        <Route path='/profile' element={
                            <PrivateRoute allowedRoles={['работник', 'мастер', 'администратор']}>
                                <Profile />
                            </PrivateRoute>
                        } />

                        <Route path='tableusers' element={
                            <PrivateRoute allowedRoles={['администратор']}>
                                <TableUsers/>
                            </PrivateRoute>
                        } />

                        <Route path='/newAuth' element={<NewAuth />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
