import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';


const ParrafoPlantilla = ({ text, clave, onEditClick, onDelete }) => {
  return (
    <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
      <Box flexGrow={1} flexBasis="80%">
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6" gutterBottom>{clave}</Typography>
          <Typography variant="body1" gutterBottom>{text}</Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column" flexBasis="20%">
        <IconButton onClick={onEditClick} aria-label="Editar">
          <Edit />
        </IconButton>
        <IconButton onClick={onDelete} aria-label="Eliminar">
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ParrafoPlantilla;