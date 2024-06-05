import React from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';

const TarjetaCondicion = ({ condicion, onChange }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 1, padding: 1, border: '1px solid grey', borderRadius: 2 }}>
      <Typography variant="body1">{condicion}</Typography>
      <Select value={condicion} onChange={(e) => onChange(e.target.value)}>
        <MenuItem value="SIEMPRE">Siempre</MenuItem>
        <MenuItem value="NUNCA">Nunca</MenuItem>
        <MenuItem value="EN_CARRERA">En Carrera</MenuItem>
        <MenuItem value="MATERIAS_PENDIENTES">Materias Pendientes</MenuItem>
        <MenuItem value="MATERIAS_NO_PENDIENTES">Materias No Pendientes</MenuItem>
        <MenuItem value="MATERIAS_COMUNES">Materias Comunes</MenuItem>
        <MenuItem value="CANT_APROBADAS">Cantidad de Materias Aprobadas</MenuItem>
        <MenuItem value="FINALES_PENDIENTES">Finales Pendientes</MenuItem>
        <MenuItem value="LIMITE_FINALES_PENDIENTES">Límite de Finales Pendientes</MenuItem>
        <MenuItem value="ORIENTACION">Orientación</MenuItem>
      </Select>
    </Box>
  );
};

export default TarjetaCondicion;