import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import '../styles/ConfiguracionCarreras.css';
import PanelConfiguradorGral from '../components/PanelConfiguradorGral'

function ConfiguracionCarrera() {


    const IdCarrera = useSelector((state) => state.carrera.IdCarrera);
    console.log(IdCarrera);

    return (
        <>
            <Box sx={{
                height: '50vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
                }}>
                <h1>Esta pantalla tiene que llevar lo de Dami y Cris</h1>
                <PanelConfiguradorGral />
            </Box>
        </>
    );
}

export default ConfiguracionCarrera;