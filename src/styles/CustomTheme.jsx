import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: { //Celestes
        main: '#176d8a',
        mainLight: '#1e93ba',
      },
      secondary: { //Violetas
        main: '#6e50ab',
      },
      success:{ //Verdes
        main: '#44965b'
      }
    },
  });

export default theme;
