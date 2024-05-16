import React, { useState } from 'react';
import SelectComponent from '../components/SelectR';
import ButtonR from '../components/ButtonR';
import { Box } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
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
                        <ButtonR
                            name={'Configurar'}
                            startIcon={<BuildIcon />}>
                        </ButtonR>
                        <ButtonR
                            name={'Plantillas e-mail'}
                            startIcon={<ListIcon />}>
                        </ButtonR>
                    </Box>
                </Box>
            </Box>
      
        </>
    );
}

export default ConfiguracionCarreras;