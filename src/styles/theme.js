import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2d74fa',        
      light: '#5a9bff',
      dark: '#1e5bb8',
    },
    secondary: {
      main: '#480e96',        
      light: '#6b1bb3',
      dark: '#320a6b',
    },
    background: {
      default: '#483d8b',     
      paper: '#6a5acd',        
    },
    text: {
      primary: '#ffffff',      
      secondary: '#cccccc',   
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    custom: {
      progressBar: {
        active: '#ffffff',     
        inactive: '#8a80c0',   
      },
      card: {
        background: '#6a5acd',
        border: '#8a80c0',
        shadow: 'rgba(0, 0, 0, 0.2)',
      },
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
    },
  },
  typography: {
    h4: {
      color: '#ffffff',
    },
    h6: {
      color: '#ffffff',
    },
    body1: {
      color: '#ffffff',
    },
    body2: {
      color: '#ffffff',
    },
    subtitle1: {
      color: '#ffffff',
    }
  },
  overrides: {
    MuiContainer: {
      root: {
        backgroundColor: 'transparent',
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#6a5acd',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        borderRadius: '12px',
      },
    },
    MuiButton: {
      root: {
        borderRadius: '8px',
        textTransform: 'none',
        fontWeight: 500,
      },
    },
  },
});

export default theme;
