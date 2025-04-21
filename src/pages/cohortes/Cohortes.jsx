//MUI
import { Box, Autocomplete, TextField, Typography, Stack, Button, Link, CircularProgress } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//MUI - Icons
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';

//Hooks
import usePeriodos from './usePeriodos';
import useCarreras from './useCarreras';

//Services
import { getCohorteCarrera } from '../../services/CohortesServices';


const SelectorCarrera = ({ periodosData, carrerasData, handleChange, handleSearch }) => {
    const theme = useTheme();

    const handleSubmit = () => { }

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
                    sx={{ width: '100%' }}
                    options={periodosData || []}
                    onChange={(event, option) => handleChange(option.value, "idPeriodo")}
                    renderInput={(params) => <TextField {...params} label="Periodo" sx={{ height: '55px' }} />}
                />
            </Stack>
            <Stack id="smar" sx={{ width: "30%" }} spacing={3}>
                <Autocomplete
                    disablePortal
                    disableClearable
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
                disabled={false}
                onClick={() => handleSearch()}
            >Buscar
            </Button>
        </Stack>
    )
}

const CohorteCarrera = ({cohorteData}) => {
    const theme = useTheme()

    function formatearCuatrimestre(nombrePeriodo) {
        // "Primer Cuatrimestre 2024" => "1C - 2024"
        const texto = nombrePeriodo.toUpperCase().trim();
        let numeroCuatrimestre = '';
      
        if (texto.startsWith('PRIMER CUATRIMESTRE')) {
          numeroCuatrimestre = '1C';
        } else if (texto.startsWith('SEGUNDO CUATRIMESTRE')) {
          numeroCuatrimestre = '2C';
        } else {
          throw new Error('Formato no reconocido');
        }
      
        // Extraer el año (últimos 4 caracteres si están bien formateados)
        const año = texto.slice(-4);
        if (!/^\d{4}$/.test(año)) {
          throw new Error('Año no válido');
        }
      
        return `${numeroCuatrimestre} - ${año}`;
    }

    const rows = [
        {
            "descripcion": "Inscriptos en el cuatrimestre",
            "cuatrimestre_1": cohorteData.cohortes[0].inscriptos.unaMateria,
            "cuatrimestre_2": cohorteData.cohortes[1].inscriptos.unaMateria,
            "cuatrimestre_3": cohorteData.cohortes[2].inscriptos.unaMateria,
            "es_header": true
        },
        {
            "descripcion": "a una materia o más / exact.",
            "cuatrimestre_1": cohorteData.cohortes[0].inscriptos.unaMateria + " / " + cohorteData.cohortes[0].inscriptos.exactamenteUna,
            "cuatrimestre_2": cohorteData.cohortes[1].inscriptos.unaMateria + " / " + cohorteData.cohortes[1].inscriptos.exactamenteUna,
            "cuatrimestre_3": cohorteData.cohortes[2].inscriptos.unaMateria + " / " + cohorteData.cohortes[2].inscriptos.exactamenteUna,
        },
        {
            "descripcion": " a dos materias o más / exact.",
            "cuatrimestre_1": cohorteData.cohortes[0].inscriptos.dosMaterias + " / " + cohorteData.cohortes[0].inscriptos.exactamenteDos,
            "cuatrimestre_2": cohorteData.cohortes[1].inscriptos.dosMaterias + " / " + cohorteData.cohortes[1].inscriptos.exactamenteDos,
            "cuatrimestre_3": cohorteData.cohortes[2].inscriptos.dosMaterias + " / " + cohorteData.cohortes[2].inscriptos.exactamenteDos,
        },
        {
            "descripcion": " a tres materias o más / exact.",
            "cuatrimestre_1": cohorteData.cohortes[0].inscriptos.tresMaterias + " / " + cohorteData.cohortes[0].inscriptos.exactamenteTres,
            "cuatrimestre_2": cohorteData.cohortes[1].inscriptos.tresMaterias + " / " + cohorteData.cohortes[1].inscriptos.exactamenteTres,
            "cuatrimestre_3": cohorteData.cohortes[2].inscriptos.tresMaterias + " / " + cohorteData.cohortes[2].inscriptos.exactamenteTres,
        },
        {
            "descripcion": "a cuatro materias o más",
            "cuatrimestre_1": cohorteData.cohortes[0].inscriptos.cuatroMateriasOMas,
            "cuatrimestre_2": cohorteData.cohortes[1].inscriptos.cuatroMateriasOMas,
            "cuatrimestre_3": cohorteData.cohortes[2].inscriptos.cuatroMateriasOMas,
        },
        {
            "descripcion": "Regularizaron en el cuatrimestre",
            "cuatrimestre_1": cohorteData.cohortes[0].regularizaron.unaMateria,
            "cuatrimestre_2": cohorteData.cohortes[1].regularizaron.unaMateria,
            "cuatrimestre_3": cohorteData.cohortes[2].regularizaron.unaMateria,
            "es_header": true

        },
        {
            "descripcion": "una materia o más / exact.",
            "cuatrimestre_1": cohorteData.cohortes[0].regularizaron.unaMateria + " / " + cohorteData.cohortes[0].regularizaron.exactamenteUna,
            "cuatrimestre_2": cohorteData.cohortes[1].regularizaron.unaMateria + " / " + cohorteData.cohortes[1].regularizaron.exactamenteUna,
            "cuatrimestre_3": cohorteData.cohortes[2].regularizaron.unaMateria + " / " + cohorteData.cohortes[2].regularizaron.exactamenteUna,
        },
        {
            "descripcion": "dos materias o más / exact.",
            "cuatrimestre_1": cohorteData.cohortes[0].regularizaron.dosMaterias + " / " + cohorteData.cohortes[0].regularizaron.exactamenteDos,
            "cuatrimestre_2": cohorteData.cohortes[1].regularizaron.dosMaterias + " / " + cohorteData.cohortes[1].regularizaron.exactamenteDos,
            "cuatrimestre_3": cohorteData.cohortes[2].regularizaron.dosMaterias + " / " + cohorteData.cohortes[2].regularizaron.exactamenteDos,
        },
        {
            "descripcion": "tres materias o más / exact.",
            "cuatrimestre_1": cohorteData.cohortes[0].regularizaron.tresMaterias + " / " + cohorteData.cohortes[0].regularizaron.exactamenteTres,
            "cuatrimestre_2": cohorteData.cohortes[1].regularizaron.tresMaterias + " / " + cohorteData.cohortes[1].regularizaron.exactamenteTres,
            "cuatrimestre_3": cohorteData.cohortes[2].regularizaron.tresMaterias + " / " + cohorteData.cohortes[2].regularizaron.exactamenteTres,
        },
        {
            "descripcion": "cuatro materias o más",
            "cuatrimestre_1": cohorteData.cohortes[0].regularizaron.cuatroMateriasOMas,
            "cuatrimestre_2": cohorteData.cohortes[1].regularizaron.cuatroMateriasOMas,
            "cuatrimestre_3": cohorteData.cohortes[2].regularizaron.cuatroMateriasOMas,
        },
        {
            "descripcion": "Siguen",
            "cuatrimestre_1": cohorteData.cohortes[0].siguen,
            "cuatrimestre_2": cohorteData.cohortes[1].siguen,
            "cuatrimestre_3": cohorteData.cohortes[2].siguen,
            "es_header": true
        },
        {
            "descripcion": "Terminaron",
            "cuatrimestre_1": cohorteData.cohortes[0].terminaron,
            "cuatrimestre_2": cohorteData.cohortes[1].terminaron,
            "cuatrimestre_3": cohorteData.cohortes[2].terminaron,
            "es_header": true

        },
        {
            "descripcion": "Abandonaron",
            "cuatrimestre_1": cohorteData.cohortes[0].abandonaron,
            "cuatrimestre_2": cohorteData.cohortes[1].abandonaron,
            "cuatrimestre_3": cohorteData.cohortes[2].abandonaron,
            "es_header": true

        },

    ]

    const materiasData = [
        {
            "descripcion": "Introducción a la programación",
            "cuatrimestre_1": 128,
            "cuatrimestre_2": 128,
            "cuatrimestre_3": 128
        },
        {
            "descripcion": "Programación Esctructurada",
            "cuatrimestre_1": 376,
            "cuatrimestre_2": 376,
            "cuatrimestre_3": 376
        }
    ]

    return (
        <Box sx={{ width: '60%', minWidth: 650, boxShadow: 3, borderRadius: 2, padding: 0, marginBottom: 4 }}>
            {/*Datos de la carrera*/}
            <Box sx={{ textAlign: 'left', fontWeight: 300, padding: 3, paddingBottom: 1 }}>
                <Typography color={theme.palette.primary.main} fontWeight={600} variant="h5" component="h3" gutterBottom>
                    {cohorteData.nombreCarrera}
                </Typography>
                <Typography variant="h6" fontWeight={400} gutterBottom>
                  {"Cohorte: "+cohorteData.nombrePeriodo}
                </Typography>
                <Typography variant="h6" fontWeight={400} gutterBottom>
                    Estudiantes: <span>{cohorteData.totalAlumnos}</span>
                </Typography>
            </Box>
            {/*Contenido*/}
            <TableContainer component={Paper} sx={{ padding: 0, borderRadius: 0, borderTop: 1, borderColor: theme.palette.primary.main, borderWidth: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell>Descripción</TableCell>
                            <TableCell align="right">{formatearCuatrimestre(cohorteData.cohortes[0].nombrePeriodo)}</TableCell>
                            <TableCell align="right">{formatearCuatrimestre(cohorteData.cohortes[1].nombrePeriodo)}</TableCell>
                            <TableCell align="right">{formatearCuatrimestre(cohorteData.cohortes[2].nombrePeriodo)}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: (row.es_header) ? "#FFFFFF" : "#f5f5f5" }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.descripcion}
                                </TableCell>
                                <TableCell align="right">{row.cuatrimestre_1}</TableCell>
                                <TableCell align="right">{row.cuatrimestre_2}</TableCell>
                                <TableCell align="right">{row.cuatrimestre_3}</TableCell>
                            </TableRow>
                        ))}
                        {materiasData.map((materia) => (
                            <TableRow
                                key={materia.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link href="#" underline='none'>
                                        {materia.descripcion + " "}
                                    </Link>
                                    - Regularizaron hasta ahora
                                </TableCell>
                                <TableCell align="right">{materia.cuatrimestre_1}</TableCell>
                                <TableCell align="right">{materia.cuatrimestre_2}</TableCell>
                                <TableCell align="right">{materia.cuatrimestre_3}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

const CohorteMateria = () => {
    const theme = useTheme()

    const rowsAcumulado = [
        {
            "periodo": "1C - 2020",
            "regularizados": "nnn",
            "inscriptos_1": "nnn",
            "inscriptos_2": "nnn",
            "inscriptos_3": "nnn",
            "inscriptos_4": "nnn"
        },
        {
            "periodo": "2C - 2020",
            "regularizados": "nnn",
            "inscriptos_1": "nnn",
            "inscriptos_2": "nnn",
            "inscriptos_3": "nnn",
            "inscriptos_4": "nnn"
        },
        {
            "periodo": "1C - 2021",
            "regularizados": "nnn",
            "inscriptos_1": "nnn",
            "inscriptos_2": "nnn",
            "inscriptos_3": "nnn",
            "inscriptos_4": "nnn"
        }
    ]

    const rowsCuatrimestre = [
        {
            "periodo": "1C - 2020",
            "total": "nnn / mmm",
            "inscriptos_1": "nnn / mmm",
            "inscriptos_2": "nnn / mmm",
            "inscriptos_3": "nnn / mmm",
            "inscriptos_4": "nnn / mmm"
        },
        {
            "periodo": "2C - 2020",
            "total": "nnn / mmm",
            "inscriptos_1": "nnn / mmm",
            "inscriptos_2": "nnn / mmm",
            "inscriptos_3": "nnn / mmm",
            "inscriptos_4": "nnn / mmm"
        },
        {
            "periodo": "1C - 2021",
            "total": "nnn / mmm",
            "inscriptos_1": "nnn / mmm",
            "inscriptos_2": "nnn / mmm",
            "inscriptos_3": "nnn / mmm",
            "inscriptos_4": "nnn / mmm"
        }
    ];


    return (
        <Box sx={{ width: '60%', boxShadow: 3, borderRadius: 2, padding: 0, marginBottom: 4 }}>
            {/*Datos de la materia*/}
            <Box sx={{ textAlign: 'left', fontWeight: 300, padding: 3, paddingBottom: 1 }}>
                <Typography color={theme.palette.primary.main} fontWeight={600} variant="h5" component="h3" gutterBottom>
                    Introducción a la programación
                </Typography>
                <Typography variant="h6" fontWeight={400} gutterBottom>
                    Cohorte: PRIMER CUATRIMESTRE 2024
                </Typography>
            </Box>
            {/*Acumulado*/}
            <Box>
                <TableContainer component={Paper} sx={{ padding: 0, borderRadius: 0, borderTop: 1, borderColor: theme.palette.primary.main, borderWidth: 3 }}>
                    <Box sx={{ textAlign: 'left', fontWeight: 300, padding: 3, paddingBottom: 1, color: theme.palette.primary.main }}>
                        <Typography variant="h6" fontWeight={400} gutterBottom>
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
                            {rowsAcumulado.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: (row.es_header) ? "#FFFFFF" : "#f5f5f5" }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.periodo}
                                    </TableCell>
                                    <TableCell align="right">{row.regularizados}</TableCell>
                                    <TableCell align="right">{row.inscriptos_1}</TableCell>
                                    <TableCell align="right">{row.inscriptos_2}</TableCell>
                                    <TableCell align="right">{row.inscriptos_3}</TableCell>
                                    <TableCell align="right">{row.inscriptos_4}</TableCell>
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
                        <Typography variant="h6" sx={{ color: theme.palette.primary.main }} fontWeight={400} gutterBottom>
                            En el cuatrimestre:
                        </Typography>
                        <Typography variant="h6" fontWeight={400} gutterBottom>
                            Inscriptos / Regularizarón
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
                            {rowsCuatrimestre.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: (row.es_header) ? "#FFFFFF" : "#f5f5f5" }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.periodo}
                                    </TableCell>
                                    <TableCell align="right">{row.total}</TableCell>
                                    <TableCell align="right">{row.inscriptos_1}</TableCell>
                                    <TableCell align="right">{row.inscriptos_2}</TableCell>
                                    <TableCell align="right">{row.inscriptos_3}</TableCell>
                                    <TableCell align="right">{row.inscriptos_4}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

const LoadingBox = () => {

    const theme = useTheme()

    return (
        <Box sx={{ width: '60%', minWidth: 650, textAlign:'center', padding: 10, marginBottom: 4 }}>
            <CircularProgress sx={{marginBottom:5}} size={70}/>
            <Typography color={theme.palette.primary.main} fontWeight={500} variant="h6" component="h3" gutterBottom>
                Generando analisis de datos...
            </Typography>
            <Typography  fontWeight={400} variant="h8" component="h3" gutterBottom>
                Esta operación puede tardar
            </Typography>
        </Box>
    )
}

const NotSelectedBox = () => {
    return (
        <Box sx={{ width: '60%', minWidth: 650, padding: 10, marginBottom: 4 }}>
            <Typography  fontWeight={400} variant="h6" color="gray" textAlign="center" component="h3" gutterBottom>
                Seleccione los datos para buscar la cohorte
            </Typography>
        </Box>
    )
}

export default function Cohortes() {

    const periodos = usePeriodos([])
    const carreras = useCarreras([])

    const [datosBusqueda, setDatosBusqueda] = useState({idPeriodo: "", idCarrera: "",})

    const [estaBuscando, setEstaBuscando] = useState(false)

    const [cohorteData, setCohorteData] = useState(null)

    const [requestStatus, setRequestStatus] = useState({error: null, loading: false,})


    const handleOpcionChange = (updatedValue, field) => {
        // updatedValue => Nuevo valor (Un id)
        // field => Nombre del campo a modificar ("idPeriodo" o "idCarrera") 
        const newValue = { ...datosBusqueda }
        newValue[field] = updatedValue
        setDatosBusqueda(newValue)
    }

    const handleBusqueda = () => setEstaBuscando(true)

    useEffect(() => {
        const buscarCohorte = async () => {
            console.log("Iniciando busqueda...")
            console.log("Cargando...")
            setRequestStatus({ ...requestStatus, loading: true })
            try {
                const response = await getCohorteCarrera(datosBusqueda.idPeriodo, datosBusqueda.idCarrera);
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
            <Typography sx={{ textAlign: 'center', marginBottom: '30px', marginTop: '30px', fontWeight: '500' }} variant="h5" component="h1" gutterBottom>
                Cohortes
            </Typography>
            <SelectorCarrera
                periodosData={periodos.value}
                carrerasData={carreras.value}
                handleChange={handleOpcionChange}
                handleSearch={handleBusqueda}
            />
            {
                (cohorteData != null) ? <CohorteCarrera cohorteData={cohorteData}/> :
                (!requestStatus.loading && cohorteData == null) ? <NotSelectedBox/> :
                (requestStatus.loading) && <LoadingBox/> 
            }
        </Box>
    )
}