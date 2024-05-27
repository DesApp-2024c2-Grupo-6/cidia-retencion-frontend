import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const EdicionParrafo = ({ initialClave, initialTexto, onSave, onCancel }) => {
  const [clave, setClave] = useState(initialClave);
  const [texto, setTexto] = useState(initialTexto);

  const handleClaveChange = (e) => {
    setClave(e.target.value);
  };

  const handleTextoChange = (e) => {
    setTexto(e.target.value);
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