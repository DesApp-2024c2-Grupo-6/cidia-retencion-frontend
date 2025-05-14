//MUI
import { Box, Typography } from '@mui/material';


export default function CohorteNotSelected ({ text }) {
    return (
        <Box sx={{ width: '60%', minWidth: 650, padding: 10, marginBottom: 4 }}>
            <Typography fontWeight={400} variant="h6" color="gray" textAlign="center" component="h3" gutterBottom>
                {text}
            </Typography>
        </Box>
    )
}
