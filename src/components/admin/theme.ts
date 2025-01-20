import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF', // Vibrant purple
    },
    secondary: {
      main: '#FF6584', // Coral pink
    },
    tertiary: {
      main: '#4ECDC4', // Teal
    },
    background: {
      default: '#F7FAFC',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 30px 0 rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
})

