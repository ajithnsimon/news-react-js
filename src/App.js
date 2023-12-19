import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Feed from './components/News/Feed';
import Settings from './components/User/Settings';

function App() {
  const token = localStorage.getItem('jwtToken');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/feed" replace /> : <Navigate to="/signin" replace />} />
        <Route path="/signin" element={!token ? <SignIn /> : <Navigate to="/feed" replace />} />
        <Route path="/signup" element={!token ? <SignUp /> : <Navigate to="/feed" replace />} />
        <Route path="/feed" element={token ? <Feed /> : <Navigate to="/signin" replace />} />
        <Route path="/settings" element={token ? <Settings /> : <Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
