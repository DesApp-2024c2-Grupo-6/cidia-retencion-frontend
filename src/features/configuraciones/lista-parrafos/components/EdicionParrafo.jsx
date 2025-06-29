import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Autocomplete, Typography, Checkbox } from '@mui/material';
import Stack from '@mui/material/Stack';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SaveIcon from '@mui/icons-material/Save';
import { getAllCareer } from '@services/CareerService';
import { getAllSubjectData } from '@services/SubjectDataService';

//Context
import { useAlert } from '@context/AlertProvider';



const FormEnCarrera = ({ condicionData, carrerasData, handleConfiguracionCondicionChange, handleCarrerasElegidasChange, checkBoxDeshabilitado }) => {

    const CODIGO = "EN_CARRERA";
    const [configuracion, setConfiguracion] = useState(condicionData.config_condicion)
    //config_condicion = {en_carrera: "incluye", id_carreras:[]}

    const handleCarrerasEnCarreraChange = (listaIdCarreras) => {
        console.log(listaIdCarreras)
        const nuevaConfiguracion = { ...configuracion, id_carreras: listaIdCarreras }
        handleCarrerasElegidasChange(listaIdCarreras)
        setConfiguracion(nuevaConfiguracion)
        handleConfiguracionCondicionChange(CODIGO, nuevaConfiguracion)
    }

    const handleVaEnCarreraChange = () => {
        const vaEnCarrera = (configuracion.en_carrera == "incluye") ? "excluye" : "incluye"
        const nuevaConfiguracion = { ...configuracion, en_carrera: vaEnCarrera }
        setConfiguracion(nuevaConfiguracion)
        handleConfiguracionCondicionChange(CODIGO, nuevaConfiguracion)
    }

    const carrerasSeleccionadas = carrerasData.filter(carrera => configuracion.id_carreras.includes(carrera.value))

    return (
        <Box sx={{
            display: 'flex',backgroundColor: 'white', flexDirection: 'column', gap: 1, marginBottom: 2, padding: 1, border: '1px solid lightgray', borderRadius: 2, '&:hover': {
                borderColor: 'black',
            },
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 1 }}>
                <Box sx={{ width: '20%', textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="body2">Condición</Typography>
                </Box>
                <Box sx={{ width: '60%', textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="body2">Carreras</Typography>
                </Box>
                <Box sx={{ width: '10%', textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="body2">Va en carrera</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 1 }}>
                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{CODIGO}</Typography>
                </Box>
                <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Autocomplete
                        sx={{ width: '100%',backgroundColor: 'white' }}
                        value={carrerasSeleccionadas}
                        multiple
                        options={carrerasData}
                        getOptionKey={op => op.value}
                        onChange={(event, values) => handleCarrerasEnCarreraChange(values.map(v => v.value))}
                        isOptionEqualToValue={(op1, op2) => op1.value === op2.value}
                        disablePortal
                        disableClearable
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
                <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Checkbox disabled={checkBoxDeshabilitado} checked={configuracion.en_carrera == "incluye"} onClick={handleVaEnCarreraChange} />
                </Box>
            </Box>
        </Box>
    )
}

const FormCantAprobadas = ({ condicionData, handleConfiguracionCondicionChange }) => {

    const CODIGO = "CANT_APROBADAS"
    const [configuracion, setConfiguracion] = useState(condicionData.config_condicion)
    //configuracion = {cantidad: 0}

    const handleCantidadChange = (e) => {
        const nuevaConfiguracion = { ...configuracion, cantidad: e.target.value }
        setConfiguracion(nuevaConfiguracion)
        handleConfiguracionCondicionChange(CODIGO, nuevaConfiguracion)
    }

    return (
        <Box sx={{
            display: 'flex',backgroundColor: 'white', flexDirection: 'column', gap: 1, marginBottom: 2, padding: 1, border: '1px solid lightgray', borderRadius: 2, '&:hover': {
                borderColor: 'black',
            },
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Condición</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Cantidad</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ overflow: 'hidden', textAlign: 'center', justifyContent: 'center', textOverflow: 'ellipsis' }}>{CODIGO}</Typography>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField sx={{backgroundColor: 'white'}} type="number" value={configuracion.cantidad} variant="outlined" onChange={handleCantidadChange} />
                </Box>
            </Box>
        </Box>
    )
}

const FormMateriasPendientes = ({ condicionData, materiasData, handleConfiguracionCondicionChange }) => {

    const CODIGO = condicionData.codigo_condicion
    const [configuracion, setConfiguracion] = useState(condicionData.config_condicion)
    //config_condicion = {id_materias:[], cantidad:0}

    const handleCantidadChange = (e) => {
        const nuevaConfiguracion = { ...configuracion, cantidad: e.target.value }
        setConfiguracion(nuevaConfiguracion)
        handleConfiguracionCondicionChange(CODIGO, nuevaConfiguracion)
    }

    const handleMateriasPendientesChange = (listadoIdMaterias) => {
        const nuevaConfiguracion = { ...configuracion, id_materias: listadoIdMaterias }
        setConfiguracion(nuevaConfiguracion)
        handleConfiguracionCondicionChange(CODIGO, nuevaConfiguracion)
    }


    const materiasSeleccionadas = materiasData.filter(materia => configuracion.id_materias.includes(materia.value))

    /*
    useEffect(()=>{ 
        const idMateriaPosibles = materiasData.map(materia => materia.value)
        const idMateriaFiltrados = configuracion.id_materias.filter(id_materia => idMateriaPosibles.includes(id_materia))
        const nuevaConfiguracion = { ...configuracion, id_materias: idMateriaFiltrados }
        setConfiguracion(nuevaConfiguracion)
        handleConfiguracionCondicionChange(CODIGO, nuevaConfiguracion)
    }, [materiasData])
    */

    return (
        <Box sx={{
            display: 'flex', backgroundColor: 'white', flexDirection: 'column', gap: 1, marginBottom: 2, padding: 1, border: '1px solid lightgray', borderRadius: 2, '&:hover': {
                borderColor: 'black',
            },
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 1 }}>
                <Box sx={{ width: '20%', textAlign: 'center' }}>
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
                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{CODIGO}</Typography>
                </Box>
                <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Autocomplete
                        sx={{ width: '100%',backgroundColor: 'white' }}
                        value={materiasSeleccionadas}
                        multiple
                        options={materiasData}
                        getOptionKey={op => op.value}
                        onChange={(event, values) => handleMateriasPendientesChange(values.map(v => v.value))}
                        isOptionEqualToValue={(op1, op2) => op1.value === op2.value}
                        disablePortal
                        disableClearable
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
                <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField type="number" value={configuracion.cantidad} variant="outlined" onChange={handleCantidadChange} sx={{ width: '100%',backgroundColor: 'white' }} />
                </Box>
            </Box>
        </Box>
    )
}


const EdicionParrafo = ({ parrafoData, editarParrafo, handleCancelar }) => {

    const KEY_ANTERIOR = parrafoData.key

    const {showAlert} = useAlert()

    const [parrafo, setParrafo] = useState(parrafoData)

    const [carreras, setCarreras] = useState([])

    const [materias, setMaterias] = useState([])

    const vaEnCarreraEstaSeleccionado = () => {
        const condicion = parrafo.conditions.find(condicion => condicion.codigo_condicion == "EN_CARRERA")
        if (condicion != null)
            return condicion.config_condicion.en_carrera == "incluye"
        else
            return false;
    }

    const condicionPorCodigo = (codigoABuscar) => parrafo.conditions.find(condicion => condicion.codigo_condicion == codigoABuscar)

    //Carreras que se usaran para filtrar las materias que pueden ser seleccionadas en MATERIAS_PENDIENTES / MATERIAS_NO_PENDIENTES

    const [carrerasElegidas, setCarrerasElegidas] = useState([])

    const [materiasPosibles, setMateriasPosibles] = useState(materias)

    const codigosCondicionSeleccionados = parrafo.conditions.map(condicion => condicion.codigo_condicion)

    const handleKeyChange = (e) => setParrafo({ ...parrafo, key: e.target.value })

    const handleTextChange = (e) => setParrafo({ ...parrafo, text: (e.target.value.split('\n')) });  // Actualiza el texto como un array

    const handleCondicionesChange = (event, listaCodigosSeleccionados) => {
        /*
            Manejar el cambio de estado de las condiciones seleccionadas
            Parametros:
                -listaCodigosSeleccionados: Lista con los codigos de las condiciones seleccionadas en el Select
        */

        //Campos especificos de configuracion de cada condicion por codigo

        if (!listaCodigosSeleccionados.includes("EN_CARRERA")) {
            console.log("no esta")
            const condicionesFiltradas = listaCodigosSeleccionados.filter(codigo => codigo != "MATERIAS_PENDIENTES" || codigo != "MATERIAS_NO_PENDIENTES")
            console.log(condicionesFiltradas)
        }

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
            const condicionYaCargada = parrafo.conditions.find(condicion => condicion.codigo_condicion == codigo)
            if (!condicionYaCargada) {
                const nuevaCondicion = {
                    codigo_condicion: codigo,
                    config_condicion: (camposConfigCondicionPorCodigo[codigo] || {})
                }
                return nuevaCondicion
            }
            return condicionYaCargada
        });
        setParrafo({ ...parrafo, conditions: condicionesPorAgregar })
    };

    const handleConfiguracionCondicionChange = (codigo, nuevaConfig) => {
        const nuevaCondicion = { codigo_condicion: codigo, config_condicion: nuevaConfig }
        const nuevasCondiciones = parrafo.conditions.map(condicion => condicion.codigo_condicion == codigo ? nuevaCondicion : condicion)
        setParrafo({ ...parrafo, conditions: nuevasCondiciones })
    }

    const handleCarrerasElegidasChange = (listaIdCarreras) => {
        setCarrerasElegidas(listaIdCarreras)
        const materiasPosibles = materias.filter(materia => listaIdCarreras.includes(materia.id_carrera))
        setMateriasPosibles(materiasPosibles)
    }

    useEffect(() => {
        const obtenerCarreras = async () => {
            const res = await getAllCareer()
            const carreras = res.data.allCareers.filter(carrera => carrera != undefined)
            const carrerasOrdenadas = carreras.sort((a, b) => a.careerName.localeCompare(b.careerName))
            const carrerasFormateadas = carrerasOrdenadas.map(carrera => ({ value: carrera.careerId, label: carrera.careerName }))
            const carrerasFormateadasSinRepetidos = Array.from(new Set(carrerasFormateadas.map(JSON.stringify))).map(JSON.parse)
            setCarreras(carrerasFormateadasSinRepetidos)
        }
        obtenerCarreras()
    }, [])

    useEffect(() => {
        const obtenerMaterias = async () => {
            const res = await getAllSubjectData()
            const materiasOrdenadas = res.data.allSubjects.sort((a, b) => a.subjectName.localeCompare(b.subjectName))
            const materiasFormateadas = materiasOrdenadas.map(materia => ({ value: materia.id_materia, label: materia.subjectName, id_carrera: materia.id_carrera }))
            const materiasFormateadasSinRepetidos = Array.from(new Set(materiasFormateadas.map(JSON.stringify))).map(JSON.parse)
            setMaterias(materiasFormateadasSinRepetidos)
        }
        obtenerMaterias()
    }, [])


    useEffect(() => {
        const carrerasElegidas = (vaEnCarreraEstaSeleccionado()) ? condicionPorCodigo("EN_CARRERA").config_condicion.id_carreras : []
        const materiasPosibles = materias.filter(materia => carrerasElegidas.includes(materia.id_carrera))
        setCarrerasElegidas(carrerasElegidas)
        setMateriasPosibles(materiasPosibles)
    }, [parrafo.conditions, materias, carreras])

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

    const getCodigosDeshabilitados = (option) => {
        /*
            Dado un codigo, retorna si el codigo debe estar habilitado o deshabilitado segun los codigos ya elegidos
            Parametros:
                -option - String - codigo de la condicion
            Retorna: Boolean
        */
        const enCarreraEstaSeleccionado = codigosCondicionSeleccionados.includes("EN_CARRERA")
        let esIncompatible = codigosCondicionSeleccionados.some(codigo => (incompatibilidadCodigosCondiciones[codigo]).includes(option))

        if (!enCarreraEstaSeleccionado && (option === 'MATERIAS_PENDIENTES' || option === 'MATERIAS_NO_PENDIENTES'))
            esIncompatible = true

        if ((option === 'MATERIAS_PENDIENTES' || option === 'MATERIAS_NO_PENDIENTES')) {
            esIncompatible = esIncompatible && !vaEnCarreraEstaSeleccionado()
        }

        return esIncompatible
    };

    const validarParrafo = () => {
        const parrafoValidado = structuredClone(parrafo)
        const condicionesElegidas = parrafoValidado.conditions.map(condicion => condicion.codigo_condicion)
        const idsPosibles = materiasPosibles.map(materia => materia.value)
        if(condicionesElegidas.includes("MATERIAS_PENDIENTES")){
            const condicionMP = parrafoValidado.conditions.find(condicion => condicion.codigo_condicion == "MATERIAS_PENDIENTES")
            condicionMP.config_condicion.id_materias = condicionMP.config_condicion.id_materias.filter(id => idsPosibles.includes(id))
        }
        if(condicionesElegidas.includes("MATERIAS_NO_PENDIENTES")){
            const condicionMNP = parrafoValidado.conditions.find(condicion => condicion.codigo_condicion == "MATERIAS_NO_PENDIENTES")
            condicionMNP.config_condicion.id_materias = condicionMNP.config_condicion.id_materias.filter(id => idsPosibles.includes(id))
        }
        editarParrafo({ ...parrafoValidado, keyanterior: KEY_ANTERIOR })
    }

    return (
        <Box
            component="form"
            onSubmit={() => validarParrafo()}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: '1000px',
                width: '100%',
                margin: '20px 0 auto',
            }}
        >
            <TextField label="Clave" sx={{ backgroundColor: 'white' }} value={parrafo.key} onChange={handleKeyChange} variant="outlined" fullWidth />
            <TextField label="Texto" sx={{ backgroundColor: 'white' }} value={parrafo.text.join('\n')} onChange={handleTextChange} variant="outlined" fullWidth multiline rows={4} />
            <Stack id='smar'>
                <Autocomplete
                    multiple
                    id="condiciones-select"
                    options={["SIEMPRE", "NUNCA", "EN_CARRERA", "MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES", "MATERIAS_COMUNES", "CANT_APROBADAS", "FINALES_PENDIENTES", "LIMITE_FINALES_PENDIENTES", "ORIENTACION"]}
                    value={codigosCondicionSeleccionados}
                    onChange={handleCondicionesChange}
                    renderInput={(params) => <TextField {...params} label="Condiciones" variant="outlined" placeholder="Selecciona condiciones" />}
                    sx={{ mt: 2, backgroundColor: 'white' }}
                    getOptionDisabled={getCodigosDeshabilitados}
                />
                <Box sx={{ mt: 2, width: '100%' }}>
                    {parrafo.conditions.map(condicionSeleccionada =>
                        (condicionSeleccionada.codigo_condicion == "EN_CARRERA")
                            ? <FormEnCarrera
                                key={condicionSeleccionada.codigo_condicion}
                                condicionData={condicionSeleccionada}
                                handleConfiguracionCondicionChange={handleConfiguracionCondicionChange}
                                handleCarrerasElegidasChange={handleCarrerasElegidasChange}
                                carrerasData={carreras}
                                checkBoxDeshabilitado={codigosCondicionSeleccionados.includes("MATERIAS_PENDIENTES") || codigosCondicionSeleccionados.includes("MATERIAS_NO_PENDIENTES")}
                            />
                            : (condicionSeleccionada.codigo_condicion == "CANT_APROBADAS")
                                ? <FormCantAprobadas
                                    key={condicionSeleccionada.codigo_condicion}
                                    condicionData={condicionSeleccionada}
                                    handleConfiguracionCondicionChange={handleConfiguracionCondicionChange}
                                />
                                : (condicionSeleccionada.codigo_condicion == "MATERIAS_PENDIENTES" || condicionSeleccionada.codigo_condicion == "MATERIAS_NO_PENDIENTES")
                                    ? <FormMateriasPendientes
                                        key={condicionSeleccionada.codigo_condicion}
                                        condicionData={condicionSeleccionada}
                                        handleConfiguracionCondicionChange={handleConfiguracionCondicionChange}
                                        materiasData={materiasPosibles}
                                    />
                                    : <span key={condicionSeleccionada.codigo_condicion} />
                    )
                    }
                </Box>
            </Stack>
            <Box display="flex" justifyContent="space-evenly">
                <Button variant="contained" color="primary" onClick={handleCancelar} startIcon={<ArrowCircleLeftIcon />}>Volver</Button>
                <Button disabled={parrafo.key == "" || parrafo.text == "" || parrafo.conditions.length == 0} type="submit" variant="contained" startIcon={<SaveIcon />} color="secondary">Guardar</Button>
            </Box>
        </Box>
    );
};

export default EdicionParrafo;