import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Materia from '../components/Materia';

function ConfiguracionMaterias() {

    const navigate = useNavigate()
    const IdCarrera = useSelector((state) => state.carrera.IdCarrera);
    const nombreCarrera = useSelector((state) => state.carrera.nombreCarrera);

    const data = [
        { id_materia: '10', anio: '', campo: 'Gral', nombreEspecial: 'Introducción a la tecnología' },
        { id_materia: '1', anio: '2', campo: 'AyLi', nombreEspecial: '' },
      ];
    return(
<Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '800px',
        margin: 'auto',
        marginTop: 3,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
        <Typography 
            variant="h4"
            marginBottom={3} >
            {nombreCarrera}
        </Typography>  
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#f5f5f5',
          padding: '8px',
          borderBottom: '1px solid #ddd',
        }}
      >
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Código Materia</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Año</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Campo</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Nombre Especial</Typography>
        <Typography sx={{ flex: 1.5, textAlign: 'center', fontWeight: 'bold' }}>Acciones</Typography>
      </Box>

      {/* Rows */}
      {data.map((item) => (
        <Materia data={item} />
      ))}
    </Box>
    )
}

export default ConfiguracionMaterias;