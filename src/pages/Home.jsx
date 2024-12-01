import { Box, Typography } from '@mui/material';
import HomeImage from '../../assets/img/home.png'

function Home() {
  return (
    <Box sx={{
      height: '50vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderTop: '1px solid #363c40',
      objectFit: 'contain'
    }}>
        <Box component="img"
          sx={{
            width: '100%',
            zIndex: '-10',
            position: 'relative',
            objectFit: 'cover'
          }}
          alt="Home"
          src={HomeImage}
        />
        <Typography sx={{ position: 'absolute', top: '40%', fontWeight: '500', color: 'white', letterSpacing: '1px', textShadow: ' 1px 0 10px' }} variant="h4" component="h1" gutterBottom >
          ¡Bienvenidos!
        </Typography>
    </Box>


  );
}
export default Home;