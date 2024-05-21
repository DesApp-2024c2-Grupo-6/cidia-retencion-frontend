

import { Box, TextField, Button } from '@mui/material';
import '../styles/BoxConfigMateria.css';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export default function BoxConfigSignaturee(){
    return(
        <>
            <Box
                className='container-box'>
                <label>Materias para generar sugerencias: </label>
                <TextField 
                    variant='standard'
                    type='number'
                    className='container-box__input' /> 
            </Box>

            <Box
                className='container-box'>
                <label>Minimo de materias sugeridas para inscribirse: </label>
                <TextField 
                    variant='standard'
                    className='container-box__input' /> 
            </Box>

            <Box
                className='container-box'>
                <label>Nombre especial: </label>
                <TextField 
                    variant='standard'
                    className='container-box__input' /> 
            </Box>

            <Box>
                <Button
                    variant='contained'
                    startIcon={<ListIcon />}>MATERIAS</Button>    
                <Button
                    variant='contained'
                    startIcon={<EditIcon />}>EDITAR</Button>  
                <Button
                    variant='contained'
                    startIcon={<BuildIcon />}
                    >CONDICIONES</Button>  
                <Button
                    variant='contained'
                    startIcon={<SaveIcon />}>
                GUARDAR</Button>  
            </Box>

        </>
        
    )
}