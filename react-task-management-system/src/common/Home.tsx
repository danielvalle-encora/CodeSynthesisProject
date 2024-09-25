import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Dashboard from '../pages/Dashboard';
import Task from '../pages/Task';
import { Toaster, toast } from 'react-hot-toast'

const notifications = [
  { id: 1, title: 'Project Proposal', dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), status: 'due-soon' },
  { id: 2, title: 'Client Meeting', dueDate: new Date(Date.now() - 1 * 60 * 60 * 1000), status: 'overdue' },
]

const Layout: React.FC = () => {
  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.status === 'due-soon') {
        toast.success(`Task "${notification.title}" is due soon!`, {
          icon: '⏰',
          duration: 5000,
        })
      } else if (notification.status === 'overdue') {
        toast.error(`Task "${notification.title}" is overdue!`, {
          icon: '⚠️',
          duration: 5000,
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<Task />} />
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
};

export default Layout;