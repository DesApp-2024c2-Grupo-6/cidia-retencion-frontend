import React, { useState } from 'react';
import { Typography, IconButton, TextField } from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';

const ParrafoPlantilla = ({ text, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedText);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditedText(text);
    setEditing(false);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {editing ? (
        <>
          <TextField
            value={editedText}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
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
          <Typography variant="body1" style={{ flexGrow: 1 }}>
            {text}
          </Typography>
          <IconButton onClick={handleEditClick} aria-label="Editar">
            <Edit />
          </IconButton>
          <IconButton onClick={onDelete} aria-label="Eliminar">
            <Delete />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default ParrafoPlantilla;