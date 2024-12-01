import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: { //Celestes
        main: '#1d89ad',
        light: '#24a6d1',
        dark:'#0c556e'
      },
      secondary: { //Violetas
        main: '#6e50ab',
        dark: '#533c82',
        light: '#8d67db'
      },
      success:{ //Verdes
        main: '#449683',
        dark: '#2c6659',
        light: '#75c7b4'
      },
      error:{
        main: '#d65c5c',
        dark: '#913939',
        light: '#fa8989'
      }
    },
  });

export default theme;
