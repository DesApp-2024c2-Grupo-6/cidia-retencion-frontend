//MUI
import { Box, Autocomplete, TextField, Modal, Typography, Select, MenuItem, FormControl, InputLabel, Stack, Divider, Button,FormGroup,FormControlLabel,Switch } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import { Row } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
//Recharts
import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//Services
import { getPeriodos } from '../../services/periodosLectivosService'
import { getCurso, getAsistenciasDeCurso, getCursosPorMateriaYPeriodo } from '../../services/cursosService'
import { getAllCareerGuaraniConPlanes } from '../../services/CareerService';
import { getAllSubjectsByCareer } from '../../services/SubjectDataService'
function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}

const comisionHolder = {
    inscriptos_semanales: [
        { name: 'Semana 1', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 2', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 3', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 4', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 5', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 6', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 7', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 8', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 9', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 10', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 11', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 12', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 13', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 14', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 15', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
        { name: 'Semana 16', porcentajeAlumnos: 0, cantidadAlumnos: 0 },
    ],

}


const SeleccionCursada = (props) => {
    const [materiaActual, setMateriaActual] = useState(0)
    const [periodoActual, setPeriodoActual] = useState({ periodoId: 0 })
    const [cambioCarrera,setCambioCarrea] = useState(false)
    const theme = useTheme();
    const { handleDataComision,handleComision, listaPeriodos, listaCarreras, listaMaterias, handleCarrera, handleComisiones, carreraActual, cargando, setCargando } = props
    const buscarComisiones = async () => {
        handleComisiones([])
        handleComision(comisionHolder)
        setCargando(true)
        const comisiones = await getCursosPorMateriaYPeriodo(materiaActual, periodoActual.periodoId)
        await timeout(700)
        if (comisiones.data) {
            handleComisiones(comisiones.data.cursos)
            const dataComisiones =[{name: 'Semana 1'},{name: 'Semana 2'},{name: 'Semana 3'},{name: 'Semana 4'},{name: 'Semana 5'},{name: 'Semana 6'},{name: 'Semana 7'},{name: 'Semana 8'},{name: 'Semana 9'},{name: 'Semana 10'},{name: 'Semana 11'},{name: 'Semana 12'},{name: 'Semana 13'},{name: 'Semana 14'},{name: 'Semana 15'},{name: 'Semana 16'}]
            comisiones.data.cursos.forEach(curso =>{
                if(curso.inscriptos_semanales.length > 0){
                    dataComisiones.forEach(semana=>{
                        semana[curso.nombre_curso] = curso.inscriptos_semanales[dataComisiones.indexOf(semana)].porcentajeAlumnos
                    })
                }
                
            })
            handleDataComision(dataComisiones)
        }
        else {
            handleComisiones([])
        }
        setCargando(false)
    }

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                justifyContent: "space-between",
                alignItems: "stretch",
                marginBottom: 2,
                width:"85%"
            }}>
            <Stack id="smar" sx={{ width: "30%" }} spacing={3}>
                <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    disablePortal
                    disableClearable
                    sx={{ width: '100%' }}
                    options={listaPeriodos}
                    className={'selectPeriodoLectivo'}
                    onChange={(event, newValue) => { setPeriodoActual(newValue.value) }}
                    renderInput={(params) => <TextField {...params} label="Periodo" sx={{ height: '55px' }} />}
                />
            </Stack>
            <Stack id="smar" sx={{ width: "30%" }} spacing={3}>
                <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    disablePortal
                    disableClearable
                    options={listaCarreras}
                    className={'selectCarrera'}
                    onChange={(event, newValue) => { setCambioCarrea(!cambioCarrera); handleCarrera(newValue.value) }}
                    renderInput={(params) => <TextField {...params} label="Carrera" sx={{ height: '55px' }} />}
                />
            </Stack>
            <Stack id="smar" sx={{ width: "30%" }} spacing={3}>
                <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    disablePortal
                    key={cambioCarrera}
                    disableClearable
                    disabled={carreraActual === 0}
                    options={listaMaterias}
                    className={'selectMateria'}
                    onChange={(event, newValue) => { setMateriaActual(newValue.value) }}
                    renderInput={(params) => <TextField {...params} label="Materia" sx={{ height: '55px' }} />}
                />
            </Stack>

            <Button
                sx={{
                    width: '15%',
                    
                    display: "flex", justifyContent: "center", alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    color: "white"
                }}
                variant="contained"
                startIcon={<SearchIcon />}
                disabled={materiaActual === 0 || periodoActual.periodoId === 0 || cargando}
                onClick={async () => {
                    buscarComisiones()
                }}
            >Buscar
            </Button>
        </Stack>
    )
}


const ListadoComisiones = (props) => {
    const theme = useTheme();
    const { listaComisiones, cargando, setComisionActual } = props
    return (
        <Box sx={{
            width: '85%'
        }}>
            <Box
                sx={{
                    display: 'flex',
                    gap: '8px',
                    backgroundColor: theme.palette.success.main,
                    padding: '8px',
                }}
            >
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Comisión</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}></Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Inscriptos</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 1</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 2</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 3</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 4</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 5</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 6</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 7</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 8</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 9</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 10</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 11</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 12</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 13</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 14</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 15</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 16</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Gráfico</Typography>
            </Box>

            {cargando &&
                <Box
                    sx={{
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        backgroundColor: "ffffff",
                        padding: '8px',
                    }}>
                    <CircularProgress />
                </Box>}

            {!cargando && listaComisiones.length == 0 && <Box sx={{ display: 'flex' }} ><Typography sx={{ flex: 1, textAlign: 'center', color: '#777777', alignContent: 'center', padding: 5 }}>No se encontraron comisiones</Typography></Box>}
            {
            
                listaComisiones.map(com => {
                if (com.inscriptos_semanales.length > 0)
                    return <Comision comision={com} handleGrafica={setComisionActual}></Comision>
            }
            )}

        </Box>
    )

}
const Comision = ({ comision, handleGrafica }) => {
    return (
        <Box
            sx={{
                padding: "8px",
                gap: '8px',
                display: 'flex',
                '&:nth-of-type(odd)': {
                    backgroundColor: '#f9f9f9',
                },
                '&:nth-of-type(even)': {
                    backgroundColor: '#ffffff'
                },
            }}
        >

            <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '12px', alignContent: 'center' }}>{comision.nombre_curso}</Typography>
            <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '12px', alignContent: 'center' }}></Typography>
            <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '12px', alignContent: 'center' }}>{comision.cantidad_inscriptos}</Typography>
            {comision.inscriptos_semanales.map(s => {
                const porcentaje = s.porcentajeAlumnos
                let colorFondo = "#e5fae2"
                if(porcentaje < 75 && porcentaje >= 50){
                    colorFondo = "#f7fcd2"
                }
                else if(porcentaje < 50){
                    colorFondo ="#ffeeee"
                }
                return <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '12px', alignContent: 'center', backgroundColor:colorFondo }}>{s.cantidadAlumnos}</Typography>
            })}
            <Button sx={{ maxWidth: '2%'}} variant="outlined" onClick={() => handleGrafica(comision)}><SsidChartIcon /></Button>

        </Box>

    )
}
const DatosMateria = (props) => {
    const { comision } = props
    const theme = useTheme();
    return (
        <Stack
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={0}
            sx={{
                width: '450px',
                minWidth: '300px',
                display: 'flex',
                margin: 'auto',
                justifyContent: 'space-between',
                border: 'solid',
                borderWidth: '1px',
                borderColor: '#dedede',
                verticalAlign: 'center'
            }}>
            <Stack direction="row" spacing={0} sx={{ justifyContent: "space-between", alignItems: "center", padding: 1 }}>
                <Typography>Inscriptos totales: </Typography>
                <Typography sx={{ color: theme.palette.success.light, fontWeight: 500 }}>{comision.cantidad_inscriptos}</Typography>
            </Stack>
            <Stack direction="row" spacing={0} sx={{ justifyContent: "space-between", alignItems: "center", padding: 1 }}>
                <Typography>Materia: </Typography>
                <Typography sx={{ color: theme.palette.success.light, fontWeight: 500 }}>{comision.nombre_materia}</Typography>
            </Stack>
            <Stack direction="row" spacing={0} sx={{ justifyContent: "space-between", alignItems: "center", padding: 1 }}>
                <Typography>Comisión: </Typography>
                <Typography sx={{ color: theme.palette.success.light, fontWeight: 500 }}>{comision.nombre_curso}</Typography>
            </Stack>
        </Stack>
    )
}

const Grafico = (props) => {
    const { setMostrarGraficoComision,mostrarGraficoComision,datosComision,datosComisiones,comisiones } = props

    const handleChangeSwitch = (event) => {
        setMostrarGraficoComision(event.target.checked);
      };
    return (
        <ResponsiveContainer width="100%" height="100%">

        <FormControlLabel
          value="start"
          checked={mostrarGraficoComision}
          control={<Switch color="primary" />}
          label="Comparativa Comisiones"
          disabled={comisiones.length == 0}
          labelPlacement="start"
          onChange={handleChangeSwitch}
        />
            {!mostrarGraficoComision &&
                <LineChart
                    width={500}
                    height={300}
                    data={datosComision}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cantidadAlumnos" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="porcentajeAlumnos" stroke="#82ca9d" />
                </LineChart>
            }
            {mostrarGraficoComision &&
            <LineChart
                width={500}
                height={300}
                data={datosComisiones}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                padding={{

                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {comisiones.map(c=>{
                    return <Line type="monotone" dataKey={c.nombre_curso} stroke={"#" + Math.floor(Math.random()*230*230*230).toString(16)} activeDot={{ r: 8 }} />
                })}
            </LineChart>
            }
            
        </ResponsiveContainer>     
    )
}


export default function AsistenciaCursadas() {
    const [periodosLectivos, setPeriodosLectivos] = useState([])
    const [carreras, setCarreras] = useState([])
    const [materias, setMaterias] = useState([])
    const [carreraActual, setCarreraActual] = useState(0)
    const [comisiones, setComisiones] = useState([])
    const [dataComisiones,setDataComisiones] = useState([])
    const [comisionActual, setComisionActual] = useState([comisionHolder])
    const [cargando, setCargando] = useState(false)
    const [mostrarGraficoComision,setMostrarGraficoComision] = useState(false)

    const handleComisionActual = (comision)=>{
        setComisionActual(comision)
        setMostrarGraficoComision(false)
    }
    useEffect(() => {
        const obtenerPeriodosLectivos = async () => {
            const periodos = await getPeriodos()
            const periodosFiltrados = periodos.data.filter(p => p.esCuatrimestre)
            const periodosFormato = periodosFiltrados.map(
                p => ({
                    label: p.nombre,
                    value: {
                        anio: p.anio,
                        cuatrimestre: p.cuatrimestre,
                        esAnual: p.esAnual,
                        fechaFin: p.fechaFin,
                        fechaInicio: p.fechaInicio,
                        nombre: p.nombre,
                        periodoId: p.periodoId
                    }
                })
            )
            setPeriodosLectivos(periodosFormato.reverse())
        }
        obtenerPeriodosLectivos()
    }, [])
    useEffect(() => {
        const obtenerCarrerasGuarani = async () => {
            const carrerasSiu = await getAllCareerGuaraniConPlanes()
            const listaCarreras = carrerasSiu.data.map(c => ({
                label: c.nombre,
                value: c.id
            }))
            listaCarreras.sort((a, b) => a.label.localeCompare(b.label))
            setCarreras(listaCarreras)
        }
        obtenerCarrerasGuarani()

    }, [])
    useEffect(() => {
        const obtenerMateriasCarrera = async () => {
            const listaMateriasCarrera = await getAllSubjectsByCareer(carreraActual)
            if (listaMateriasCarrera.data != "") {
                const materiasFiltradas = listaMateriasCarrera.data.filter(materia => !materia.esUnahur)
                const materias = materiasFiltradas.map(m => ({
                    label: m.nombre,
                    value: m.id
                })
                )
                materias.sort((a, b) => a.label.localeCompare(b.label))
                setMaterias(materias)
            }
            else {
                setMaterias([])
            }

        }
        obtenerMateriasCarrera()
    }, [carreraActual])


    return (
        <Box
            sx={{
                minWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",

            }}
            gap={2}
        >
            <Typography sx={{ textAlign: 'center', marginBottom: '30px', marginTop: '30px', fontWeight: '500' }} variant="h5" component="h1" gutterBottom>
                Asistencia a cursadas
            </Typography>
            <SeleccionCursada handleDataComision = {setDataComisiones} handleComision={setComisionActual} cargando={cargando} setCargando={setCargando} listaPeriodos={periodosLectivos} listaCarreras={carreras} listaMaterias={materias} carreraActual={carreraActual} handleCarrera={setCarreraActual} handleComisiones={setComisiones} />
            {<ListadoComisiones listaComisiones={comisiones} cargando={cargando} setComisionActual={handleComisionActual} />}

            <Box sx={{ width: '90%', margin: 'auto', marginTop: '40px' }}>
                <Box sx={{ marginBottom: 3 }}>
                <Typography sx={{ textAlign: 'center', marginBottom: '30px', marginTop: '30px', fontWeight: '500' }} variant="h5" component="h1" gutterBottom>
                Gráfico comparativo
            </Typography>
                    <DatosMateria comision={comisionActual} />
                </Box>
                <Box sx={{ width: '99%', paddingRight: '1%', height: '20rem', marginBottom: 5, marginTop:'40px' }}>
                    <Grafico mostrarGraficoComision={mostrarGraficoComision} setMostrarGraficoComision={setMostrarGraficoComision} datosComision={comisionActual.inscriptos_semanales} comisiones={comisiones} datosComisiones={dataComisiones}/>
                </Box>

            </Box>
        </Box>

    )
}