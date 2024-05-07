import React, { useState } from 'react';
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,TextField,} from '@mui/material';

const ModalExample = () => {
  const [open, setOpen] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Aquí puedes manejar la lógica para guardar los datos
    console.log('Input 1:', input1);
    console.log('Input 2:', input2);
    console.log('Input 3:', input3);

    // Cerrar la ventana emergente después de guardar
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Abre ventana
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nombre de la materia</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="input1"
            label="Nombre especial"
            type="text"
            fullWidth
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <TextField
            margin="dense"
            id="input2"
            label="Anio"
            type="text"
            fullWidth
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <TextField
            margin="dense"
            id="input3"
            label="Campo"
            type="text"
            fullWidth
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalExample;