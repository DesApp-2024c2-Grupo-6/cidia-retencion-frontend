//MUI
import { Box, Autocomplete, TextField, Typography, Stack, Button, Link } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//MUI - Icons
import SearchIcon from '@mui/icons-material/Search';


const SelectorCarrera = () => {
    const theme = useTheme();

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "stretch",
                marginBottom: 2,
                width: "60%"
            }}>
            <Stack id="smar" sx={{ width: "30%", }} spacing={3}>
                <Autocomplete
                    disablePortal
                    disableClearable
                    sx={{ width: '100%' }}
                    options={[]}
                    renderInput={(params) => <TextField {...params} label="Periodo" sx={{ height: '55px' }} />}
                />
            </Stack>
            <Stack id="smar" sx={{ width: "30%" }} spacing={3}>
                <Autocomplete
                    disablePortal
                    disableClearable
                    options={[]}
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
                onClick={console.log("Buscar cohortes")}
            >Buscar
            </Button>
        </Stack>
    )
}

const CohorteCarrera = () => {
    const theme = useTheme()

    const rows = [
        {
            "descripcion": "Inscriptos en el cuatrimestre",
            "cuatrimestre_1": 1382,
            "cuatrimestre_2": 1382,
            "cuatrimestre_3": 1382,
            "es_header": true
        },
        {
            "descripcion": "a una materia o más / exact.",
            "cuatrimestre_1": 1242,
            "cuatrimestre_2": 540,
            "cuatrimestre_3": 540
        },
        {
            "descripcion": " a dos materias o más / exact.",
            "cuatrimestre_1": 842,
            "cuatrimestre_2": 842,
            "cuatrimestre_3": 842
        },
        {
            "descripcion": " a tres materias o más / exact.",
            "cuatrimestre_1": 558,
            "cuatrimestre_2": 401,
            "cuatrimestre_3": 401
        },
        {
            "descripcion": "a cuatro materias o más",
            "cuatrimestre_1": 157,
            "cuatrimestre_2": 157,
            "cuatrimestre_3": 157
        },
        {
            "descripcion": "Regularizaron en el cuatrimestre",
            "cuatrimestre_1": 1051,
            "cuatrimestre_2": 1051,
            "cuatrimestre_3": 1051,
            "es_header": true

        },
        {
            "descripcion": "una materia o más / exact.",
            "cuatrimestre_1": 1051,
            "cuatrimestre_2": 604,
            "cuatrimestre_3": 604
        },
        {
            "descripcion": "dos materias o más / exact.",
            "cuatrimestre_1": 447,
            "cuatrimestre_2": 312,
            "cuatrimestre_3": 312
        },
        {
            "descripcion": "tres materias o más / exact.",
            "cuatrimestre_1": 135,
            "cuatrimestre_2": 82,
            "cuatrimestre_3": 82
        },
        {
            "descripcion": "cuatro materias o más",
            "cuatrimestre_1": 7,
            "cuatrimestre_2": 7,
            "cuatrimestre_3": 7
        },
        {
            "descripcion": "Siguen",
            "cuatrimestre_1": 128,
            "cuatrimestre_2": 128,
            "cuatrimestre_3": 128,
            "es_header": true
        },
        {
            "descripcion": "Terminaron",
            "cuatrimestre_1": 376,
            "cuatrimestre_2": 376,
            "cuatrimestre_3": 376,
            "es_header": true

        },
        {
            "descripcion": "Abandonaron",
            "cuatrimestre_1": 376,
            "cuatrimestre_2": 376,
            "cuatrimestre_3": 376,
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
        <Box sx={{ width: '60%', boxShadow: 3, borderRadius: 2, padding: 0, marginBottom: 4 }}>
            {/*Datos de la carrera*/}
            <Box sx={{ textAlign: 'left', fontWeight: 300, padding: 3, paddingBottom: 1 }}>
                <Typography color={theme.palette.primary.main} fontWeight={600} variant="h5" component="h3" gutterBottom>
                    Licenciatura en Informatica
                </Typography>
                <Typography variant="h6" fontWeight={400} gutterBottom>
                    Cohorte: PRIMER CUATRIMESTRE 2024
                </Typography>
                <Typography variant="h6" fontWeight={400} gutterBottom>
                    Estudiantes: <span>1024</span>
                </Typography>
            </Box>
            {/*Contenido*/}
            <TableContainer component={Paper} sx={{ padding: 0, borderRadius: 0, borderTop: 1, borderColor: theme.palette.primary.main, borderWidth: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell>Descripción</TableCell>
                            <TableCell align="right">1C - 2024</TableCell>
                            <TableCell align="right">2C - 2024</TableCell>
                            <TableCell align="right">1C - 2025</TableCell>
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
        <Box sx={{ width: '60%', boxShadow: 3, borderRadius: 2, padding: 0, marginBottom: 4}}>
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
                        <Typography variant="h6" sx={{color: theme.palette.primary.main}} fontWeight={400} gutterBottom>
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

export default function Cohortes() {
    return (
        <Box sx={{ minWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: "center", }} gap={2}>
            <Typography sx={{ textAlign: 'center', marginBottom: '30px', marginTop: '30px', fontWeight: '500' }} variant="h5" component="h1" gutterBottom>
                Cohortes
            </Typography>
            <SelectorCarrera />
            <CohorteCarrera />
            <CohorteMateria />
        </Box>
    )
}