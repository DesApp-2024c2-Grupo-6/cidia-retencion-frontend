import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import TarjetaCondicion from './TarjetaCondicion';
import Stack from '@mui/material/Stack';
import '../styles/SelectMultipleAR.css';
import { useNavigate } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SaveIcon from '@mui/icons-material/Save';
import { cond, unset } from 'lodash';
import { getAllCareer } from '../services/CareerService';
import { getAllSubjectData } from '../services/SubjectDataService';



const EdicionParrafo = ({ initialClave, initialTexto, onSave, onCancel, condiciones, setCantidadAprobadas, setIdsCarrerasEC, setIncluyeEC,
    setIdsMateriasMP, setCantidadAprobadasMP, setIdsMateriasMNP, setCantidadAprobadasMNP, carrerasSeleccionadas
}) => { //Cris

    //DATOS DEL PARRAFO
    const [clave, setClave] = useState(initialClave);
    const [texto, setTexto] = useState(Array.isArray(initialTexto) ? initialTexto : [initialTexto]);
    const [condicionesSeleccionadas, setCondicionesSeleccionadas] = useState((condiciones) ? condiciones : []); //Cris parametro

    //FUNCIONES DE UTILIDAD
    const vaEnCarreraEstaSeleccionado = (listaCondiciones) => {
        /*
            Dada una lista de condiciones, retorna si la condicion con codigo "EN_CARRERA" tiene la propiedad "en_carrera" en "incluye"
            Parametros:
                -listaCondiciones - Lista de objetos - Lista de condiciones en la que buscaremos
        */
        const condicion = listaCondiciones.find(condicion => condicion.codigo_condicion == "EN_CARRERA")
        if (condicion == undefined)
            return false
        else
            return (condicion.config_condicion.en_carrera == "incluye" || condicion.config_condicion.en_carrera == true)
    }


    //DATOS DE LA SECCION DE EDICION DE CONDICIONES  
    const [checkboxValues, setCheckboxValues] = useState([]);
    const [listaCarreras, setListaCarreras] = useState([]);
    const [listaMaterias, setListaMaterias] = useState([]);
    const [vaEnCarrera, setVaEnCarrera] = useState(vaEnCarreraEstaSeleccionado(condiciones))

    //DATOS UTILES PARA LA CODIFICACION
    const codigosCondicionesConInformacionAdicional = ["EN_CARRERA", "MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES", "CANT_APROBADAS"]

    const incompatibilidadCodigosCondiciones = {
        "SIEMPRE": ["SIEMPRE", "NUNCA", "EN_CARRERA", "MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES", "MATERIAS_COMUNES", "CANT_APROBADAS", "FINALES_PENDIENTES", "LIMITE_FINALES_PENDIENTES", "ORIENTACION"],
        "NUNCA": ["SIEMPRE", "NUNCA", "EN_CARRERA", "MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES", "MATERIAS_COMUNES", "CANT_APROBADAS", "FINALES_PENDIENTES", "LIMITE_FINALES_PENDIENTES", "ORIENTACION"],
        "EN_CARRERA": ["SIEMPRE", "NUNCA", "EN_CARRERA", "MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES"],
        "MATERIAS_PENDIENTES": ["SIEMPRE", "NUNCA", "MATERIAS_PENDIENTES"],
        "MATERIAS_NO_PENDIENTES": ["SIEMPRE", "NUNCA", "MATERIAS_NO_PENDIENTES"],
        "MATERIAS_COMUNES": ["SIEMPRE", "NUNCA", "MATERIAS_COMUNES"],
        "CANT_APROBADAS": ["SIEMPRE", "NUNCA", "CANT_APROBADAS"],
        "FINALES_PENDIENTES": ["SIEMPRE", "NUNCA", "FINALES_PENDIENTES"],
        "LIMITE_FINALES_PENDIENTES": ["SIEMPRE", "NUNCA", "LIMITE_FINALES_PENDIENTES"],
        "ORIENTACION": ["SIEMPRE", "NUNCA", "ORIENTACION"]
    }

    useEffect(() => {
        const obtenerCarreras = async () => {
            const carreras = await getAllCareer()
            const listaFiltrada = carreras.data.allCareers.filter(carrera => carrera.careerId != undefined)
            const listaMapeada = listaFiltrada.map(c => ({
                label: `${c.careerName}`,
                value: c.careerId
            }));
            setListaCarreras(listaMapeada);
        }
        obtenerCarreras()
    }, [])

    
    useEffect(() => {
        const obtenerMaterias = async () => {
            const materias = await getAllSubjectData()
            const materiasFiltradas = materias.data.allSubjects.filter(materia => carrerasSeleccionadas.includes(materia.id_carrera))
            /*
            const lista = materiasFiltradas.map(materia => ({
                label: `Materia ${materia.id_materia}`,
                value: materia.id_materia
            }));*/
            setListaMaterias(materiasFiltradas);
        }
        obtenerMaterias()
    }, [carrerasSeleccionadas])

    const handleClaveChange = (e) => setClave(e.target.value);
    const handleTextoChange = (e) => {
        const lines = e.target.value.split('\n'); // Actualiza el texto como un array
        setTexto(lines);
    };


    const handleCondicionesChange = (event, listaCodigosSeleccionados) => {
        /*
            Manejar el cambio de estado de las condiciones seleccionadas
            Parametros:
                -listaCodigosSeleccionados: Lista con los codigos de las condiciones seleccionadas en el Select
        */

        //Campos especificos de configuracion de cada condicion por codigo
        const camposConfigCondicionPorCodigo = {
            "EN_CARRERA": {
                id_carreras: [],
                en_carrera: "excluye"
            },
            "MATERIAS_PENDIENTES": {
                id_materias: [],
                cantidad: 0
            },
            "MATERIAS_NO_PENDIENTES": {
                id_materias: [],
                cantidad: 0
            },
            "CANT_APROBADAS": {
                cantidad: 0
            },
            "DEFAULT": {}
        }

        const condicionesPorAgregar = listaCodigosSeleccionados.map(codigo => {
            const condicionYaCargada = condicionesSeleccionadas.find(condicion => condicion.codigo_condicion == codigo)
            if (!condicionYaCargada) {
                const nuevaCondicion = {
                    codigo_condicion: codigo,
                    config_condicion: (camposConfigCondicionPorCodigo[codigo] || {})
                }
                return nuevaCondicion
            }
            return condicionYaCargada
        });
        setCondicionesSeleccionadas(condicionesPorAgregar)
        setCheckboxValues(Array(listaCodigosSeleccionados.length).fill(false));
        const isEnCarreraSelected = listaCodigosSeleccionados.includes('EN_CARRERA');
        if (isEnCarreraSelected)
            setVaEnCarrera(vaEnCarrera)
        else
            setVaEnCarrera(false)

        setCondicionesSeleccionadas(condicionesPorAgregar)
    };

    //---------------------------------- METO FUNCIONES DE TARJETA CONDICION --------------------------------------------------------------------------------------------

    const [listaCarrerasElejidas, setListaCarrerasElejidas] = useState([]);

    //LA LISTA PARA LAS MATERIAS
    const [listaMateriasParaSelect, setListaMateriasParaSelect] = useState([]);

    useEffect(() => {

        if (listaCarrerasElejidas.length > 0) {
            //console.log(listaCarrerasElejidas)
            const materiasFiltradas = listaMaterias.filter(materia =>
                listaCarrerasElejidas.includes(materia.id_carrera)
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
            //console.log(listaMateriasParaSelect)

        } else {
            setListaMateriasParaSelect([]);
            //console.log("asd")
        }


    }, [listaCarrerasElejidas, listaMaterias]);

    //PARA CARGAR LA LISTA DE CARRERAS ELEGIDAS
    const setIdsYListaCarrerasElegidas = (carreras) => {
        setListaCarrerasElejidas(carreras);
        setIdsCarrerasEC(carreras);
    };




    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------


    const handleSave = (e) => {
        e.preventDefault();
        onSave(clave, texto, condicionesSeleccionadas);
    };

    const handleCheckboxChange = (value) => {
        setVaEnCarrera(value)
        setIncluyeEC(value);
    };


    // Función para obtener las opciones deshabilitadas
    const getOptionDisabled = (option) => {
        /*
            Dado un codigo, retorna si el codigo debe estar habilitado o deshabilitado segun los codigos ya elegidos
            Parametros:
                -option - String - codigo de la condicion
            Retorna: Boolean
        */
        const codigosSeleccionados = condicionesSeleccionadas.map(cond => cond.codigo_condicion)
        const enCarreraEstaSeleccionado = codigosSeleccionados.includes("EN_CARRERA")
        let esIncompatible = codigosSeleccionados.some(codigo => (incompatibilidadCodigosCondiciones[codigo]).includes(option))

        if (!enCarreraEstaSeleccionado && (option === 'MATERIAS_PENDIENTES' || option === 'MATERIAS_NO_PENDIENTES'))
            esIncompatible = true

        if ((option === 'MATERIAS_PENDIENTES' || option === 'MATERIAS_NO_PENDIENTES')) {
            esIncompatible = esIncompatible && !vaEnCarrera
        }

        return esIncompatible
    };

    return (
        <Box
            component="form"
            onSubmit={handleSave}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: '1000px',
                width: '100%',
                margin: '0 auto',
            }}
        >
            <TextField label="Clave" value={clave} onChange={handleClaveChange} variant="outlined" fullWidth />
            <TextField label="Texto" value={texto.join('\n')} onChange={handleTextoChange} variant="outlined" fullWidth multiline rows={4} />
            <Stack id='smar' sx={{}}>
                <Autocomplete
                    multiple
                    id="condiciones-select"
                    options={["SIEMPRE", "NUNCA", "EN_CARRERA", "MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES", "MATERIAS_COMUNES", "CANT_APROBADAS", "FINALES_PENDIENTES", "LIMITE_FINALES_PENDIENTES", "ORIENTACION"]}
                    value={condicionesSeleccionadas.map(cond => cond.codigo_condicion)}
                    onChange={handleCondicionesChange}
                    renderInput={(params) => <TextField {...params} label="Condiciones" variant="outlined" placeholder="Selecciona condiciones" />}
                    sx={{ mt: 2 }}
                    getOptionDisabled={getOptionDisabled}
                />
                <Box sx={{ mt: 2, width: '100%' }}>
                    {
                        condicionesSeleccionadas.map((objCondicion, index) => (
                            (codigosCondicionesConInformacionAdicional.includes(objCondicion.codigo_condicion))
                            &&
                            <TarjetaCondicion
                                key={index}
                                condicion={objCondicion.codigo_condicion}
                                objeto={objCondicion}
                                listaCarreras={listaCarreras}
                                listaMaterias={listaMaterias}
                                listaMateriasParaSelect={listaMateriasParaSelect}
                                handleCheckbox={handleCheckboxChange}
                                handleSelectionCareer={setIdsYListaCarrerasElegidas}
                                deshabilitarCampoNumerico={!checkboxValues[index]}
                                setCantidadAprobadas={setCantidadAprobadas}
                                setIdsMateriasMP={setIdsMateriasMP}
                                setCantidadAprobadasMP={setCantidadAprobadasMP}
                                setIdsMateriasMNP={setIdsMateriasMNP}
                                setCantidadAprobadasMNP={setCantidadAprobadasMNP}
                            />

                        ))}
                </Box>
            </Stack>
            <Box display="flex" justifyContent="space-evenly">
                <Button variant="contained" color="primary" onClick={onCancel} startIcon={<ArrowCircleLeftIcon />}>Volver</Button>
                <Button type="submit" variant="contained" startIcon={<SaveIcon />} color="secondary">Guardar</Button>
            </Box>
        </Box>
    );
};

export default EdicionParrafo;