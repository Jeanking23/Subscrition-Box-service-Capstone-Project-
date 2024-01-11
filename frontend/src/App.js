import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
    
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          
          </Routes>
   
      </AuthProvider>
      <Footer className="App-footer" />
    </div>
  );
}

export default App;

