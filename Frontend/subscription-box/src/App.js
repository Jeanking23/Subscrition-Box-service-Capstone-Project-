import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage';
import HomePage from './pages/HomePage/HomePage';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <div className = "App" >
        <AuthProvider>
        <NavBar/>
        <Routes>
        <Route path = "/"element = { <HomePage/> }/>
        <Route path = "/login" element = { <LoginPage/> }/>
        <Route path = "/register" element = { <RegisterPage/> }/>
        <Route path = "/subscription" element = { <SubscriptionPage/> }/>

        </Routes>
        </AuthProvider>
        <footer className="App-footer"/>
        </div>
    );
}

export default App;