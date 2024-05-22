import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import listadoCondicionesCarrera from '../services/listadoCondicionesCarrera';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(key, id, anio, materia, tiporestriccion, condicion) {
    return {key, id, anio, materia, tiporestriccion, condicion };
}


function ConfiguracionCondicionCarrera() {

    const IdCarrera = useSelector((state) => state.carrera.IdCarrera);
    const nombreCarrera = useSelector((state) => state.carrera.nombreCarrera);

    const [condicionesList, setCondicionesList] = useState([]);

    useEffect(() => {
        const lista = listadoCondicionesCarrera
            .filter(c => c.id_carrera == IdCarrera)
            .map((c, index) => {
                let configCondicion;
                if (c.codigo_condicion === "MATERIAS-ESPECIFICAS") {
                    configCondicion = c.config_condicion.materias.map((m, idx) => idx === c.config_condicion.materias.length - 1 ? m : m + " - ").join("<br/>");
                } else if (c.codigo_condicion === "ANIOS-COMPLETOS") {
                    configCondicion = "Año: " + c.config_condicion.anio;
                } else if (c.codigo_condicion === "CANT-MATERIAS-ANIO") {
                    configCondicion = `Año: ${c.config_condicion.anio} Cantidad: ${c.config_condicion.cantidad} Campos: ${c.config_condicion.campos.map((cam, idx) => idx === c.config_condicion.campos.length - 1 ? cam : cam + " - ").join("")}`;
                } else if (c.codigo_condicion === "CANT-MATERIAS") {
                    configCondicion = `Cantidad: ${c.config_condicion.cantidad} ${c.config_condicion.campos_excepto == null ? "" : "Campos exceptuados: " +c.config_condicion.campos_excepto.map((ce, idx) => idx === c.config_condicion.campos_excepto.length - 1 ? ce : ce+" - ").join("")}`
                } else {
                    configCondicion = "-";
                }
                return createData(
                    index,
                    c.id_carrera,
                    c.anio != null ? c.anio : "-",
                    c.id_materia != null ? c.id_materia : "-",
                    c.codigo_condicion != null ? c.codigo_condicion : "-",
                    configCondicion
                );
            });
        setCondicionesList(lista);
    }, [])



    return (
    
        <>
            <Box
                sx={{
                    width:'100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}>
                <Box>
                    <Box>
                        <h1> {nombreCarrera} </h1>
                    </Box>
                    
                    <Box
                        sx={{
                            width: 'auto',
                            marginBottom: '100px'
                        }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead
                                    sx={{
                                        backgroundColor: '#609800',  
                                    }}>
                                    <TableRow>
                                        <TableCell sx={{ color: '#FFFFFF' }} align="center">Año</TableCell>
                                        <TableCell sx={{ color: '#FFFFFF' }} align="center">Materia</TableCell>
                                        <TableCell sx={{ color: '#FFFFFF' }} align="center">Tipo de restricción</TableCell>
                                        <TableCell sx={{ color: '#FFFFFF' }} align="center">Condiciones</TableCell>
                                        <TableCell sx={{ color: '#FFFFFF' }} align="center">Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {condicionesList.map((row) => (
                                        <TableRow
                                            key={row.key}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {row.anio}
                                            </TableCell>
                                            <TableCell align="center">{row.materia}</TableCell>
                                            <TableCell align="center">{row.tiporestriccion}</TableCell>
                                            <TableCell align="justify">{row.condicion}</TableCell>
                                            <TableCell align="center">
                                                {/*<IconButton color="primary" aria-label="editar" sx={{ width: '40px' }}*/}
                                                {/*    <EditIcon />*/}
                                                {/*</IconButton>*/}
                                                <IconButton color="secondary" aria-label="eliminar" sx={{ width: '40px' }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default ConfiguracionCondicionCarrera;