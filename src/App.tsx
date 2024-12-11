import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CourseDetails from './components/CourseDetails';
import Login from './components/Login';
import { User } from './types';
import { users } from './data/mockData';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (username: string, password: string) => {
    const foundUser = users.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert('Identifiants invalides');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/course/:id" element={<CourseDetails currentUser={user} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;