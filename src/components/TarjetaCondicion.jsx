import React from 'react';
import { Box, Typography, Select, MenuItem, TextField, Checkbox } from '@mui/material';
const devolucionCarreras = [
  { 
      careerId: 1, 
      unahurSubjects: [{year:1},{year:4}], englishLevels: [{year:3},{year:4}], 
      suggestionThresholdRegularizedSubjects: 4 
  },
  { 
      careerId: 5, 
      unahurSubjects: [{year: 1}], englishLevels: [{year:2}, {year:3}], 
      suggestionThresholdRegularizedSubjects: 3
  },
  { 
      careerId: 6, 
      unahurSubjects: [{year:1}, {year:2}, {year:3}], englishLevels: [{year:2}], 
      suggestionThresholdRegularizedSubjects: 5 
  },
  { 
      careerId: 7, 
      unahurSubjects: [{year:3, campo: 'CFC1'}], 
      englishLevels: [{year:1, campo: 'CFC1'}], 
      suggestionThresholdRegularizedSubjects: 3 
  },
  { 
      careerId: 13, 
      unahurSubjects: [{ year: 3, campo: 'CFC1' }, { year: 4, campo: 'CFC2'}],
      englishLevels: [{ year: 1, campo: 'CFC1' }, { year: 5, campo: 'CFC2'}], 
      suggestionThresholdRegularizedSubjects: 3
  },
  { 
      careerId: 16, 
      unahurSubjects: [{year:1}, {year:4}], englishLevels: [{year:2}, {year:3}], 
      suggestionThresholdRegularizedSubjects: 3 
  },
  { 
      careerId: 21, 
      unahurSubjects: [{year:3, campo: 'Gral'}], 
      englishLevels: [{ year: 1, campo: 'Gral' }, { year: 2, campo: 'Gral'}], 
      suggestionThresholdRegularizedSubjects: 3 
  },
  { 
      careerId: 31, 
      unahurSubjects: [{year:1}], englishLevels: [{year:2}, {year:3}], 
      suggestionThresholdRegularizedSubjects: 3 
  },
  { 
      careerId: 34, 
      unahurSubjects: [{year:1}, {year:2}, {year:3}], englishLevels: [{year:2}, {year:4}], 
      suggestionThresholdRegularizedSubjects: 5 
  },
  { 
      careerId: 38, 
      unahurSubjects: [{ year: 3, campo: 'Gral' }, { year: 4, campo: 'Gral'}], 
      englishLevels: [{ year: 1, campo: 'Gral' }, { year: 3, campo: 'Gral'}], 
      suggestionThresholdRegularizedSubjects: 3, 
      specialCareerName: "Tecnicatura / Licenciatura en inform�tica"
  }
];

const TarjetaCondicion = ({ condicion, onChange }) => {
  // Función para renderizar las opciones del Select
  const renderOptions = () => {
    if (condicion === "EN_CARRERA") {
      // Si la condición es "EN_CARRERA", renderiza las opciones de carreras
      return devolucionCarreras.map((carrera) => (
        <MenuItem key={carrera.careerId} value={carrera.careerId}>
          {carrera.specialCareerName || `Carrera ${carrera.careerId}`}
        </MenuItem>
      ));
    } else {
      // De lo contrario, renderiza las opciones estándar
      return (
        <>
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
        </>
      );
    }
  };

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
        {/* Renderizamos las opciones del Select dependiendo de la condición seleccionada */}
        <Select value={condicion} onChange={(e) => onChange(e.target.value)} sx={{ width: '25ch' }}>
          {renderOptions()}
        </Select>
        <TextField type="number" variant="outlined" sx={{ width: '10ch' }} />
        <Checkbox />
      </Box>
    </Box>
  );
};

export default TarjetaCondicion;