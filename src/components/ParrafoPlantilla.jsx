import React from 'react';
import { Typography, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ParagraphComponent = ({ text, onEdit, onDelete }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1" style={{ flexGrow: 1 }}>
        {text}
      </Typography>
      <IconButton onClick={onEdit} aria-label="Editar">
        <Edit />
      </IconButton>
      <IconButton onClick={onDelete} aria-label="Eliminar">
        <Delete />
      </IconButton>
    </div>
  );
};

export default ParagraphComponent;