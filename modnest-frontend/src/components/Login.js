import React, { useState } from 'react';
import { motion } from "framer-motion";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTheme } from "@mui/material";

export default function Login({ onLogin }) {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLoginError('');
          onLogin(username);
        } else {
          setLoginError(data.error || 'Login failed');
        }
      })
      .catch(() => setLoginError('Login failed – could not connect to server'));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #232526 100%)`,
      }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Paper elevation={6} sx={{ p: 4, maxWidth: 370, width: '100%', textAlign: 'center', borderRadius: 3, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, border: `2px solid ${theme.palette.primary.main}`, boxShadow: '0 4px 28px #00ffb155' }}>
          {/* Logo at the top */}
          <img
            src="/logo.png"
            alt="ModNest Logo"
            style={{
              width: '75%',
              maxWidth: 220,
              margin: '0 auto 16px auto',
              display: 'block',
              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.22))',
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            InputProps={{ style: { color: theme.palette.text.primary } }}
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputProps={{ style: { color: theme.palette.text.primary } }}
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
          />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            sx={{ mt: 3, mb: 2, fontWeight: 700, letterSpacing: 1, py: 1.3, boxShadow: '0 4px 28px #00ffb155' }}
            disabled={!username || !password}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          {loginError && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {loginError}
            </Typography>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
}