

import { Box, TextField, } from '@mui/material';
import '../styles/PanelConfiguradorGral.css';

export default function PanelConfiguradorGral({isEdit}) {



    return(
        <Box className='container-config'>
            <Box
                className='container-config-item'>
                <label>Materias para generar sugerencias: </label>
                <TextField 
                    variant='standard'
                    className='container-config-item-input'
                    inputProps={{readOnly: !isEdit}} /> 
            </Box>

            <Box
                className='container-config-item'>
                <label>Minimo de materias sugeridas para inscribirse: </label>
                <TextField 
                    variant='standard'
                    className='container-config-item-input' 
                    inputProps={{readOnly: !isEdit}} /> 
            </Box>

            <Box
                className='container-config-item'>
                <label>Nombre especial: </label>
                <TextField 
                    variant='standard'
                    inputProps={{readOnly: !isEdit}}/> 
            </Box>

        </Box>
        
    )
}