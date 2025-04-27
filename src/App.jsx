import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/pages/header/Header'
import MainPage from './components/pages/mainpage/MainPage';
import './fonts/Roboto.css';
import SignIn from './components/pages/auth/SignIn';
import SignUp from './components/pages/auth/SignUp';
import AdminConfirm from './components/pages/admin/AdminConfirm'
import AdminTable from './components/pages/admin/AdminTable';
import RequestForm from './components/Requst/Requst';
import MasterConfirm from './components/pages/master/MasterConfirm';
import MasterPage from './components/pages/master/Master';
import Partner from './components/pages/Partner/Partner';
import Product from './components/pages/Product/Product';
import Footer from './components/pages/footer/Footer';
import Profile from './components/profile/profile';
import NewAuth from './components/newAuth/newAuth';

function App() {
  return (
      <BrowserRouter>
          <Header />
          <div style={{ marginTop: '80px' }}> {/* Учитываем высоту заголовка */}
              <Routes>
                  <Route path='/' element={<MainPage />} />
                  <Route path='/signin' element={<SignIn />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/adminconfirm' element={<AdminConfirm />} />
                  <Route path='/admin' element={<AdminTable />} />
                  <Route path='/request' element={<RequestForm />} />
                  <Route path='/masterconfirm' element={<MasterConfirm />} />
                  <Route path='/master' element={<MasterPage />} />
                  <Route path='/partner' element={<Partner />} />
                  <Route path='/product' element={<Product />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/newAuth' element={<NewAuth/>} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App