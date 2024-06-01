import React, { useState, useEffect } from 'react';
import SelectComponent from '../components/SelectR';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import '../styles/ConfiguracionCarreras.css';
import listadoCarreras from '../services/listadoCarreras';
import { useSelector, useDispatch } from 'react-redux';
import { addCarrera } from '../redux/carreraSlice';

import { useNavigate } from 'react-router-dom';

function SeleccionCarrera() {
    const dispatch = useDispatch();
    //const IdCarrera = useSelector((state) => state.carrera.IdCarrera)

    const navigate = useNavigate();
    const [carreras, setCarrerasList] = useState([]);

    useEffect(() => {
        const lista = listadoCarreras.map(c => ({
          label: `Carrera ${c.careerId}`,
          value: { v: c.careerId, l: `Carrera ${c.careerId}` }
        }));
          setCarrerasList(lista);
      }, [])


    const handleSelect = (value) => {
        dispatch(addCarrera({ IdCarrera: value.v, nombreCarrera: value.l }));
    };

    const handleOnClickConfiguracionCarrera = () => {
        navigate('/configuracion/carrera')
    };

    const handleOnClickConfiguracionParrafos = () => {
        navigate('/configuracion/parrafos')
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
                    <h3 className="label">Seleccione una Carrera</h3>
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
                        <Button
                            onClick={handleOnClickConfiguracionParrafos}
                            variant="contained"
                            name={'Plantillas-e-mail'}
                            startIcon={<ListIcon />}>Lista Párrafos
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default SeleccionCarrera;