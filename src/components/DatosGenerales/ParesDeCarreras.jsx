import React, { useState, useEffect } from 'react';
import FilaParDeCarreras from './FilaParDeCarreras'
//Componentes MUI
import { Button, Box, IconButton, Typography } from '@mui/material';
//Iconos
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//Servicios
import { getAllCareerGuarani } from '../../services/CareerService.js'

//Datos de prueba


function ParesDeCarreras({paresCarrerasData, carrerasGuaraniData, editarDatosGenerales, guardarDatosGenerales, sePuedeGuardar}) {
    /*
        Retorna la seccion donde se gestionan los pares de carreras
        Parametros:
            -paresCarrerasData - Lista de objetos - Lista que contiene los pares de carreras. Propiedad careerPairs de generalAcademicData
            -carrerasGuaraniData - Lista de objetos - Lista que las carreras de siu guarani.
            -editarDatosGenerales(nuevoValor) - Funcion - Funcion que edita la propiedad careerPairs de los datos generales
    */

    paresCarrerasData = paresCarrerasData.map((par, index) => ({id:index, ...par}))

    const [carrerasGuarani, setCarrerasGuarani] = useState(carrerasGuaraniData)
    const [paresCarreras, setParesCarreras] = useState(paresCarrerasData)

    const [seAgregoParNuevo, setSeAgregoParNuevo] = useState(false)

    const editarParDeCarreras = (nuevoPar) => {
        /*
            Edita un par de carreras segun los parametros recibidos
            Parametros
                - nuevoPar - Objeto - Nuevo par a agregar EJ: { id: 1, shortCareer: { id: 7, nombre:"Tecnicatura en nutricion" }, longCareer: { id: 13, nombre:"Licenciatura en alimentos" }
        */
        const paresEditados = paresCarreras.map(par => (par.id == nuevoPar.id) ? nuevoPar : par)
        setParesCarreras(paresEditados)
        editarDatosGenerales(paresEditados)

    }

    const borrarParDeCarreras = (idABorrar) => {
        /*
            Borra un par de carreras segun el id dado
            Parametros
                - idABorrar - Numero - Id del objeto a borrar
        */
        const paresRestantes = paresCarreras.filter(par => (par.id != idABorrar))
        setParesCarreras(paresRestantes)
        editarDatosGenerales(paresRestantes)
    }
    
    const handleAgregarPar = () => {
        /*
            Agrega un nuevo par vacio a la lista de pares de materas
            Aclaraciones:
                -Se genera un id random el cual tienen todos los pares. Esto es el id que usa react para identificar cuando debe re-renderizar
        */
        const idNoDisponibles = paresCarreras.map(par => par.id);
        const generarIDRandom = () => {
            const idGenerado =  Math.floor(Math.random() * 10);
            return (idNoDisponibles.includes(idGenerado)) ? generarIDRandom() : idGenerado
        }
        const CARRERA_VACIA =  {id: (generarIDRandom()), shortCareer: { id: "", nombre:"" }, longCareer: { id: "", nombre:"" }}
        setParesCarreras([CARRERA_VACIA,...paresCarreras])
        editarDatosGenerales([CARRERA_VACIA,...paresCarreras])
    }

    /*
    const handleSave = () => {
        const paresCarrerasFormateados = paresCarreras.map( par => 
            ({longCareer:{
                    id: par.longCareer.id, 
                    nombre:par.longCareer.nombre
                }, 
                shortCareer:{
                    id: par.shortCareer.id, 
                    nombre: par.shortCareer.nombre
                }
            }))
    }
     */

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
                {/*Pares de carreras*/}
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
                    <h2 className="label">Pares carreras</h2>
                    <IconButton
                        sx={{ display: 'inline', width: 'auto', marginTop: '10px' }}
                        onClick={handleAgregarPar}>
                        <AddCircleIcon color="success" sx={{ fontSize: '48px' }} />
                    </IconButton>
                    <Button disabled={!sePuedeGuardar} variant="contained" color="success" startIcon={<SaveIcon />} onClick={guardarDatosGenerales}>
                        Guardar
                    </Button>
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
                    <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 'small' }}>Pregrado</Typography>
                    <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 'small' }}>Grado</Typography>
                    <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 'small' }}>Acciones</Typography>
                </Box>
                <Box sx={{
                    width: '1000px',
                    minWidth: '250px',
                }}>
                    {
                        paresCarreras.map((parCarreras) => 
                            <FilaParDeCarreras 
                                key={parCarreras.id} 
                                parDeCarrerasData={parCarreras} 
                                carrerasDisponibles={carrerasGuarani} 
                                editarParDeCarreras = {editarParDeCarreras} 
                                borrarParDeCarreras = {borrarParDeCarreras} 
                            />)
                    }
                </Box>
            </Box>
        </>
    );
}

export default ParesDeCarreras;
