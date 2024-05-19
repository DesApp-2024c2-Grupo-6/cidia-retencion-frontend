import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import '../styles/ConfiguracionCarreras.css';
import BoxConfigMateria from '../components/Draft/BoxConfigMateria'

function ConfiguracionCarrera( /*lascarreras*/) {





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
        <BoxConfigMateria></BoxConfigMateria>


      </Box>

    </>
  );
}

export default ConfiguracionCarrera;