import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { //Celestes
      main: '#1d89ad',
      light: '#24a6d1',
      dark: '#0c556e'
    },
    secondary: { //Violetas
      main: '#6e50ab',
      dark: '#533c82',
      light: '#8d67db'
    },
    success: { //Verdes
      main: '#449683',
      dark: '#2c6659',
      light: '#75c7b4'
    },
    error: {
      main: '#d65c5c',
      dark: '#913939',
      light: '#fa8989'
    },
    disabled: {
      main: '#d1d1d1',
      dark: '#8c8c8c',
      light: '#f0f0f0'
    },
    //Esto solo se usa en el grafico de cohortes
    snow: {
      light: '#9de3fa',
      main: '#3dc9f3',
      dark: '#14b3e3',
    },
    ice: {
      light: '#0790c2',
      main: '#07739d',
      dark: '#0a6182',
    },
    sea: {
      light: '#0a6182',
      main: '#0f506b',
      dark: '#0a3447',
    }

},
});

export default theme;
