import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import '../styles/ConfiguracionCarreras.css';
import PanelConfiguradorGral from '../components/PanelConfiguradorGral'

function ConfiguracionCarrera() {

  const IdCarrera = useSelector((state) => state.carrera.IdCarrera);
  const nombreCarrera = useSelector((state) => state.carrera.nombreCarrera);

    return (
        <>
            <Box sx={{
                height: '50vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
        }}>
          <h1>{nombreCarrera}</h1>  
          
              <PanelConfiguradorGral />
            </Box>
        </>
    );
}

export default ConfiguracionCarrera;