import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login_RegisterPage from './Login_RegisterPage';
import Dashboard from './Dashboard';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/*" element={<Login_RegisterPage />} />
                <Route path="/Dashboard/*" element={<Dashboard />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
