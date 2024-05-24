

import { Box, TextField, } from '@mui/material';
import '../styles/PanelConfiguradorGral.css';

export default function PanelConfiguradorGral() {



    return(
        <Box className='container-config'>
            <Box
                className='container-config-item'>
                <label>Materias para generar sugerencias: </label>
                <TextField 
                    variant='standard'
                    className='container-config-item-input' /> 
            </Box>

            <Box
                className='container-config-item'>
                <label>Minimo de materias sugeridas para inscribirse: </label>
                <TextField 
                    variant='standard'
                    className='container-config-item-input' 
                 /> 
            </Box>

            <Box
                className='container-config-item'>
                <label>Nombre especial: </label>
                <TextField 
                    variant='standard'
                 /> 
            </Box>

        </Box>
        
    )
}