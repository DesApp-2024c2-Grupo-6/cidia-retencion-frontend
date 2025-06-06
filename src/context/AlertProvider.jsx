import React, { createContext, useContext, useState } from 'react';
import { IconButton, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';



const AlertContext = createContext(); // este es el único contexto válido

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const theme = useTheme()

  const [open, setOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: '',
    severity: 'info',
  });

  const showAlert = (message, severity = 'info') => {
    setAlertOptions({ message, severity });
    setOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const colors = {
    'info': theme.palette.primary.light,
    'error': theme.palette.error.light,
    'disabled': theme.palette.disabled.light,
    'success': theme.palette.success.light,
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={alertOptions.severity} sx={{ width: '100%', paddingX: 4, paddingY: 2}}
          action={
            <IconButton
              sx={{width: 10}}
              size="small"
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }>
          {alertOptions.message}
        </Alert>

      </Snackbar>
    </AlertContext.Provider>
  );
};