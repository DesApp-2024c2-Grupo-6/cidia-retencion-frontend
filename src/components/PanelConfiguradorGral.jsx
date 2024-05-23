

import { Box, TextField, Button, ButtonGroup } from '@mui/material';
import '../styles/PanelConfiguradorGral.css';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

export default function PanelConfiguradorGral() {

    const navigate = useNavigate();

    const handleOnClickCondiciones = () => {
        navigate('/configuracion/condiciones')
    }


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

            <ButtonGroup 
                variant='outlined'
            >
                <Button
                    startIcon={<ListIcon />}>MATERIAS</Button>    
                <Button
                    startIcon={<EditIcon />}>EDITAR</Button>  
                <Button
                    startIcon={<BuildIcon />}
                    onClick={ handleOnClickCondiciones }
                    >CONDICIONES</Button>  
                <Button
                    startIcon={<SaveIcon />}>
                GUARDAR</Button>  
            </ButtonGroup>

        </Box>
        
    )
}