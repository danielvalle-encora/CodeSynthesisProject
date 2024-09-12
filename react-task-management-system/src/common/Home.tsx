import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Dashboard from '../pages/Dashboard';
import Task from '../pages/Task';

const Layout: React.FC = () => {
    return (
        <Router>
            <div className="flex h-screen bg-gray-100">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/task" element={<Task />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Layout;