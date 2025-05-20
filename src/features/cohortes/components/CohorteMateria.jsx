//MUI
import { Box, Typography, Link } from '@mui/material';
import {Divider,Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//Components
import CohorteLoader from './CohorteLoader';
import CohorteNotSelected  from './CohorteNotSelected';
import GraficoCohorteMateria from './GraficoCohorteMateria';
//Hooks
import { useEffect, useState } from 'react';


//Services
import { getCohorteMateria } from '@services/CohortesServices';





export default function CohorteMateria({ requestData, handleBack }){
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
    const [estaMostrandoGrafico, setEstaMostrandoGrafico] = useState(false) //Indice de las cohortes que se muestran

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
        return <CohorteLoader text="Generando datos de cohorte" />
    }
    else if (requestStatus.error) {
        return <CohorteNotSelected text="No se encontraron datos de la cohorte" />
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
                        <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-start", alignItems: "center", width: '100%', }} divider={<Divider orientation="vertical" flexItem />}>
                            <Link disabled sx={{ cursor: "pointer" }} fontWeight={400} underline='none' onClick={() => setEstaMostrandoGrafico(false)}>
                                {"Estadísticas"}
                            </Link>
                            <Link sx={{ cursor: "pointer" }} fontWeight={400} underline='none' onClick={() => setEstaMostrandoGrafico(true)}>
                                {"Gráfico"}
                            </Link>
                        </Stack>
                    </Box>
                    {
                        !estaMostrandoGrafico
                        ?
                        <>
                            {/*Acumulado*/}
                            <Box>
                                <TableContainer component={Paper} sx={{ padding: 0, borderRadius: 0, borderTop: 1, borderColor: theme.palette.disabled.main, borderWidth: 1  }}>
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
                                <TableContainer component={Paper} sx={{ padding: 0, borderRadius: 0, borderTop: 1, borderColor: theme.palette.disabled.main, borderWidth: 1  }}>
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
                        </>
                        :
                        <GraficoCohorteMateria
                            materiaData={materiaData}
                        />

                    }
                    
                   
                </Box>
            </Box>
        )
}