// src/theme.js
import { createTheme } from '@mui/material/styles';

const modnestTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1b2220',
      paper: '#141a2a',
    },
    primary: {
      main: '#00d26a',
      contrastText: '#151e15',
    },
    secondary: {
      main: '#ffd600',
      contrastText: '#232926',
    },
    info: {
      main: '#3b82f6',
      contrastText: '#fff',
    },
    success: {
      main: '#aaf683',
    },
    warning: {
      main: '#ffd600',
    },
    error: {
      main: '#ff5252',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255,255,255,0.92)',
    },
  },
  typography: {
    fontFamily: `'Press Start 2P', 'monospace', sans-serif`,
    h3: {
      color: '#00d26a',
      fontWeight: 900,
      textShadow: '0 2px 12px #00ffb199, 0 0px 1px #000',
    },
    h4: {
      color: '#ffd600',
      fontWeight: 700,
      textShadow: '0 2px 12px #fff20099',
    },
    h6: {
      fontWeight: 700,
    },
    body2: {
      color: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
          boxShadow: '0 4px 16px #00ffb1bb',
          '&:hover': {
            boxShadow: '0 6px 16px #00e67677',
          },
        },
        containedSecondary: {
          backgroundColor: '#ffd600',
          color: '#232926',
        },
        containedPrimary: {
          backgroundColor: '#00d26a',
          color: '#151e15',
        },
        containedInfo: {
          backgroundColor: '#3b82f6',
          color: '#fff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '2px solid #00d26a',
          background: '#141a2a',
          color: '#fff',
          boxShadow: '0 4px 28px #00ffb155',
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f7fafc',
      paper: '#fffbe9',
    },
    primary: {
      main: '#00d26a',
      contrastText: '#151e15',
    },
    secondary: {
      main: '#ffd600',
      contrastText: '#232926',
    },
    info: {
      main: '#3b82f6',
      contrastText: '#fff',
    },
    success: {
      main: '#59b75c',
    },
    warning: {
      main: '#ffd600',
    },
    error: {
      main: '#ff5252',
    },
    text: {
      primary: '#141a2a',
      secondary: '#515151',
    },
  },
  typography: {
    fontFamily: `'Press Start 2P', 'monospace', sans-serif`,
    h3: {
      color: '#00d26a',
      fontWeight: 900,
      textShadow: '0 2px 8px #00ffb122, 0 0px 1px #fff',
    },
    h4: {
      color: '#ffd600',
      fontWeight: 700,
      textShadow: '0 2px 8px #fff20022',
    },
    h6: {
      fontWeight: 700,
    },
    body2: {
      color: '#232926',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
          boxShadow: '0 4px 16px #00ffb133',
          '&:hover': {
            boxShadow: '0 6px 16px #00e67633',
          },
        },
        containedSecondary: {
          backgroundColor: '#ffd600',
          color: '#232926',
        },
        containedPrimary: {
          backgroundColor: '#00d26a',
          color: '#151e15',
        },
        containedInfo: {
          backgroundColor: '#3b82f6',
          color: '#fff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '2px solid #00d26a',
          background: '#fffbe9',
          color: '#232926',
          boxShadow: '0 4px 24px #00ffb122',
        },
      },
    },
  },
});

export default modnestTheme;
export { modnestTheme as darkTheme, lightTheme };