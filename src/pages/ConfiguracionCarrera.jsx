import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box , Button, ButtonGroup} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import '../styles/ConfiguracionCarreras.css';
import PanelConfiguradorGral from '../components/PanelConfiguradorGral'
import MateriasCross from '../components/MateriasCross';

function ConfiguracionCarrera() {

  const IdCarrera = useSelector((state) => state.carrera.IdCarrera);
  const nombreCarrera = useSelector((state) => state.carrera.nombreCarrera);
  const navigate = useNavigate();
  const handleOnClickCondiciones = () => {
    navigate('/configuracion/condiciones')
}
    return (
        <>
            <Box sx={{
                height: '70vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
        }}>
          <h1>{nombreCarrera}</h1>  
            <Box 
            sx={{display: 'flex'}}>
               <MateriasCross />
               <MateriasCross />
               <PanelConfiguradorGral />
            </Box>
              <ButtonGroup 
                variant='outlined'
                sx={{p:2, m:2}}
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
        </>
    );
}

export default ConfiguracionCarrera;