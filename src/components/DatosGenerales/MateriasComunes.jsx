import React, { useState, useEffect } from 'react';
import FilaParDeCarreras from './FilaParDeCarreras.jsx'
//Componentes MUI
import { Button, Box, IconButton, Typography } from '@mui/material';
//Iconos
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//Servicios
import { getAllCareerGuarani } from '../../services/CareerService.js'
import FilaMateriaComun from './FilaMateriaComun.jsx';

//Datos de prueba


function MateriasComunes({materiasComunesData, materiasGuaraniData, editarDatosGenerales}) {
    /*
        Retorna la seccion donde se gestionan los pares de carreras
        Parametros:
            -paresCarrerasData - Lista de objetos - Lista que contiene los datos de las materias comunes. Propiedad specialSubject de generalAcademicData
            -materiasGuaraniData - Lista de objetos - Lista que las materias de siu guarani.
    */

    materiasComunesData = materiasComunesData.map((materia, index) => ({idLista:index, ...materia}))

    const [materiasGuarani, setmateriasGuarani] = useState(materiasGuaraniData)
    const [materiasComunes, setMateriasComunes] = useState(materiasComunesData)

    const editarMateriaComun = (nuevaMateria) => {
        /*
            Edita una materia segun los parametros recibidos
            Parametros
                - nuevaMateria - Objeto - Nueva materia a agregar
        */
        const materiasEditadas = materiasComunes.map(materia => (materia.idLista == nuevaMateria.idLista) ? nuevaMateria : materia)
        setMateriasComunes(materiasEditadas)
        editarDatosGenerales(materiasEditadas)
    }

    const borrarMateriaComun = (idListaABorrar) => {
        /*
            Borra una materia segun el id dado
            Parametros
                - idListaABorrar - Numero - IdLista del objeto a borrar
        */
        const materiasRestantes = materiasComunes.filter(materia => (materia.idLista != idListaABorrar))
        setMateriasComunes(materiasRestantes)
        editarDatosGenerales(materiasRestantes)
    }
    

    const handleAgregarMateriaComun = () => {
        const idNoDisponibles = materiasComunes.map(materia => materia.idLista);
        const generarIDRandom = () => {
            const idGenerado =  Math.floor(Math.random() * 10);
            return (idNoDisponibles.includes(idGenerado)) ? generarIDRandom() : idGenerado
        }
        const MATERIA_VACIA = {idLista:(generarIDRandom()), id: "", name: "", realName:"" }
        setMateriasComunes([MATERIA_VACIA, ...materiasComunes])
        editarDatosGenerales([MATERIA_VACIA, ...materiasComunes])
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column' },
                alignItems: 'center',
                bgcolor: 'background.default',
                marginTop: 8,
                marginBottom: 3
            }}>
                {/*Materias comunes*/}
                <Box sx={{
                    width: '1000px',
                    minWidth: '250px',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'no-wrap',
                    gap: '10px'

                }}>
                    <h2 className="label">Materias comunes</h2>
                    <IconButton
                        sx={{ display: 'inline', width: 'auto', marginTop: '10px' }}
                        onClick={handleAgregarMateriaComun}>
                        <AddCircleIcon color="success" sx={{ fontSize: '48px' }} />
                    </IconButton>
                </Box>
                <Box sx={{
                    width: '1000px',
                    minWidth: '250px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px',
                    borderBottom: 'solid',
                    borderBottomWidth: '1px',
                    borderBottomColor: '#dedede',
                }}>
                    <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 'small' }}>Materia</Typography>
                    <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 'small' }}>Nombre para mail</Typography>
                    <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 'small' }}>Acciones</Typography>
                </Box>
                <Box sx={{
                    width: '1000px',
                    minWidth: '250px',
                }}>
                    {
                        materiasComunes.map((materia) => 
                            <FilaMateriaComun
                                key={materia.idLista} 
                                materiaComunData={materia} 
                                materiasDisponibles={materiasGuarani} 
                                editarMateriaComun = {editarMateriaComun} 
                                borrarMateriaComun = {borrarMateriaComun} 
                            />)
                    }
                </Box>
            </Box>
        </>
    );
}

export default MateriasComunes;
