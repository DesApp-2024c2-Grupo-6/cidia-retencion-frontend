import React, { useState, useEffect } from 'react';
import SelectComponent from '../components/SelectR';
import { Button, Box, Autocomplete, TextField, Modal, Typography, Select, MenuItem, FormControl} from '@mui/material';
//Iconos
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import '../styles/ConfiguracionCarreras.css';
import { useDispatch } from 'react-redux';
import { addCarrera } from '../redux/carreraSlice';

import { getAllCareer, saveCareer,getAllCareerGuarani,getAllCareerGuaraniConPlanes } from '../services/CareerService';
import { useNavigate } from 'react-router-dom';

//Services


//Datos de prueba


function SeleccionCarrera() {
    const dispatch = useDispatch();
    //const IdCarrera = useSelector((state) => state.carrera.IdCarrera)
    const navigate = useNavigate();
    const [carreras, setCarrerasList] = useState([]);
    const [configButton, setConfigButton] = useState("");
    const [message, setMessage] = useState({ codigo: 0, msg: "" });

    //Agregar carrera
    const [seEstaAgregandoCarrera, setSeEstaAgregandoCarrera] = useState(Boolean);
    const NUEVA_CARRERA_VACIA = {id: "", planId: "", nombre: "", estado: "", planes: []}
    const [nuevaCarrera, setNuevaCarrera] = useState(NUEVA_CARRERA_VACIA);
    const [listadoCarrerasPlanes, SetListadoCarrerasPlanes] = useState([])
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
                    value: { v: c.careerId, l: `${c.careerName}`,p:c.planId }
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

    useEffect(() =>{
        setMessage({});
        const obtenerCarrerasGuarani = async () => {
            const carreras = await getAllCareerGuaraniConPlanes();
            if (carreras.status === 200) {
 
                setMessage({
                    code: carreras.status,
                    msg: `Se han traido todas las carreras.`
                })
                const lista = carreras.data.map(c => ({
                    //id: "", planId: "", nombre: "", estado: ""
                    id: c.id,
                    planId: "",
                    nombre: c.nombre,
                    estado: c.estado,
                    planes:c.planes
                }));
                SetListadoCarrerasPlanes(lista);
            } else {
                setMessage({
                    code: carreras.status,
                    msg: carreras.statusText
                })
            }
        }
        obtenerCarrerasGuarani();
    },[])


    const handleSelect = (value) => {
        dispatch(addCarrera({ IdCarrera: value.v, nombreCarrera: value.l,IdPlan: value.p}));
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
        setNuevaCarrera({ ...value, planId: "" })
        dispatch(addCarrera({ IdCarrera: value.id, nombreCarrera: value.nombre}));
    }

    const handleCloseModal = () => {
        setSeEstaAgregandoCarrera(false)
        setNuevaCarrera(NUEVA_CARRERA_VACIA)
    }

    const handleSaveModal = async () => {
        const carreraData = {careerId: nuevaCarrera.id, planId: nuevaCarrera.planId }
        const response = await saveCareer(carreraData)
        if(response.status == 200){
            dispatch(addCarrera({ IdCarrera: nuevaCarrera.id, nombreCarrera: nuevaCarrera.nombre,IdPlan: nuevaCarrera.planId}));
            setConfigButton(nuevaCarrera.id)
            navigate('/configuracion/carrera')
        }
        else{
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
                        onChange={(event, newValue) => (newValue) ? handleSelect(newValue.value) : handleSelect({ v: "", l: "" })}
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
                        <Button
                            onClick={handleOnClickConfiguracionAgregarCarrera}
                            variant="contained"
                            name={'Plantillas-e-mail'}
                            startIcon={<ListIcon />}>Nueva carrera
                        </Button>
                    </Box>
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
                            <Select
                                labelId="select-planes"
                                id="id-select-planes"
                                value={nuevaCarrera.planId}
                                label="Plan de estudios"
                                disabled = {nuevaCarrera.id == ""}
                                onChange={event => setNuevaCarrera({...nuevaCarrera, planId: event.target.value})}
                            >
                                {nuevaCarrera.planes.map(plan =>
                                    <MenuItem key={plan.id} value={plan.id}>{"Plan "+ plan.fecha_entrada_vigencia}</MenuItem>
                                )}
                            </Select>
                            <Box
                                sx={{ display: 'flex', gap: '10px' }}>
                                <Button variant="contained" startIcon={<ArrowCircleLeftIcon />} onClick={handleCloseModal}>Volver</Button>
                                <Button disabled={!nuevaCarrera.id || !nuevaCarrera.planId} variant="contained" color="secondary" startIcon={<SaveIcon />} onClick={handleSaveModal}>
                                    Guardar
                                </Button>
                            </Box>
                        </FormControl>
                    </Box>
                </Modal>
            </Box>
        </>
    );
}

export default SeleccionCarrera;