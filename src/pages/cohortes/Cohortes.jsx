//MUI
import { Box, Autocomplete, TextField, Typography, Stack, Button, Link, CircularProgress } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//MUI - Icons
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useEffect, useState } from 'react';

//Hooks
import usePeriodos from './usePeriodos';
import useCarreras from './useCarreras';

//Services
import { getCohorteCarrera, getCohorteMateria } from '../../services/CohortesServices';

//Utils
function formatearCuatrimestre(nombrePeriodo) {
    // "Primer Cuatrimestre 2024" => "1C - 2024"
    const texto = nombrePeriodo.toUpperCase().trim();
    let numeroCuatrimestre = '';

    if (texto.startsWith('PRIMER CUATRIMESTRE')) {
        numeroCuatrimestre = '1C';
    } else if (texto.startsWith('SEGUNDO CUATRIMESTRE')) {
        numeroCuatrimestre = '2C';
    } else {
        numeroCuatrimestre = '?C'
    }

    // Extraer el año (últimos 4 caracteres si están bien formateados)
    let año = texto.slice(-4);
    if (!/^\d{4}$/.test(año)) {
        año = "????"
    }

    return `${numeroCuatrimestre} - ${año}`;
}


const SelectorCarrera = ({ periodosData, carrerasData, handleChange, handleSearch, datosBusqueda, estaBuscando }) => {
    const theme = useTheme();
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "stretch",
                marginBottom: 2,
                width: "60%",
                minWidth: 650
            }}>
            <Stack id="smar" sx={{ width: "30%", }} spacing={3}>
                <Autocomplete
                    disablePortal
                    disableClearable
                    sx={{ backgroundColor: "white" }}
                    options={periodosData || []}
                    onChange={(event, option) => handleChange(option.value, "idPeriodo")}
                    renderInput={(params) => <TextField {...params} label="Periodo" sx={{ height: '55px' }} />}
                />
            </Stack>
            <Stack id="smar" sx={{ width: "30%" }} spacing={3}>
                <Autocomplete
                    disablePortal
                    disableClearable
                    sx={{ backgroundColor: "white" }}
                    options={carrerasData || []}
                    onChange={(event, option) => handleChange(option.value, "idCarrera")}
                    renderInput={(params) => <TextField {...params} label="Carrera" sx={{ height: '55px' }} />}
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
                disabled={datosBusqueda.idPeriodo == "" || datosBusqueda.idCarrera == "" || estaBuscando}
                onClick={() => handleSearch()}
            >Buscar
            </Button>
        </Stack>
    )
}

const CohorteCarrera = ({ cohorteData, handleMateriaChange }) => {

    const theme = useTheme()

    const MAX_CUATRIMESTRES = cohorteData.cohortes.length

    const materiasData = cohorteData.cohortes[0].materias.map(materia => ({ id: materia.idMateria, nombre: materia.nombre }))

    const [cohortesSeleccionadas, setCohortesSeleccionadas] = useState([0, 1, 2]) //Indice de las cohortes que se muestran

    function formatearCuatrimestre(nombrePeriodo) {
        // "Primer Cuatrimestre 2024" => "1C - 2024"
        const texto = nombrePeriodo.toUpperCase().trim();
        let numeroCuatrimestre = '';

        if (texto.startsWith('PRIMER CUATRIMESTRE')) {
            numeroCuatrimestre = '1C';
        } else if (texto.startsWith('SEGUNDO CUATRIMESTRE')) {
            numeroCuatrimestre = '2C';
        } else {
            numeroCuatrimestre = '?C'
        }

        // Extraer el año (últimos 4 caracteres si están bien formateados)
        let año = texto.slice(-4);
        if (!/^\d{4}$/.test(año)) {
            año = "????"
        }

        return `${numeroCuatrimestre} - ${año}`;
    }

    function mostrarMasCohortes(n) {
        const MIN = 0
        const MAX = (MAX_CUATRIMESTRES - 1)
        const nuevasCohortes = cohortesSeleccionadas.map(num => num + n).filter(num => num >= MIN && num <= MAX);
        setCohortesSeleccionadas(nuevasCohortes)
    }


    return (
        <Box sx={{ width: '60%', minWidth: 650, boxShadow: 3, borderRadius: 2, padding: 0, marginBottom: 4, backgroundColor: "white" }}>
            {/*Datos de la carrera*/}
            <Box sx={{ textAlign: 'left', fontWeight: 300, padding: 3, paddingBottom: 1 }}>
                <Typography color={theme.palette.primary.main} fontWeight={600} variant="h5" component="h3" gutterBottom>
                    {cohorteData.nombreCarrera}
                </Typography>
                <Typography variant="h6" fontWeight={400} gutterBottom>
                    {"Cohorte: " + cohorteData.nombrePeriodo}
                </Typography>
                <Typography variant="h6" fontWeight={400} gutterBottom>
                    Estudiantes: <span>{cohorteData.totalAlumnos}</span>
                </Typography>
                <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", alignItems: "center", width: '100%', }}>
                    <Button sx={{ width: 'auto' }} onClick={() => mostrarMasCohortes(-1)} disabled={cohortesSeleccionadas.includes(0)}>
                        <ArrowBackIosNewIcon />
                    </Button>

                    <Button sx={{ width: 'auto' }} onClick={() => mostrarMasCohortes(1)} disabled={cohortesSeleccionadas.includes((MAX_CUATRIMESTRES - 1))}>
                        <ArrowForwardIosIcon />
                    </Button>
                </Stack>
            </Box>
            {/*Contenido*/}
            <TableContainer component={Paper} sx={{ padding: 0, borderRadius: 0, borderTop: 1, borderColor: theme.palette.primary.main, borderWidth: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell>Descripción</TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{formatearCuatrimestre(cohorteData.cohortes[cohorteIndex].nombrePeriodo)}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#FFFFFF" }}>
                            <TableCell component="th" scope="row">
                                Inscriptos en el cuatrimestre
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{cohorteData.cohortes[cohorteIndex].inscriptos.total}</TableCell>)
                            }
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#f5f5f5" }}>
                            <TableCell component="th" scope="row">
                                A una materia o más / exact
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{`${cohorteData.cohortes[cohorteIndex].inscriptos.unaMateria} / ${cohorteData.cohortes[cohorteIndex].inscriptos.exactamenteUna}`}</TableCell>)
                            }
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#f5f5f5" }}>
                            <TableCell component="th" scope="row">
                                A dos materias o más / exact
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{`${cohorteData.cohortes[cohorteIndex].inscriptos.dosMaterias} / ${cohorteData.cohortes[cohorteIndex].inscriptos.exactamenteDos}`}</TableCell>)
                            }
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#f5f5f5" }}>
                            <TableCell component="th" scope="row">
                                A tres materias o más / exact
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{`${cohorteData.cohortes[cohorteIndex].inscriptos.tresMaterias} / ${cohorteData.cohortes[cohorteIndex].inscriptos.exactamenteTres}`}</TableCell>)
                            }
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#f5f5f5" }}>
                            <TableCell component="th" scope="row">
                                A cuatro materias o más
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{cohorteData.cohortes[cohorteIndex].inscriptos.cuatroOMas}</TableCell>)
                            }
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#FFFFFF" }}>
                            <TableCell component="th" scope="row">
                                Regularizaron en el cuatrimestre
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{cohorteData.cohortes[cohorteIndex].regularizaron.total}</TableCell>)
                            }
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#f5f5f5" }}>
                            <TableCell component="th" scope="row">
                                Una materia o más / exact
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{`${cohorteData.cohortes[cohorteIndex].regularizaron.unaMateria} / ${cohorteData.cohortes[cohorteIndex].regularizaron.exactamenteUna}`}</TableCell>)
                            }
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#f5f5f5" }}>
                            <TableCell component="th" scope="row">
                                Dos materias o más / exact
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{`${cohorteData.cohortes[cohorteIndex].regularizaron.dosMaterias} / ${cohorteData.cohortes[cohorteIndex].regularizaron.exactamenteDos}`}</TableCell>)
                            }
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#f5f5f5" }}>
                            <TableCell component="th" scope="row">
                                Tres materias o más / exact
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{`${cohorteData.cohortes[cohorteIndex].regularizaron.tresMaterias} / ${cohorteData.cohortes[cohorteIndex].regularizaron.exactamenteTres}`}</TableCell>)
                            }
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#f5f5f5" }}>
                            <TableCell component="th" scope="row">
                                Cuatro materias o más
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{cohorteData.cohortes[cohorteIndex].regularizaron.cuatroOMas}</TableCell>)
                            }
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#FFFFFF" }}>
                            <TableCell component="th" scope="row">
                                Siguen
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{cohorteData.cohortes[cohorteIndex].siguen}</TableCell>)
                            }
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#FFFFFF" }}>
                            <TableCell component="th" scope="row">
                                Abandonaron
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{cohorteData.cohortes[cohorteIndex].abandonaron}</TableCell>)
                            }
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#FFFFFF" }}>
                            <TableCell component="th" scope="row">
                                Terminaron
                            </TableCell>
                            {
                                cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{cohorteData.cohortes[cohorteIndex].terminaron}</TableCell>)
                            }
                        </TableRow>
                        {
                            materiasData.map((materia, index) => (
                                <TableRow key={materia.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Link sx={{ cursor: "pointer" }} underline='none' onClick={() => handleMateriaChange(materia.id)}>
                                            {materia.nombre + " "}
                                        </Link>
                                        - Regularizaron hasta ahora
                                    </TableCell>
                                    {
                                        cohortesSeleccionadas.map(cohorteIndex => <TableCell align="right">{cohorteData.cohortes[cohorteIndex].materias[index].regularizaron}</TableCell>)
                                    }
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

const LoadingBox = ({ text }) => {

    const theme = useTheme()

    return (
        <Box sx={{ width: '60%', minWidth: 650, textAlign: 'center', padding: 10, marginBottom: 4 }}>
            <CircularProgress sx={{ marginBottom: 5 }} size={70} />
            <Typography color={theme.palette.primary.main} fontWeight={500} variant="h6" component="h3" gutterBottom>
                {text}
            </Typography>
            <Typography fontWeight={400} variant="h8" component="h3" gutterBottom>
                Esta operación puede tardar
            </Typography>
        </Box>
    )
}

const NotSelectedBox = ({ text }) => {
    return (
        <Box sx={{ width: '60%', minWidth: 650, padding: 10, marginBottom: 4 }}>
            <Typography fontWeight={400} variant="h6" color="gray" textAlign="center" component="h3" gutterBottom>
                {text}
            </Typography>
        </Box>
    )
}

const CohorteMateria = ({ requestData, handleBack }) => {
    //requestData => {idCarrera: num, idPeriodo: num, idMateria: num}

    const [materiaData, setMateriaData] = useState(null)

    const [requestStatus, setRequestStatus] = useState({
        loading: true,
        error: null
    })

    const [cohortesSeleccionadas, setCohortesSeleccionadas] = useState([])

    let MAX_CUATRIMESTRES = 0

    function mostrarMasCohortes(n) {
        const MIN = 0
        const MAX = (MAX_CUATRIMESTRES - 1)
        const nuevasCohortes = cohortesSeleccionadas.map(num => num + n).filter(num => num >= MIN && num <= MAX);
        setCohortesSeleccionadas(nuevasCohortes)
    }

    useEffect(() => {
        const buscarMateria = async () => {
            setRequestStatus({ ...requestStatus, loading: true })
            try {
                const response = await getCohorteMateria(requestData.idCarrera, requestData.idPeriodo, requestData.idMateria);
                setMateriaData(response.data)
                MAX_CUATRIMESTRES = response.data.cohorte.length
                setCohortesSeleccionadas(Array.from({ length: MAX_CUATRIMESTRES }, (_, i) => i))
                console.log(response)

            }
            catch (err) {
                setRequestStatus({ ...requestStatus, error: err })
            }
            finally {
                setRequestStatus({ ...requestStatus, loading: false })
            }
        }
        buscarMateria()
    }, [])

    const theme = useTheme()

    if (requestStatus.loading) {
        return <LoadingBox text="Generando datos de cohorte" />
    }
    else if (requestStatus.error) {
        return <NotSelectedBox text="No se encontraron datos de la cohorte" />
    }
    else
        return (
            <Box sx={{ padding: 2, width: '60%', backgroundColor: "white" }}>
                <Link sx={{ cursor: "pointer", }} underline='none' onClick={() => handleBack("")}>
                    Volver
                </Link>
                <Box sx={{ width: '100%', boxShadow: 3, borderRadius: 2, padding: 0, marginY: 4 }}>
                    {/*Datos de la materia*/}
                    <Box sx={{ textAlign: 'left', fontWeight: 300, padding: 3, paddingBottom: 1 }}>
                        <Typography color={theme.palette.primary.main} fontWeight={600} variant="h5" component="h3" gutterBottom>
                            {materiaData.nombreMateria}
                        </Typography>
                        <Typography variant="h6" fontWeight={400} gutterBottom>
                            {materiaData.nombreCarrera}
                        </Typography>
                        <Typography variant="h6" fontWeight={400} gutterBottom>
                            {"Cohorte: " + materiaData.nombrePeriodo}
                        </Typography>
                    </Box>
                    {/*Acumulado*/}
                    <Box>
                        <TableContainer component={Paper} sx={{ padding: 0, borderRadius: 0, borderTop: 1, borderColor: theme.palette.primary.main, borderWidth: 3 }}>
                            <Box sx={{ textAlign: 'left', fontWeight: 300, padding: 3, paddingBottom: 1, color: theme.palette.primary.main }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Acumulado:
                                </Typography>
                            </Box>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell>Periodo</TableCell>
                                        <TableCell align="right">Regularizados</TableCell>
                                        <TableCell align="right">Inscriptos 1 vez</TableCell>
                                        <TableCell align="right">Inscriptos 2 veces</TableCell>
                                        <TableCell align="right">Inscriptos 3 veces</TableCell>
                                        <TableCell align="right">Inscriptos 4 o + veces</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cohortesSeleccionadas.map(cohorteIndex => (
                                        <TableRow key={"acumulado" + materiaData.cohorte[cohorteIndex].idPeriodo} sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#FFFFFF" }}>
                                            <TableCell component="th" scope="row">
                                                {materiaData.cohorte[cohorteIndex].nombrePeriodo.toUpperCase()}
                                            </TableCell>
                                            <TableCell align="right">{materiaData.cohorte[cohorteIndex].acumulado.regularizados}</TableCell>
                                            <TableCell align="right">{materiaData.cohorte[cohorteIndex].acumulado.inscriptos_1}</TableCell>
                                            <TableCell align="right">{materiaData.cohorte[cohorteIndex].acumulado.inscriptos_2}</TableCell>
                                            <TableCell align="right">{materiaData.cohorte[cohorteIndex].acumulado.inscriptos_3}</TableCell>
                                            <TableCell align="right">{materiaData.cohorte[cohorteIndex].acumulado.inscriptos_4}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {/*En el cuatrimestre*/}
                    <Box>
                        <TableContainer component={Paper} sx={{ padding: 0, borderRadius: 0, borderTop: 1, borderColor: theme.palette.primary.main, borderWidth: 3 }}>
                            <Box sx={{ textAlign: 'left', fontWeight: 300, padding: 3, paddingBottom: 1 }}>
                                <Typography variant="h6" sx={{ color: theme.palette.primary.main }} fontWeight={600} gutterBottom>
                                    En el cuatrimestre:
                                </Typography>
                                <Typography variant="h6" fontWeight={400} gutterBottom>
                                    Inscriptos / Regularizaron
                                </Typography>
                            </Box>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell>Periodo</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell align="right">1 vez</TableCell>
                                        <TableCell align="right">2 veces</TableCell>
                                        <TableCell align="right">3 veces</TableCell>
                                        <TableCell align="right">4 o + veces</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cohortesSeleccionadas.map(cohorteIndex => (
                                        <TableRow key={"cuatrimestre" + materiaData.cohorte[cohorteIndex].idPeriodo} sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#FFFFFF" }}>
                                            <TableCell component="th" scope="row">
                                                {materiaData.cohorte[cohorteIndex].nombrePeriodo.toUpperCase()}
                                            </TableCell>
                                            <TableCell align="right">{`${materiaData.cohorte[cohorteIndex].cuatrimestre.inscriptos_total} / ${materiaData.cohorte[cohorteIndex].cuatrimestre.regularizados_total} `}</TableCell>
                                            <TableCell align="right">{`${materiaData.cohorte[cohorteIndex].cuatrimestre.inscriptos_1} / ${materiaData.cohorte[cohorteIndex].cuatrimestre.regularizados_1} `}</TableCell>
                                            <TableCell align="right">{`${materiaData.cohorte[cohorteIndex].cuatrimestre.inscriptos_2} / ${materiaData.cohorte[cohorteIndex].cuatrimestre.regularizados_2} `}</TableCell>
                                            <TableCell align="right">{`${materiaData.cohorte[cohorteIndex].cuatrimestre.inscriptos_3} / ${materiaData.cohorte[cohorteIndex].cuatrimestre.regularizados_3} `}</TableCell>
                                            <TableCell align="right">{`${materiaData.cohorte[cohorteIndex].cuatrimestre.inscriptos_4} / ${materiaData.cohorte[cohorteIndex].cuatrimestre.regularizados_4} `}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        )
}

export default function Cohortes() {


    const periodos = usePeriodos([])

    const carreras = useCarreras([])

    const [datosBusqueda, setDatosBusqueda] = useState({ idPeriodo: "", idCarrera: "", idMateria: "" })

    const [estaBuscando, setEstaBuscando] = useState(false)

    const [cohorteData, setCohorteData] = useState(null)

    const [requestStatus, setRequestStatus] = useState({ error: null, loading: false, })


    const handleOpcionChange = (updatedValue, field) => {
        // updatedValue => Nuevo valor (Un id)
        // field => Nombre del campo a modificar ("idPeriodo" o "idCarrera") 
        const newValue = { ...datosBusqueda }
        newValue[field] = updatedValue
        setDatosBusqueda(newValue)
    }

    const handleMateriaChange = (idMateria) => setDatosBusqueda({ ...datosBusqueda, idMateria: idMateria })

    const handleBusqueda = () => setEstaBuscando(true)

    useEffect(() => {
        const buscarCohorte = async () => {
            console.log("Iniciando busqueda...")
            console.log("Cargando...")
            setCohorteData(null)
            setDatosBusqueda({ ...datosBusqueda, idMateria: "" })
            setRequestStatus({ ...requestStatus, loading: true })
            try {
                const response = await getCohorteCarrera(datosBusqueda.idCarrera, datosBusqueda.idPeriodo);
                setCohorteData(response.data)
                console.log(response)
                console.log("Datos cargados!")
            }
            catch (err) {
                setRequestStatus({ ...requestStatus, error: err })
                console.log("Error:" + err)
            } finally {
                setRequestStatus({ ...requestStatus, loading: false })
                console.log("Se termino de cargar")
                setEstaBuscando(false)
            }
        }

        estaBuscando && buscarCohorte()

    }, [estaBuscando])

    return (
        <Box sx={{ minWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: "center", }} gap={2}>
            <Typography sx={{ textAlign: 'center', marginBottom: '30px', marginTop: '60px', fontWeight: '500' }} variant="h5" component="h1" gutterBottom>
                Cohortes
            </Typography>
            <SelectorCarrera
                periodosData={periodos.value.slice(3)}
                carrerasData={carreras.value}
                datosBusqueda={datosBusqueda}
                handleChange={handleOpcionChange}
                handleSearch={handleBusqueda}
                estaBuscando={estaBuscando}
            />
            {
                (datosBusqueda.idMateria != "") ? <CohorteMateria requestData={datosBusqueda} handleBack={handleMateriaChange} /> :
                    (cohorteData != null) ? <CohorteCarrera cohorteData={cohorteData} handleMateriaChange={handleMateriaChange} /> :
                        (!requestStatus.loading && cohorteData == null) ? <NotSelectedBox text="Seleccione los datos de la cohorte" /> :
                            (requestStatus.loading) ? <LoadingBox text="Generando análisis de datos" /> :
                                (requestStatus.error) && <NotSelectedBox text="No se encontraron datos de la cohorte" />
            }
        </Box>
    )
}