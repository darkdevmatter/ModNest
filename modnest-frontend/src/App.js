import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

function AppRoutes({ user, setUser, darkMode, setDarkMode }) {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={<Home onLoginClick={() => navigate('/login')} />}
      />
      <Route
        path="/login"
        element={<Login onLogin={(username) => { setUser(username); navigate('/dashboard'); }} />}
      />
      <Route
        path="/dashboard"
        element={
          user ? (
            <AdminDashboard
              username={user}
              onLogout={() => { setUser(null); navigate('/'); }}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          ) : (
            <Login onLogin={(username) => { setUser(username); navigate('/dashboard'); }} />
          )
        }
      />
    </Routes>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <AppRoutes user={user} setUser={setUser} darkMode={darkMode} setDarkMode={setDarkMode} />
      </Router>
    </ThemeProvider>
  );
}

export default App;