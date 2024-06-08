import React from 'react';
import { Box, Typography, Select, MenuItem, TextField, Checkbox } from '@mui/material';

const TarjetaCondicion = ({ condicion, onChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 1, padding: 1, border: '1px solid grey', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '25ch', textAlign: 'center' }}>Condición</Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '25ch', textAlign: 'center' }}>Materia/Carrera</Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Cantidad</Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Va en carrera</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body1" sx={{ width: '25ch', overflow: 'hidden', textOverflow: 'ellipsis' }}>{condicion}</Typography>
        <Select value={condicion} onChange={(e) => onChange(e.target.value)} sx={{ width: '25ch' }}>
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
        <TextField type="number" variant="outlined" sx={{ width: '10ch' }} />
        <Checkbox />
      </Box>
    </Box>
  );
};

export default TarjetaCondicion;