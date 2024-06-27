import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TextField, Checkbox } from '@mui/material';
import SelectMultipleAR from './SelectMultipleAR';

const TarjetaCondicion = ({ condicion, listaCarreras, listaMaterias, handleCheckbox, deshabilitarCampoNumerico, }) => {

    const [listaCarrerasElejidas, setListaCarrerasElejidas] = useState([]);

    //LA LISTA PARA LAS MATERIAS
    const [listaMateriasParaSelect, setListaMateriasParaSelect] = useState([]);

    const [renderMaterias, setRenderMaterias] = useState(listaMaterias);

    // PARA CARGAR INICIALMENTE LA LISTA DE MATERIAS
    useEffect(() => {
        const materiasFiltradas = renderMaterias.filter(materia =>
            listaCarrerasElejidas.length > 0 ? listaCarrerasElejidas.includes(materia.id_carrera) : renderMaterias
        );
        const listaFiltrada = materiasFiltradas.map(m => ({
            value: m.id_materia,
            label: `Materia ${m.id_materia}`
        }));
        const eliminarDuplicados = (arr) => {
            const map = new Map();
            return arr.filter(item => !map.has(item.value) && map.set(item.value, true));
        };
        const listaSinDuplicados = eliminarDuplicados(listaFiltrada);

        setListaMateriasParaSelect(listaSinDuplicados.sort((a, b) => (a.value > b.value ? 1 : a.value < b.value ? -1 : 0)));
    }, []);

    //PARA FILTRAR LA LISTA DE MATERIAS CON LAS CARRERAS ELEGIDAS 
    useEffect(() => {
        if (condicion !== "MATERIAS_PENDIENTES" && condicion !== "MATERIAS_NO_PENDIENTES")
        {
            if (listaCarrerasElejidas.length > 0) {
                const materiasFiltradas = renderMaterias.filter(materia =>
                    listaCarrerasElejidas.includes(materia.id_carrera)
                );
                const listaFiltrada = materiasFiltradas.map(m => ({
                    value: m.id_materia,
                    label: `Materia ${m.id_materia}`
                }));
                console.log("cantidad de materias: ",listaFiltrada.length)
                setListaMateriasParaSelect(listaFiltrada);
            } else {
                setListaMateriasParaSelect([]);
            }
        }
        
    }, [listaCarrerasElejidas, listaMaterias]);

    //PARA CARGAR LA LISTA DE CARRERAS ELEGIDAS
    const carrerasseleccionadas = (carreras) => {
        setListaCarrerasElejidas(carreras);
    };

    const handleMateriasPendientesChange = (materias) => {
        //setMateriasSeleccionadas(materias);
    };

    const handleMateriasNoPendientesChange = (materias) => {
        //setMateriasSeleccionadas(materias);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 1, padding: 1, border: '1px solid grey', borderRadius: 2 }}>
            {condicion === "CANT_APROBADAS" && (
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Condición</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Cantidad</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ overflow: 'hidden', textAlign: 'center', justifyContent: 'center', textOverflow: 'ellipsis' }}>{condicion}</Typography>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField type="number" variant="outlined" />
                        </Box>
                    </Box>
                </Box>
            )}
            {condicion === "EN_CARRERA" && (
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 1 }}>
                        <Box sx={{ width: '15%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Condición</Typography>
                        </Box>
                        <Box sx={{ width: '60%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">{condicion === "EN_CARRERA" ? "Carreras" : "Materias"}</Typography>
                        </Box>
                        <Box sx={{ width: '10%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Cantidad</Typography>
                        </Box>
                        <Box sx={{ width: '10%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Va en carrera</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 1 }}>
                        <Box sx={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{condicion}</Typography>
                        </Box>
                        <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <SelectMultipleAR options={listaCarreras} onSelect={carrerasseleccionadas} placeholder='Seleccione Carreras'></SelectMultipleAR>
                        </Box>
                        <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField type="number" variant="outlined" sx={{ width: '100%' }} disabled={deshabilitarCampoNumerico} />
                        </Box>
                        <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Checkbox onChange={(event) => { handleCheckbox(event.target.checked) }} />
                        </Box>
                    </Box>
                </Box>
            )}
            {(condicion === "MATERIAS_PENDIENTES" || condicion === "MATERIAS_NO_PENDIENTES") && (

                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 1 }}>
                        <Box sx={{ width: '25%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Condición</Typography>
                        </Box>
                        <Box sx={{ width: '60%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Materias</Typography>
                        </Box>
                        <Box sx={{ width: '10%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Cantidad</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 1 }}>
                        <Box sx={{ width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{condicion}</Typography>
                        </Box>
                        <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <SelectMultipleAR options={listaMateriasParaSelect} onSelect={handleMateriasPendientesChange} placeholder='Seleccione Materias'></SelectMultipleAR>
                        </Box>
                        <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField type="number" variant="outlined" sx={{ width: '100%' }} disabled={deshabilitarCampoNumerico} />
                        </Box>
                    </Box>
                </Box>
            )}
            {/*condicion === "MATERIAS_NO_PENDIENTES" && (*/}

            {/*    <Box>*/}
            {/*        <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 1 }}>*/}
            {/*            <Box sx={{ width: '25%', textAlign: 'center' }}>*/}
            {/*                <Typography sx={{ fontWeight: 'bold' }} variant="body2">Condición</Typography>*/}
            {/*            </Box>*/}
            {/*            <Box sx={{ width: '60%', textAlign: 'center' }}>*/}
            {/*                <Typography sx={{ fontWeight: 'bold' }} variant="body2">Materias</Typography>*/}
            {/*            </Box>*/}
            {/*            <Box sx={{ width: '10%', textAlign: 'center' }}>*/}
            {/*                <Typography sx={{ fontWeight: 'bold' }} variant="body2">Cantidad</Typography>*/}
            {/*            </Box>*/}
            {/*        </Box>*/}
            {/*        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 1 }}>*/}
            {/*            <Box sx={{ width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>*/}
            {/*                <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{condicion}</Typography>*/}
            {/*            </Box>*/}
            {/*                    <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>*/}
            {/*                        <SelectMultipleAR options={listaMateriasParaSelect} onSelect={handleMateriasNoPendientesChange} placeholder='Seleccione Materias'></SelectMultipleAR>*/}
            {/*            </Box>*/}
            {/*            <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>*/}
            {/*                <TextField type="number" variant="outlined" sx={{ width: '100%' }} disabled={deshabilitarCampoNumerico} />*/}
            {/*            </Box>*/}
            {/*        </Box>*/}
            {/*    </Box>*/}
            {/*)}*/}
        </Box>
    );
};

//TarjetaCondicion.propTypes = {
//    condicion: PropTypes.string.isRequired,
//    listaCarreras: PropTypes.array.isRequired,
//    listaMaterias: PropTypes.array.isRequired,  
//    onCheckboxChange: PropTypes.func.isRequired,
//    deshabilitarCampoNumerico: PropTypes.bool.isRequired,
//};

export default TarjetaCondicion;
