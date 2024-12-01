import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: { //Celestes
        main: '#1d89ad',
        mainLight: '#24a6d1',
        dark:'#0c556e'
      },
      secondary: { //Violetas
        main: '#6e50ab',
      },
      success:{ //Verdes
        main: '#44965b',
        dark: '#2f663e'
      },
      danger:{
        main: '#d65c5c',
        dark: '#913939'
      }
    },
  });

export default theme;
