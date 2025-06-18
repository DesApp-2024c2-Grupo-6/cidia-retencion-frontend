//MUI
import { Box, Autocomplete, TextField, Modal, Typography, Select, MenuItem, FormControl, InputLabel, Stack, Divider, Button,FormGroup,FormControlLabel,Switch } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import CircularProgress from '@mui/material/CircularProgress';
//Recharts
import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//Services
import { getPeriodos } from '@services/PeriodosService'
import { getCursosPorMateriaYPeriodo } from '@services/CursosService'
import { getAllCareerGuaraniConPlanes } from '@services/CareerService';
import { getAllSubjectsByCareer } from '@services/SubjectDataService'
//Context
import { useAlert } from '@context/AlertProvider';

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
const AsistenciaLoader = ({ text }) => {
    const theme = useTheme()
    return (
        <Box sx={{ width: '100%', textAlign: 'center', padding: 10, marginBottom: 4 }}>
            <CircularProgress sx={{ marginBottom: 5 }} size={70} />
            <Typography color={theme.palette.primary.main} fontWeight={500} variant="h6" component="h3" gutterBottom>
                {text}
            </Typography>

        </Box>
   )
}
function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

const SeleccionCursada = (props) => {
    const { showAlert } = useAlert()
    const [materiaActual, setMateriaActual] = useState(0)
    const [periodoActual, setPeriodoActual] = useState({ periodoId: 0 })
    const [cambioCarrera,setCambioCarrera] = useState(false)
    const theme = useTheme();
    const { handleDataComision,handleComision, listaPeriodos, listaCarreras, listaMaterias, handleCarrera, handleComisiones, carreraActual, cargando, setCargando, handleMensaje } = props
    const buscarComisiones = async () => {
        handleComisiones([])
        handleComision(comisionHolder)
        try{
            setCargando(true)
            
            const comisiones = await getCursosPorMateriaYPeriodo(materiaActual, periodoActual.periodoId)
            await timeout(700)

            if (comisiones.data) {

                handleMensaje("Seleccione un periodo y una materia.")
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
                showAlert('Datos de asistencia cargados con éxito', 'success')
            }
            else {
                handleComisiones([])
                showAlert('No se encontraron datos de asistencia en el periodo seleccionado', 'info')
                handleMensaje("No se encontraron comisiones.")
            }
        }
        catch{
                setRequestStatus({ ...requestStatus, error: err })
                showAlert('Error: No se pudieron generar los datos de asistencia del periodo', 'info')
        }
        finally{
            setCargando(false)
        }
        
       
    }

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                justifyContent: "space-between",
                alignItems: "stretch",
                marginBottom: 2,
                width:"75%",
                margin:'auto'
            }}>
            <Stack id="smar" sx={{ width: "30%" }} spacing={3}>
                <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    disablePortal
                    disableClearable
                    sx={{ width: '100%', backgroundColor: 'white' }}
                    options={listaPeriodos}
                    className={'selectPeriodoLectivo'}
                    onChange={(event, newValue) => { setPeriodoActual(newValue.value) }}
                    renderInput={(params) => <TextField {...params} label="Periodo" sx={{ height: '55px' }} />}
                />
            </Stack>
            <Stack id="smar" sx={{ width: "30%" ,backgroundColor: 'white' }} spacing={3}>
                <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    disablePortal
                    disableClearable
                    options={listaCarreras}
                    className={'selectCarrera'}
                    onChange={(event, newValue) => { setCambioCarrera(!cambioCarrera); handleCarrera(newValue.value) }}
                    renderInput={(params) => <TextField {...params} label="Carrera" sx={{ height: '55px' }} />}
                />
            </Stack>
            <Stack id="smar" sx={{ width: "30%", backgroundColor: 'white'  }} spacing={3}>
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
    const { listaComisiones, cargando, setComisionActual, textoMensaje } = props
    return (
        <Box sx={{
            width: '90%',
            margin:'auto',
            marginTop: 5
        }}>
            {cargando && <AsistenciaLoader text="Buscando asistencia..."></AsistenciaLoader>}
            {!cargando && listaComisiones.length != 0 &&
 
                    <Box sx={{ width: '100%', boxShadow: 3, borderRadius: 2, margin: 1,  marginBottom: 4, backgroundColor: "white" }}>
                    {/*Datos de la carrera*/}
                    <TableContainer component={Paper} sx={{ padding: 0, borderRadius: 0, borderTop: 1, borderColor: theme.palette.disabled.main, borderWidth: 1}}>
                        <Table sx={{ minWidth: 1200 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Comisión</TableCell>
                                    <TableCell align="center">Inscriptos</TableCell>
                                    {
                                        range(16,1).map(num => {return <TableCell sx={{"white-space": "nowrap"}}>{"Sem." + num}</TableCell>})
                                    }
                                    <TableCell align="center">Gráfico</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    listaComisiones.map(com => {
                                    if (com.inscriptos_semanales.length > 0)
                                        return <Comision comision={com} handleGrafica={setComisionActual}></Comision>
                                }
                                )}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>}
        {!cargando && listaComisiones.length <= 0 &&
        <>
            <Box sx={{ display: 'flex' }} ><Typography fontWeight={400} variant="h6" color="gray" textAlign="center" component="h3" gutterBottom sx={{ flex: 1, textAlign: 'center', color: '#777777', alignContent: 'center', padding: 5  }}>{textoMensaje}</Typography></Box>
        </>}
        </Box>
    )

}
const Comision = ({ comision, handleGrafica }) => {
    const theme = useTheme();

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': {}, backgroundColor: "#FFFFFF" }}>
            <TableCell align="left" sx={{borderRight: 1, borderColor: theme.palette.disabled.main}}><Typography>{comision.nombre_curso}</Typography></TableCell>
            <TableCell align="center" sx={{borderRight: 1, borderColor: theme.palette.disabled.main}}><Typography>{comision.cantidad_inscriptos}</Typography></TableCell>
            {comision.inscriptos_semanales.map(s => {
                const porcentaje = s.porcentajeAlumnos
                let colorFondo = "#e5fae2"
                if(porcentaje < 75 && porcentaje >= 50){
                    colorFondo = "#f7fcd2"
                }
                else if(porcentaje < 50){
                    colorFondo ="#ffeeee"
                }
                return <TableCell align="center" sx={{backgroundColor:colorFondo, borderRight: 1, borderColor: theme.palette.disabled.main}}><Typography>{s.cantidadAlumnos}</Typography></TableCell>
            })}
            <TableCell align="center"><Button sx={{width: 'auto'}} variant="outlined" onClick={() => handleGrafica(comision)}><SsidChartIcon /></Button></TableCell>
        </TableRow>

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
                borderColor: theme.palette.disabled.main,
                verticalAlign: 'center',
                backgroundColor: 'white' 
            }}>
            <Stack direction="row" spacing={0} sx={{ justifyContent: "space-between", alignItems: "center", padding: 2 }}>
                <Typography>Inscriptos totales: </Typography>
                <Typography sx={{ color: theme.palette.success.light, fontWeight: 500 }}>{comision.cantidad_inscriptos}</Typography>
            </Stack>
            <Stack direction="row" spacing={0} sx={{ justifyContent: "space-between", alignItems: "center", padding: 2 }}>
                <Typography>Materia: </Typography>
                <Typography sx={{ color: theme.palette.success.light, fontWeight: 500 }}>{comision.nombre_materia}</Typography>
            </Stack>
            <Stack direction="row" spacing={0} sx={{ justifyContent: "space-between", alignItems: "center", padding: 2 }}>
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
                <LineChart id="grafico1"
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
                    <Line type="monotone" dataKey="porcentajeAlumnos" name="Porcentaje de asistencia" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="cantidadAlumnos" name="Cantidad de Alumnos" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            }
            {mostrarGraficoComision &&
            <LineChart id="grafico2"
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
    const [textoMensaje,setTextoMensaje] = useState("Seleccione un periodo y una materia")

    const handleComisionActual = (comision)=>{
        setComisionActual(comision)
        setMostrarGraficoComision(false)
        document.getElementById("grafico1")?.scrollIntoView({behavior:"smooth"})
        document.getElementById("grafico2")?.scrollIntoView({behavior:"smooth"})
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
                width: '100%',
                margin: 'auto'
            }}
            gap={2}
        >
            <Typography sx={{ textAlign: 'center', marginBottom: '30px', marginTop: '60px', fontWeight: '500' }} variant="h5" component="h1" gutterBottom>
                Asistencia a cursadas
            </Typography>
            <SeleccionCursada handleDataComision = {setDataComisiones} handleComision={setComisionActual} cargando={cargando} setCargando={setCargando} listaPeriodos={periodosLectivos} listaCarreras={carreras} listaMaterias={materias} carreraActual={carreraActual} handleCarrera={setCarreraActual} handleComisiones={setComisiones} handleMensaje={setTextoMensaje} />
            {<ListadoComisiones listaComisiones={comisiones} cargando={cargando} setComisionActual={handleComisionActual} textoMensaje={textoMensaje} />}

            {!cargando && comisiones.length != 0 &&
            <Box sx={{ width: '90%', margin: 'auto', marginTop: '40px' }}>
                <Box sx={{ marginBottom: 3 }}>
                <Typography sx={{ textAlign: 'center', marginBottom: '30px', marginTop: '30px', fontWeight: '500' }} variant="h5" component="h1" gutterBottom>
                Gráfico comparativo
            </Typography>
                    <DatosMateria comision={comisionActual} />
                </Box>
                <Box sx={{ width: '99%', paddingRight: '1%', height: '20rem', marginBottom: "120px", marginTop:'40px' }}>
                    <Grafico mostrarGraficoComision={mostrarGraficoComision} setMostrarGraficoComision={setMostrarGraficoComision} datosComision={comisionActual.inscriptos_semanales} comisiones={comisiones} datosComisiones={dataComisiones}/>
                </Box>

            </Box>}
        </Box>

    )
}