import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Link, Grid } from '@mui/material';

export default function Home({ onLoginClick }) {
  const [apiMessage, setApiMessage] = useState('');
  useEffect(() => {
    fetch('http://127.0.0.1:5000/hello')
      .then(res => res.json())
      .then(data => {
        setApiMessage(data.message);
        console.log('Flask API says:', data.message);
      })
      .catch(e => {
        setApiMessage('Unable to reach backend');
        console.error(e);
      });
  }, []);
  return (
    <Box sx={{ bgcolor: '#1b2220', minHeight: '100vh', pb: 6 }}>
      {/* Hero section */}
      <Box sx={{ maxWidth: 900, mx: 'auto', pt: 6, px: 2, color: '#fff' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <img src="/logo.png" alt="ModNest Logo" style={{ height: 50 }} />
          <Box>
            <Button
              sx={{
                mr: 2,
                bgcolor: '#00d26a',
                color: '#151e15',
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: '0 4px 16px #00ffb1bb',
                '&:hover': { bgcolor: '#00e676' },
              }}
              variant="contained"
              disableElevation
            >
              Sign Up
            </Button>
            <Button
              sx={{
                bgcolor: '#ffd600',
                color: '#232926',
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: '0 4px 16px #fff20099',
                '&:hover': { bgcolor: '#fff350' },
              }}
              variant="contained"
              disableElevation
              onClick={onLoginClick}
            >
              Log In
            </Button>
          </Box>
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, color: '#00d26a', textShadow: '0 2px 12px #00ffb199, 0 0px 1px #000' }}>
          Minecraft Server<br />Hosting Made Easy
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.85, mb: 4, color: 'rgba(255,255,255,0.92)' }}>
          Simple, safe, and affordable hosting<br />for Minecraft Java and Bedrock
        </Typography>
        {apiMessage && (
          <Typography
            variant="body2"
            sx={{ color: '#ffd600', mt: 2, textAlign: 'center', letterSpacing: 1 }}
          >
            {apiMessage}
          </Typography>
        )}
        <Button
          size="large"
          sx={{
            bgcolor: '#3b82f6',
            color: '#fff',
            fontWeight: 900,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            mb: 8,
            boxShadow: '0 4px 18px #0080ffff',
            '&:hover': { bgcolor: '#1565c0' },
          }}
          variant="contained"
          disableElevation
        >
          Launch Your Server
        </Button>
        {/* Hero image — placeholder block for now */}
        <Box sx={{ float: 'right', mt: '-110px', mr: 4 }}>
          {/* You can replace this SVG with an image if you like */}
          <svg width="120" height="120" viewBox="0 0 120 120"><rect x="10" y="60" width="40" height="40" fill="#6aba4d" stroke="#3d642d" strokeWidth="4" /><rect x="50" y="40" width="40" height="60" fill="#6aba4d" stroke="#3d642d" strokeWidth="4" /><rect x="80" y="20" width="30" height="80" fill="#6aba4d" stroke="#3d642d" strokeWidth="4" /></svg>
        </Box>
      </Box>
      {/* Features and Sign Up */}
      <Box sx={{ bgcolor: '#232926', mt: 10, py: 6 }}>
        <Grid container spacing={4} sx={{ maxWidth: 1050, mx: 'auto', px: 2 }}>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#ffd600', textShadow: '0 2px 12px #fff20099' }}>Why ModNest?</Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#00e5ff', textShadow: '0 2px 12px #00e5ff77' }}>Easy Setup</Typography>
              <Typography color="rgba(255,255,255,0.92)">Get started in minutes with our user-friendly interface</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffd600', textShadow: '0 2px 12px #fff20099' }}>Kid-Friendly</Typography>
              <Typography color="rgba(255,255,255,0.92)">Built-in protections to keep young players safe</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#aaf683', textShadow: '0 2px 12px #aaf68366' }}>Flexible Plans</Typography>
              <Typography color="rgba(255,255,255,0.92)">Free trial, paid tiers, and full admin access options</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff5252', textShadow: '0 2px 12px #ff525266' }}>24/7 Support</Typography>
              <Typography color="rgba(255,255,255,0.92)">Dedicated support team ready to help anytime</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                maxWidth: 340,
                mx: 'auto',
                mt: { xs: 4, md: 0 },
                bgcolor: '#141a2a',
                color: '#fff',
                border: '2px solid #00d26a',
                boxShadow: '0 4px 28px #00ffb155',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>Sign Up</Typography>
              <TextField label="Email" variant="outlined" fullWidth sx={{ mb: 2, input: { color: "#fff" } }} />
              <TextField label="Password" type="password" variant="outlined" fullWidth sx={{ mb: 2, input: { color: "#fff" } }} />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: '#3b82f6',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 18,
                  py: 1.2,
                  borderRadius: 2,
                  mb: 1,
                  boxShadow: '0 4px 18px #0080ffff',
                  '&:hover': { bgcolor: '#1565c0' },
                }}
              >
                Sign Up
              </Button>
              <Typography variant="body2" align="center" sx={{ color: '#fff' }}>
                Already have an account? <Link href="#" onClick={onLoginClick} sx={{ color: '#aaf683' }}>Log In</Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}