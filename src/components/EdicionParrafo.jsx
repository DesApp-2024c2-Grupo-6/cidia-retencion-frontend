import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import TarjetaDeCondiciones from './TarjetaDeCondiciones';

const EdicionParrafo = ({ initialClave, initialTexto, onSave, onCancel }) => {
  const [clave, setClave] = useState(initialClave);
  const [texto, setTexto] = useState(initialTexto);
  const [condicionSeleccionada, setCondicionSeleccionada] = useState('');

  const handleClaveChange = (e) => {
    setClave(e.target.value);
  };

  const handleTextoChange = (e) => {
    setTexto(e.target.value);
  };

  const handleCondicionChange = (e) => {
    setCondicionSeleccionada(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(clave, texto);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSave}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <TextField
        label="Clave"
        value={clave}
        onChange={handleClaveChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Texto"
        value={texto}
        onChange={handleTextoChange}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
      />
      <FormControl fullWidth>
        <InputLabel id="condiciones-select-label">Condiciones</InputLabel>
        <Select
          labelId="condiciones-select-label"
          value={condicionSeleccionada}
          onChange={handleCondicionChange}
        >
          
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
      </FormControl>
      {condicionSeleccionada && (
        <TarjetaDeCondiciones condicion={condicionSeleccionada} />
      )}
      <Box display="flex" justifyContent="space-between">
        <Button type="submit" variant="contained" color="primary">
          Guardar
        </Button>
        <Button variant="contained" color="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default EdicionParrafo;