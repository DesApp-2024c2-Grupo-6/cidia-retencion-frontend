import React, { useState, useEffect } from 'react';
import SelectComponent from '../components/SelectR';
import { Button, Box, Autocomplete, TextField, Modal, Typography, Select, MenuItem, FormControl, InputLabel, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
//Iconos
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import DataArrayIcon from '@mui/icons-material/DataArray';
import AddIcon from '@mui/icons-material/Add';

import SaveIcon from '@mui/icons-material/Save';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import '../styles/ConfiguracionCarreras.css';
import { useDispatch } from 'react-redux';
import { addCarrera } from '../redux/carreraSlice';

import { getAllCareer, saveCareer, getCarrerasConPlan, getAllCareerGuaraniConPlanes } from '../services/CareerService';
import { useNavigate } from 'react-router-dom';

//Services


//Datos de prueba


function SeleccionCarrera() {
    const theme = useTheme()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [carreras, setCarrerasList] = useState([]);
    const [configButton, setConfigButton] = useState("");
    const [message, setMessage] = useState({ codigo: 0, msg: "" });
    const [listaIdsPlanes, setListaIdsPlanes] = useState(["idsNoCargados"]);

    //Agregar carrera
    const [seEstaAgregandoCarrera, setSeEstaAgregandoCarrera] = useState(Boolean);
    const NUEVA_CARRERA_VACIA = { id: "", plan: [], nombre: "", estado: "", planes: [] }
    const [nuevaCarrera, setNuevaCarrera] = useState(NUEVA_CARRERA_VACIA);
    const [listadoCarrerasPlanes, SetListadoCarrerasPlanes] = useState([])

    console.log(nuevaCarrera)

    useEffect(() => {
        setMessage({});
        const obtenerCarreras = async () => {
            const carreras = await getCarrerasConPlan();
            if (carreras.status === 200) {
                const careers = carreras.data.allCareers.filter(carrera => carrera.careerId != undefined);
                setMessage({
                    code: carreras.status,
                    msg: `Se han traido todas las carreras.`
                })
                const lista = careers.map(c => ({
                    label: c.planName,
                    value: { v: c.careerId, l: c.planName, p: c.planId }
                }));

                const listaPlanes = lista.map(c => c.value.p)
                setListaIdsPlanes(listaPlanes)
                lista.sort((a, b) => a.label.localeCompare(b.label))
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

    useEffect(() => {
        setMessage({});
        if (listaIdsPlanes[0] != "idsNoCargados") {
            const obtenerCarrerasGuarani = async () => {
                const carreras = await getAllCareerGuaraniConPlanes();
                if (carreras.status === 200) {

                    setMessage({
                        code: carreras.status,
                        msg: `Se han traido todas las carreras.`
                    })
                    const lista = carreras.data.map(c => ({
                        id: c.id,
                        planId: "",
                        nombre: c.nombre,
                        estado: c.estado,
                        planes: c.planes
                    }));
                    lista.forEach(c => c.planes = c.planes.filter(p => !listaIdsPlanes.includes(p.id)))
                    const listaCarreras = lista.filter(c => c.planes.length != 0)
                    listaCarreras.sort((a, b) => a.nombre.localeCompare(b.nombre))
                    SetListadoCarrerasPlanes(listaCarreras);
                } else {
                    setMessage({
                        code: carreras.status,
                        msg: carreras.statusText
                    })
                }
            }
            obtenerCarrerasGuarani();
        }
    }, [listaIdsPlanes])




    const handleSelect = (value) => {
        dispatch(addCarrera({ IdCarrera: value.v, nombreCarrera: value.l, IdPlan: value.p }));
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

    const handleOnClickConfiguracionAgregarCarrera = () => {
        setSeEstaAgregandoCarrera(true)
    };

    const handleNuevaCarreraChange = (event, value) => {
        setNuevaCarrera({ ...value, plan: [] })
        dispatch(addCarrera({ IdCarrera: value.id, nombreCarrera: value.nombre }));
    }

    const handleCloseModal = () => {
        setSeEstaAgregandoCarrera(false)
        setNuevaCarrera(NUEVA_CARRERA_VACIA)
    }

    const handleSaveModal = async () => {
        const carreraData = { careerId: nuevaCarrera.id, planId: nuevaCarrera.plan.id }
        const response = await saveCareer(carreraData)
        if (response.status == 200) {
            dispatch(addCarrera({
                IdCarrera: nuevaCarrera.id
                , nombreCarrera: isNaN(nuevaCarrera.plan.nombre.slice(-4)) ? `${nuevaCarrera.plan.nombre} - ${nuevaCarrera.plan.fecha_entrada_vigencia.slice(0, 4)}` : nuevaCarrera.plan.nombre,
                IdPlan: nuevaCarrera.plan.id
            }));
            setConfigButton(nuevaCarrera.id)
            navigate('/configuracion/carrera')
        }
        else {
            console.log("Error")
        }
        setSeEstaAgregandoCarrera(false)
        setNuevaCarrera(NUEVA_CARRERA_VACIA)
    }

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const datosBotones = [
        { name: 'Lista parrafos', onClick: handleOnClickConfiguracionParrafos, icon: <ListIcon sx={{ marginRight: '5px' }} /> },
        { name: 'Datos generales', onClick: handleOnClickConfiguracionDatosGenerales, icon: <DataArrayIcon sx={{ marginRight: '5px' }} /> },
        { name: 'Nueva Carrera', onClick: handleOnClickConfiguracionAgregarCarrera, icon: <AddIcon sx={{ marginRight: '5px' }} /> },

    ]


    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column' },
                alignItems: 'center',
                bgcolor: 'background.default',
                marginTop: 8,
                marginBottom: 4
            }}>
                <Box
                    sx={{
                        width: '650px',
                        minWidth: '250px'
                    }}
                >
                    <Typography sx={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'medium' }} variant="h5" component="h1" gutterBottom>
                        Configuracion de carreras
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                        <Autocomplete
                            disablePortal
                            disableClearable
                            options={carreras}
                            className={'selectcarreras'}
                            freeSolo
                            onChange={(event, newValue) => (newValue) ? handleSelect(newValue.value) : handleSelect({ v: "", l: "" })}
                            renderInput={(params) => <TextField {...params} label="Carreras" sx={{ height: '55px' }} />}
                        />
                        <Button
                            sx={{
                                width: '30px',
                                height: '55px',
                                display: "flex", justifyContent: "center", alignItems: "center",
                                backgroundColor: theme.palette.primary.mainLight
                            }}
                            onClick={handleOnClickConfiguracionCarrera}
                            variant="contained"
                            name={'Configurar'}
                            size="small"
                            disabled={configButton ? false : true}>
                            <BuildIcon />
                        </Button>
                    </Stack>
                    <Stack direction="row"
                        spacing={1}
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginTop: '25px'
                        }}>
                        {
                            datosBotones.map(botonData =>
                                <Button
                                    sx={{ padding: '10px', height: '60px' }}
                                    onClick={botonData.onClick}
                                    variant="contained"
                                    name={botonData.name}>
                                    {botonData.icon}
                                    {botonData.name}
                                </Button>
                            )
                        }
                    </Stack>
                </Box>
                <Modal
                    open={seEstaAgregandoCarrera}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Agregar Carrera
                        </Typography>
                        <FormControl fullWidth
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mt: 2,
                                gap: 2,
                            }}
                        >
                            <Autocomplete
                                options={listadoCarrerasPlanes}
                                onChange={handleNuevaCarreraChange}
                                disablePortal
                                disableClearable
                                freeSolo
                                getOptionLabel={(carrera) => carrera.nombre}
                                renderInput={(params) => <TextField {...params} label="Carrera" />}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="select-planes">Plan de estudio</InputLabel>
                                <Select
                                    labelId="select-planes"
                                    id="id-select-planes"
                                    value={nuevaCarrera.plan}
                                    label="Plan de estudio"
                                    disabled={nuevaCarrera.id == ""}
                                    onChange={event => setNuevaCarrera({ ...nuevaCarrera, plan: event.target.value })}
                                >
                                    {nuevaCarrera.planes.map(plan =>
                                        <MenuItem key={plan.id} value={plan}>{"Plan " + plan.fecha_entrada_vigencia}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <Stack direction="row" spacing={1}
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Button variant="contained" startIcon={<ArrowCircleLeftIcon />} onClick={handleCloseModal}>Volver</Button>
                                <Button disabled={!nuevaCarrera.id || !nuevaCarrera.plan} variant="contained" color="secondary" startIcon={<SaveIcon />} onClick={handleSaveModal}>
                                    Guardar
                                </Button>
                            </Stack>
                        </FormControl>
                    </Box>
                </Modal>
            </Box>
        </>
    );
}

export default SeleccionCarrera;