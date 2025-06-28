//MUI
import { Box, Typography, Stack, Button, Link, Divider } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//MUI Icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

//Hooks
import { useState } from 'react';

//Components

import GraficoCohorteCarrera from './GraficoCohorteCarrera';


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

const EstaditicasCohorteCarrera = ({ cohorteData, handleMateriaChange, cohortesSeleccionadas, materiasData }) => {

    const theme = useTheme()

    return (
        <TableContainer component={Paper} sx={{ padding: 0, borderRadius: 0, borderTop: 1, borderColor: theme.palette.disabled.main, borderWidth: 1 }}>
            <Table sx={{ width: '100%' }} aria-label="simple table">
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
    )
}

export default function CohorteCarrera({ cohorteData, handleMateriaChange }) {

    const theme = useTheme()

    const MAX_CUATRIMESTRES = cohorteData.cohortes.length

    const materiasData = cohorteData.cohortes[0].materias.map(materia => ({ id: materia.idMateria, nombre: materia.nombre }))

    const indexCohortesSeleccionadas = () => {

        const lista = [];
        const max = Math.min(MAX_CUATRIMESTRES, 3); // Limita el máximo a 999

        for (let i = 0; i < max; i++) 
            lista.push(i)
        

        return lista;
    }

    const [cohortesSeleccionadas, setCohortesSeleccionadas] = useState(indexCohortesSeleccionadas()) //Indice de las cohortes que se muestran

    const [estaMostrandoGrafico, setEstaMostrandoGrafico] = useState(false) //Indice de las cohortes que se muestran


    function mostrarMasCohortes(n) {
        const MIN = 0
        const MAX = (MAX_CUATRIMESTRES - 1)
        const nuevasCohortes = cohortesSeleccionadas.map(num => num + n).filter(num => num >= MIN && num <= MAX);
        setCohortesSeleccionadas(nuevasCohortes)
    }


    return (
        <Box sx={{ width: '100%', boxShadow: 3, borderRadius: 2, margin: 1, marginBottom: 4, backgroundColor: "white" }}>
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
                <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center", width: '100%', }}>
                    <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-start", alignItems: "center", width: '100%', }} divider={<Divider orientation="vertical" flexItem />}>
                        <Link disabled sx={{ cursor: "pointer" }} fontWeight={400} underline='none' onClick={() => setEstaMostrandoGrafico(false)}>
                            {"Estadísticas"}
                        </Link>
                        <Link sx={{ cursor: "pointer" }} fontWeight={400} underline='none' onClick={() => setEstaMostrandoGrafico(true)}>
                            {"Gráfico"}
                        </Link>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", alignItems: "center", width: '100%', }}>
                        <Button sx={{ width: 'auto' }} onClick={() => mostrarMasCohortes(-1)} disabled={estaMostrandoGrafico || cohortesSeleccionadas.includes(0)}>
                            <ArrowBackIosNewIcon />
                        </Button>
                        <Button sx={{ width: 'auto' }} onClick={() => mostrarMasCohortes(1)} disabled={estaMostrandoGrafico || cohortesSeleccionadas.includes((MAX_CUATRIMESTRES - 1))}>
                            <ArrowForwardIosIcon />
                        </Button>
                    </Stack>
                </Stack>
            </Box>
            {
                !estaMostrandoGrafico
                    ?
                    <EstaditicasCohorteCarrera
                        cohorteData={cohorteData}
                        handleMateriaChange={handleMateriaChange}
                        materiasData={materiasData}
                        cohortesSeleccionadas={cohortesSeleccionadas}
                    />
                    :
                    <GraficoCohorteCarrera
                        cohorteData={cohorteData}
                        totalAlumnos={cohorteData.totalAlumnos}
                    />
            }
        </Box>
    )
}
