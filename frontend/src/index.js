import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContext from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <AuthContext.Consumer>
        {value => (
          <App auth={value} />
        )}
      </AuthContext.Consumer>
    </Router>
  </React.StrictMode>
);