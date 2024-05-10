

import { Box, TextField } from '@mui/material';
import './BoxConfigMateria.css';
import ButtonR from '../ButtonR';
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
                <ButtonR
                    name={'Materias'}
                    startIcon={<ListIcon />}>
                </ButtonR>    
                <ButtonR
                    name={'Editar'}
                    startIcon={<EditIcon />}>
                </ButtonR>  
                <ButtonR
                    name={'Condiciones'}
                    startIcon={<BuildIcon />}
                    >
                </ButtonR>  
                <ButtonR
                    name={'Guardar'}
                    startIcon={<SaveIcon />}>
                </ButtonR>  
            </Box>

        </>
        
    )
}