﻿import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, IconButton, Tooltip, Table } from '@mui/material';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import listadoCondicionesCarrera from '../services/listadoCondicionesCarrera';
import { useNavigate } from 'react-router-dom';

//import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SelectComponent from '../components/SelectR';
import listadoRegistracionCondiciones from '../services/listadoRegistracionCondiciones';
import listadoSubjectData from '../services/listadoSubjectData';
import SelectMultipleR from '../components/SelectMultipleR';


function createData(key, id, anio, materia, tiporestriccion, condicion) {
    return {key, id, anio, materia, tiporestriccion, condicion };
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'block',
};

function ConfiguracionCondicionCarrera() {

    const navigate = useNavigate();

    const IdCarrera = useSelector((state) => state.carrera.IdCarrera);
    const nombreCarrera = useSelector((state) => state.carrera.nombreCarrera);

    const [condicionesList, setCondicionesList] = useState([]);

    useEffect(() => {
        const lista = listadoCondicionesCarrera
            .filter(c => c.id_carrera == IdCarrera)
            .map((c, index) => {
                let configCondicion;
                if (c.codigo_condicion === "MATERIAS-ESPECIFICAS") {
                    configCondicion = "Materias:- "+ c.config_condicion.materias.map((m, idx) => idx === c.config_condicion.materias.length - 1 ? m : m + " - ").join("");
                } else if (c.codigo_condicion === "ANIOS-COMPLETOS") {
                    configCondicion = "Año: " + c.config_condicion.anio;
                } else if (c.codigo_condicion === "CANT-MATERIAS-ANIO") {
                    configCondicion = `Año: ${c.config_condicion.anio} - Cantidad: ${c.config_condicion.cantidad} - Campos: ${c.config_condicion.campos.map((cam, idx) => idx === c.config_condicion.campos.length - 1 ? cam : cam + " - ").join("")}`;
                } else if (c.codigo_condicion === "CANT-MATERIAS") {
                    configCondicion = `Cantidad: ${c.config_condicion.cantidad} - ${c.config_condicion.campos_excepto == null ? "" : "Campos exceptuados: -" +c.config_condicion.campos_excepto.map((ce, idx) => idx === c.config_condicion.campos_excepto.length - 1 ? ce : ce+" ").join("")}`
                } else {
                    configCondicion = "-";
                }
                return createData(index, c.id_carrera, c.anio ?? "-", c.id_materia ?? "-", c.codigo_condicion ?? "-", configCondicion);
            });
        setCondicionesList(lista);
    }, [])

    
    const [tiposCondicionList, setTiposCondicionList] = useState([]);
    useEffect(() => {
        const lista = listadoRegistracionCondiciones.map(c => ({
            label: c.codigo,
            value: c.codigo
        }));
        setTiposCondicionList(lista);
    }, [])

    const [materiasCondicionList, setMateriasCondicionList] = useState([]);
    useEffect(() => {
        const lista = listadoSubjectData.filter(c => c.id_carrera == IdCarrera).map(c => ({
            label: `Materia ${c.id_materia}`,
            value: c.id_materia
        }));
        setMateriasCondicionList(lista.sort((a, b) => (a.value > b.value ? 1 : a.value < b.value ? -1 : 0)));
    }, [])

    //const handleSelect = (selectedValue, nomSelected) => {
    //    dispatch(addCarrera({ IdCarrera: selectedValue, nombreCarrera: nomSelected }));
    //};


    const [materia, setmateria] = useState("");
    const [condicion, setCondicion] = useState("");
    const [anio, setAnio] = useState("");
    const [mostrarCamposCompletos, setMostrarCamposCompletos] = useState(false); 
    const [mostrarMateriasEspecificas, setMostrarMateriasEspecificas] = useState(false);
    const [mostrarCantidadMaterias, setMostrarCantidadMaterias] = useState(false);
    const [mostrarAniosCompletos, setMostrarAniosCompletos] = useState(false);
    const [mostrarCantidadMateriasAnio, setMostrarCantidadMateriasAnio] = useState(false);
    const setearAnio = (event) => {
        setAnio(event.target.value);
    }
    const setearMateria = (valor) => {
        setmateria(valor);
    }
    const setearCondicion = (valor) => {
        setCondicion(valor);
        //setMostrarN-1(valor == "N-1");
        //setMostrarN-2(valor == "N-2");
        //setMostrarN-1R-2A(valor == "N-1R-2A");
        setMostrarCantidadMaterias(valor == "CANT-MATERIAS");
        setMostrarAniosCompletos(valor == "ANIOS-COMPLETOS");
        setMostrarCamposCompletos(valor == "CAMPOS-COMPLETOS");
        setMostrarCantidadMateriasAnio(valor == "CANT-MATERIAS-ANIO");
        setMostrarMateriasEspecificas(valor == "MATERIAS-ESPECIFICAS");
    }

    const [camposList, setCamposList] = useState([]);

    useEffect(() => {
        const lista = listadoSubjectData
            .filter(c => c.id_carrera === IdCarrera)
            .map(c => ({
                label: c.campo,
                value: c.campo
            }));

        const eliminarDuplicados = (arr) => {
            const map = new Map();
            return arr.filter(item => !map.has(item.value) && map.set(item.value, true));
        };

        const listaSinDuplicados = eliminarDuplicados(lista);

        setCamposList(listaSinDuplicados);
    }, [IdCarrera]);

    const [camposSeleccionados, setCamposSeleccionados] = useState([]);
    const setearcamposSeleccionados = (value) => {

        setCamposSeleccionados([...camposSeleccionados, value]);
    }




    const guardarCondicion = () => {

        console.log(camposSeleccionados)
        //console.log("se guardo, año: " + anio + ", materia: " + materia + ", condición: " + condicion);

        //const nuevaCondicion = {
        //    key: condicionesList.length,
        //    id_carrera: IdCarrera,
        //    anio: anio,
        //    materia: materia,
        //    tiporestriccion: '',
        //    condicion: condicion
        //};

        //setCondicionesList([...condicionesList, nuevaCondicion]);
        //setOpen(false);
    }

    const paginaAnterior = () => {
        navigate('/configuracion/carrera');
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
    
        <>
            <Box
                sx={{
                    width:'100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Box>
                    <Box
                        sx={{
                            width: 'auto',
                            marginBottom: '50px'
                        }}>
                        <Box>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Box
                                        sx={{
                                            textAlign: "center",
                                            marginBottom:'10px'
                                        }}>
                                        <Typography variant="h6" >
                                            Nueva condición
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: '10px',
                                        marginBottom: '10px'
                                    }}>
                                        <FormControl sx={{
                                            width: '100px'
                                        }}>
                                            <OutlinedInput
                                                sx={{
                                                    '& input': {
                                                        textAlign: 'center',
                                                        height: '7px'
                                                    }
                                                }}
                                                placeholder="Año" onInput={setearAnio} />
                                        </FormControl>
                                        <SelectComponent options={materiasCondicionList} onSelect={setearMateria} className={'selectcarreras'} placeholder='Seleccione Materia' />
                                    </Box>
                                    <Box
                                        sx={{
                                            marginBottom: '10px'
                                        }}>
                                        <SelectComponent options={tiposCondicionList} onSelect={setearCondicion} className={'selectcarreras'} placeholder='Seleccione Condiciones' />
                                    </Box>
                                    {
                                        mostrarCamposCompletos && (
                                            <Box
                                                >
                                                <FormControl sx={{
                                                    width: '180px'
                                                }}>
                                                    <OutlinedInput
                                                        sx={{
                                                            '& input': {
                                                                textAlign: 'center',
                                                                height: '7px',
                                                                padding: '16.5px 5px 16.5px 5px'
                                                            }
                                                        }}
                                                        placeholder="Salvo Cantidad" onInput={setearAnio} />
                                                </FormControl>
                                                <SelectMultipleR options={camposList} onSelect={setearcamposSeleccionados} className={'selectcarreras'} placeholder='Seleccione Campos' />
                                            </Box>
                                        )
                                    }
                                    {
                                        mostrarMateriasEspecificas && (
                                            <Box
                                                >
                                                <SelectComponent options={tiposCondicionList} onSelect={setearCondicion} className={'selectcarreras'} placeholder='Seleccione Materias específicas' />
                                            </Box>
                                        )
                                    }
                                    {
                                        mostrarCantidadMaterias && (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: '5px',
                                                    justifyContent: 'center',
                                                }}>
                                                <FormControl sx={{
                                                    width: '100px'
                                                }}>
                                                    <OutlinedInput
                                                        sx={{
                                                            '& input': {
                                                                textAlign: 'center',
                                                                height: '7px',
                                                                padding: '16.5px 0px 16.5px 0px'
                                                            }
                                                        }}
                                                        placeholder="Cantidad" onInput={setearAnio} />
                                                </FormControl>
                                                <SelectComponent options={tiposCondicionList} onSelect={setearCondicion} className={'selectcarreras'} placeholder='Seleccione Campos Exceptuados' />
                                            </Box>
                                        )
                                    }
                                    {
                                        mostrarAniosCompletos && (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: '10px',
                                                    justifyContent: 'center',
                                                }}>
                                                <FormControl sx={{
                                                    width: '100%'
                                                }}>
                                                    <OutlinedInput
                                                        sx={{
                                                            '& input': {
                                                                textAlign: 'center',
                                                                height: '7px',
                                                                padding: '16.5px 0px 16.5px 0px'
                                                            }
                                                        }}
                                                        placeholder="Año" onInput={setearAnio} />
                                                </FormControl>
                                                <FormControl sx={{
                                                    width: '100%'
                                                }}>
                                                    <OutlinedInput
                                                        sx={{
                                                            '& input': {
                                                                textAlign: 'center',
                                                                height: '7px',
                                                                padding: '16.5px 5px 16.5px 5px'
                                                            }
                                                        }}
                                                        placeholder="Salvo Cantidad" onInput={setearAnio} />
                                                </FormControl>
                                            </Box>
                                        )
                                    }
                                    {
                                        mostrarCantidadMateriasAnio && (
                                            <Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: '10px',
                                                        marginBottom:'10px'
                                                    }}>
                                                    <FormControl sx={{
                                                        width: '100%'
                                                    }}>
                                                        <OutlinedInput
                                                            sx={{
                                                                '& input': {
                                                                    textAlign: 'center',
                                                                    height: '7px',
                                                                    padding: '16.5px 0px 16.5px 0px'
                                                                }
                                                            }}
                                                            placeholder="Año" onInput={setearAnio} />
                                                    </FormControl>
                                                    <FormControl sx={{
                                                        width: '100%'
                                                    }}>
                                                        <OutlinedInput
                                                            sx={{
                                                                '& input': {
                                                                    textAlign: 'center',
                                                                    height: '7px',
                                                                    padding: '16.5px 0px 16.5px 0px'
                                                                }
                                                            }}
                                                            placeholder="Cantidad" onInput={setearAnio} />
                                                    </FormControl>
                                                    
                                                </Box>

                                                <Box>
                                                    <SelectComponent options={tiposCondicionList} onSelect={setearCondicion} className={'selectcarreras'} placeholder='Seleccione Campos Exceptuados' />
                                                </Box>
                                            </Box>

                                        )
                                    }
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginTop: '25px'
                                        }}>

                                        <Button variant="contained" onClick={guardarCondicion}>
                                            Guardar
                                        </Button>
                                    </Box>
                                    
                                </Box>
                            </Modal>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop:'100px;'
                            }}>
                            <Typography variant="h4" >
                                {nombreCarrera}
                            </Typography>
                            <Tooltip title="Crear una nueva condición.">
                                <IconButton color="primary" aria-label="editar" sx={{ width: '40px' }} onClick={handleOpen}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead
                                        sx={{
                                            backgroundColor: '#609800',
                                        }}>
                                        <TableRow>
                                            <TableCell sx={{ color: '#FFFFFF' }} align="center">Año</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF' }} align="center">Materia</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF' }} align="center">Tipo de restricción</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF' }} align="center">Condiciones</TableCell>
                                            <TableCell sx={{ color: '#FFFFFF' }} align="center">Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            condicionesList.length === 0 ? (
                                                <TableRow
                                                    key={""}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row" colSpan={5} align="center">
                                                        <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
                                                            No hay condiciones.
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (

                                            condicionesList.map((row) => (
                                            <TableRow
                                                key={row.key}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align="center">
                                                    {row.anio}
                                                </TableCell>
                                                <TableCell align="center">{row.materia}</TableCell>
                                                <TableCell align="center">{row.tiporestriccion}</TableCell>
                                                <TableCell align="center">
                                                    {typeof row.condicion === 'string' ? row.condicion.split('-').map((c, idx) => (
                                                    <React.Fragment key={idx}>
                                                        {c}
                                                        {idx < row.condicion.split('-').length - 1 && <br />}
                                                    </React.Fragment>
                                                    )) : row.condicion}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {/*<IconButton color="primary" aria-label="editar" sx={{ width: '40px' }}*/}
                                                    {/*    <EditIcon />*/}
                                                    {/*</IconButton>*/}
                                                    <Tooltip title="Eliminar condición.">
                                                        <IconButton color="secondary" aria-label="eliminar" sx={{ width: '40px' }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>)
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            marginBottom: '20px'
                        }}>
                        <Button variant="contained" onClick={ paginaAnterior }>
                            Volver
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default ConfiguracionCondicionCarrera;