import React, { useState, useEffect } from 'react';
import SelectComponent from '../components/SelectR';
import { Button, Box, Autocomplete, TextField } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import '../styles/ConfiguracionCarreras.css';
import { useDispatch } from 'react-redux';
import { addCarrera } from '../redux/carreraSlice';
import { getAllCareer } from '../services/CareerService';

import { useNavigate } from 'react-router-dom';

function SeleccionCarrera() {
    const dispatch = useDispatch();
    //const IdCarrera = useSelector((state) => state.carrera.IdCarrera)

    const navigate = useNavigate();
    const [carreras, setCarrerasList] = useState([]);
    const [configButton, setConfigButton] = useState("");
    const [message, setMessage] = useState({ codigo: 0, msg: "" });

    useEffect(() => {
        setMessage({});
        const obtenerCarreras = async () => {
            const carreras = await getAllCareer();
            if (carreras.status === 200) {
                const careers = carreras.data.allCareers.filter(carrera => carrera.careerId != undefined);
                setMessage({
                    code: carreras.status,
                    msg: `Se han traido todas las carreras.`
                })
                const lista = careers.map(c => ({
                    label: `${c.careerName}`,
                    value: { v: c.careerId, l: `${c.careerName}` }
                }));
                setCarrerasList(lista);
            } else {
                setMessage({
                    code: carreras.status,
                    msg: carreras.statusText
                })
            }
        }
        obtenerCarreras();

    }, [])


    const handleSelect = (value) => {
        dispatch(addCarrera({ IdCarrera: value.v, nombreCarrera: value.l }));
        setConfigButton(value.v)
    };

    const handleOnClickConfiguracionCarrera = () => {
        navigate('/configuracion/carrera')
    };

    const handleOnClickConfiguracionParrafos = () => {
        navigate('/configuracion/parrafos')
    };

    const handleOnClickConfiguracionDatosGenerales = () => {
        navigate('/configuracion/datos-generales')
    };


    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column' },
                alignItems: 'center',
                bgcolor: 'background.default',
                marginTop: 8,
                marginBottom: 3
            }}>
                <Box
                    sx={{
                        width: '500px',
                        minWidth: '250px'
                    }}
                >
                    <h3 className="label">Seleccione una Carrera</h3>

                    <Autocomplete
                        disablePortal
                        disableClearable
                        options={carreras}
                        className={'selectcarreras'}
                        freeSolo
                        onChange={(event, newValue) => (newValue) ? handleSelect(newValue.value) : handleSelect({v:"", l:""})}
                        renderInput={(params) => <TextField {...params} label="Carreras" />}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            marginTop: '30px',
                            marginBottom: '30px',
                            justifyContent: 'center',
                            alignItems: 'center'

                        }}
                    >
                        <Button
                            onClick={handleOnClickConfiguracionCarrera}
                            variant="contained"
                            name={'Configurar'}
                            disabled={configButton ? false : true}
                            startIcon={<BuildIcon />}>Configurar

                        </Button>
                        <Button
                            onClick={handleOnClickConfiguracionParrafos}
                            variant="contained"
                            name={'Plantillas-e-mail'}
                            startIcon={<ListIcon />}>Lista Párrafos
                        </Button>
                        <Button
                            onClick={handleOnClickConfiguracionDatosGenerales}
                            variant="contained"
                            name={'Plantillas-e-mail'}
                            startIcon={<ListIcon />}>Datos generales
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default SeleccionCarrera;