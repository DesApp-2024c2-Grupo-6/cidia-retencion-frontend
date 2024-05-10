import React, { useState } from 'react';
import SelectComponent from './SelectR';
import { Box } from '@mui/material';
import '../styles/ConfiguracionCarreras.css';

function ConfiguracionCarreras( /*lascarreras*/ ) {

 // const [selectedItem, setSelectedItem] = useState('');

 // const listacarreras = lascarreras;

  const carreras = [
    { label: 'Introducción ', value: '1' },
    { label: 'Objetos 1', value: '2' },
    { label: 'Matemáticas', value: '3' },
  ];


  const handleSelect = (selectedValue) => {
    console.log(selectedValue);
  };

  return (
    <>
      <Box sx={{
        height: '50vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'
      }}>
        <Box
          sx={{
            minWidth:'250px'
          }}
        >
          <h3>Selecciona una Carrera</h3>
          <SelectComponent options={carreras} onSelect={handleSelect} className={ 'selectcarreras' } placeholder='Carreras'/>
        </Box>
      </Box>
      
    </>
   );
}

export default ConfiguracionCarreras;