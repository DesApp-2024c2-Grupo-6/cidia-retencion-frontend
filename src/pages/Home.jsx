import { Box } from '@mui/material';

function Home(){
    return (
        <Box sx={{
          height: '50vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
            <h1>BIENVENIDOS</h1>
        </Box>
        
      );
}
export default Home;