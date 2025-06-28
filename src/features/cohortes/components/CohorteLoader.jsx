//MUI
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function CohorteLoader({ text }){

    const theme = useTheme()

    return (
        <Box sx={{ width: '100%', textAlign: 'center', padding: 10, marginBottom: 4 }}>
            <CircularProgress sx={{ marginBottom: 5 }} size={70} />
            <Typography color={theme.palette.primary.main} fontWeight={500} variant="h6" component="h3" gutterBottom>
                {text}
            </Typography>
            <Typography fontWeight={400} variant="h8" component="h3" gutterBottom>
                Esta operación puede tardar
            </Typography>
        </Box>
    )
}
