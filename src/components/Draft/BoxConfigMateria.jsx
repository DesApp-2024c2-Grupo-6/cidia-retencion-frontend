

import { Box, Stack, TextField } from '@mui/material';
import { green } from '@mui/material/colors';

export default function BoxConfigSignaturee(){
    return(
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            sx={{ border: '2px solid grey'}}>
                <label>Materias para generar sugerencias: </label>
                <TextField 
                    variant='standard'
                    sx={{ width: 35}} /> 
            
        </Box>
    )
}