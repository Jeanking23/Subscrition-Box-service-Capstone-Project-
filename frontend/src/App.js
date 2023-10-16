import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage';
import HomePage from './pages/HomePage/HomePage';
import { AuthProvider } from './context/AuthContext';
import Adminregister from './pages/Admin/auth/Adminregister';
import Dashboard from './pages/Admin/Dashboard';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import Footer from "./components/Footer/Footer";
import AdminLogin from './pages/Admin/auth/Adminlogin';
import Role from "./pages/Admin/auth/Role";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={ <HomePage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/adminregister" element={<Adminregister />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/role" element={<Role />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </AuthProvider>
      <Footer className="App-footer" />
    </div>
  );
}

export default App;
