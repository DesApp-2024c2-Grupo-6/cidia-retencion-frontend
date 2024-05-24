import React, { useState } from 'react';
import { Typography, IconButton, TextField, Box, useTheme } from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';

const ParrafoPlantilla = ({ text, clave, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [editedClave, setEditedClave] = useState(clave);
  const theme = useTheme();

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedText, editedClave);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditedText(text);
    setEditedClave(clave);
    setEditing(false);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleClaveChange = (e) => {
    setEditedClave(e.target.value);
  };

  return (
    <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
      <Box flexGrow={1} flexBasis="80%">
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6" gutterBottom>{clave}</Typography>
          <Typography variant="body1" gutterBottom>{text}</Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column" flexBasis="20%">
        {editing ? (
          <>
            <TextField
              value={editedText}
              onChange={handleTextChange}
              fullWidth
              variant="outlined"
              size="small"
            />
            <TextField
              value={editedClave}
              onChange={handleClaveChange}
              fullWidth
              variant="outlined"
              size="small"
              label="Clave"
            />
            <IconButton onClick={handleSaveClick} aria-label="Guardar">
              <Save />
            </IconButton>
            <IconButton onClick={handleCancelClick} aria-label="Cancelar">
              <Cancel />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={handleEditClick} aria-label="Editar">
              <Edit />
            </IconButton>
            <IconButton onClick={onDelete} aria-label="Eliminar">
              <Delete />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ParrafoPlantilla;