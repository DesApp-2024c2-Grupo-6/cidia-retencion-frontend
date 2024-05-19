import React, { useState } from 'react';
import SelectComponent from '../components/SelectR';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import '../styles/ConfiguracionCarreras.css';

import { useNavigate } from 'react-router-dom';

function SeleccionCarrera( /*lascarreras*/ ) {

 // const [selectedItem, setSelectedItem] = useState('');

 // const listacarreras = lascarreras;
  const navigate = useNavigate();
    const carreras = [
    { label: 'Introducción ', value: '1' },
    { label: 'Objetos 1', value: '2' },
    { label: 'Matemáticas', value: '3' },
    ];


    const handleSelect = (selectedValue) => {
        console.log(selectedValue);
  };


  const handleOnClickConfiguracionCarrera = () => {
    navigate('/configuracion/carrera')
  }

    return (
        <>
            <Box sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box
                    sx={{
                        width: '500px',
                        minWidth: '250px'
                    }}
                >
                    <h3 className="label">Selecciona una Carrera</h3>
                    <SelectComponent options={carreras} onSelect={handleSelect} className={'selectcarreras'} placeholder='Carreras' />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            marginTop:'20px',
                            justifyContent: 'center',
                            alignItems: 'center'

                        }}
                    >
              <Button
                onClick={handleOnClickConfiguracionCarrera}
                            variant="contained"
                            name={'Configurar'}
                            startIcon={<BuildIcon />}>Configurar
                        </Button>
              {
                //aca cambiar el link por el buton con navigare como en el header
              }
                        <Link key="ListaParafos" to={'/ListaParafos'}>
                            <Button variant="contained" name={'Plantillas e-mail'} startIcon={<ListIcon />}>Lista Párrafos</Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
      
        </>
    );
}

export default SeleccionCarrera;