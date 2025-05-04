import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useTheme } from '@mui/material/styles';

const ParrafoPlantilla = ({ text, clave, onEditClick, onDelete }) => {
  const theme = useTheme()

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
      <Box flexGrow={1}>
        <Typography variant="h6" gutterBottom>{clave}</Typography>
        {text.map((t, k) =>
          <Typography key={k} variant="body1" gutterBottom>{t}</Typography>
        )}
        {/* <Typography variant="body1" gutterBottom>{text}</Typography> */}
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          sx={{ width: '20px', height: '20px', padding: '17px', backgroundColor: theme.palette.primary.main, "&:hover": { backgroundColor: theme.palette.primary.dark } }}
          onClick={() => onEditClick(clave)}>
          <EditIcon sx={{ color: 'white', fontSize: '20px' }} />
        </IconButton>
        <IconButton
          sx={{ width: '20px', height: '20px', padding: '17px', backgroundColor: theme.palette.error.main, "&:hover": { backgroundColor: theme.palette.error.dark } }}
          onClick={() => onDelete(clave)}>
          <DeleteIcon sx={{ color: 'white', fontSize: '20px' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ParrafoPlantilla;