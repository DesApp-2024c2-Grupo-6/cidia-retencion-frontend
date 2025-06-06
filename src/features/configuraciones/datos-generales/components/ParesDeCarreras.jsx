import React, { useState} from 'react';
import FilaParDeCarreras from './FilaParDeCarreras.jsx'
//Componentes MUI
import { Button, Box, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//Iconos
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';

//Servicios
import ConfirmarBorrado from '@components/popups/ConfirmarBorrado.jsx'

//Context
import { useAlert } from '@context/AlertProvider';

function ParesDeCarreras({ paresCarrerasData, carrerasGuaraniData, editarDatosGenerales, guardarDatosGenerales, sePuedeGuardar, mensajeGuardado }) {
    /*
        Retorna la seccion donde se gestionan los pares de carreras
        Parametros:
            -paresCarrerasData - Lista de objetos - Lista que contiene los pares de carreras. Propiedad careerPairs de generalAcademicData
            -carrerasGuaraniData - Lista de objetos - Lista que las carreras de siu guarani.
            -editarDatosGenerales(nuevoValor) - Funcion - Funcion que edita la propiedad careerPairs de los datos generales
            -guardarDatosGenerales - Funcion - Funciona que hace un PUT para actualizar los datos generales en el BE
            -sePuedeGuardar - Booleano - Indica si los datos generales se pueden guardar
            -mensajeGuardado - String - Mensaje que indica si el documento se puede guardar o no y porque
    */

    paresCarrerasData = paresCarrerasData.map((par, index) => ({ id: index, ...par }))

    const theme = useTheme();

    const { showAlert } = useAlert()

    const [carrerasGuarani, setCarrerasGuarani] = useState(carrerasGuaraniData.map(carrera => ({ id: carrera.id, nombre: carrera.nombre })))
    const [paresCarreras, setParesCarreras] = useState(paresCarrerasData)

    const editarParDeCarreras = (nuevoPar) => {
        /*
            Edita un par de carreras segun los parametros recibidos
            Parametros
                - nuevoPar - Objeto - Nuevo par a agregar EJ: { id: 1, shortCareer: { id: 7, nombre:"Tecnicatura en nutricion" }, longCareer: { id: 13, nombre:"Licenciatura en alimentos" }
        */
        const paresEditados = paresCarreras.map(par => (par.id == nuevoPar.id) ? nuevoPar : par)
        setParesCarreras(paresEditados)
        const paresSinId = paresEditados.map(par => {
            const nuevoPar = { ...par }
            delete nuevoPar.id;
            return nuevoPar;
        })
        editarDatosGenerales(paresSinId)

    }
    const [openBorrado, setOpenBorrado] = React.useState(Boolean);
    const [parDeCarrerasABorrar, setParDeCarrerasABorrar] = React.useState({});

    const handleBorrado = (parrafo) => {
        setOpenBorrado(true);
        setParDeCarrerasABorrar(parrafo);
    }

    const handleCloseBorrado = () => {
        setOpenBorrado(false);
        setParrafoABorrar({});
    }

    const borrarParDeCarreras = (idABorrar) => {
        /*
            Borra un par de carreras segun el id dado
            Parametros
                - idABorrar - Numero - Id del objeto a borrar
        */
        const paresRestantes = paresCarreras.filter(par => (par.id != idABorrar))
        setParesCarreras(paresRestantes)
        const paresSinId = paresRestantes.map(par => {
            const nuevoPar = { ...par }
            delete nuevoPar.id;
            return nuevoPar;
        })
        editarDatosGenerales(paresSinId)
        handleCloseBorrado()

    }

    const handleAgregarPar = () => {
        /*
            Agrega un nuevo par vacio a la lista de pares de materas
            Aclaraciones:
                -Se genera un id random el cual tienen todos los pares. Esto es el id que usa react para identificar cuando debe re-renderizar
        */
        const idNoDisponibles = paresCarreras.map(par => par.id);

        const generarIDRandom = (valorInicial) => {
            const idGenerado = valorInicial
            return (idNoDisponibles.includes(idGenerado)) ? generarIDRandom(valorInicial + 1) : idGenerado
        }
        const CARRERA_VACIA = { id: (generarIDRandom(idNoDisponibles.length)), shortCareer: { id: "", nombre: "" }, longCareer: { id: "", nombre: "" } }
        setParesCarreras([CARRERA_VACIA, ...paresCarreras])
        editarDatosGenerales([CARRERA_VACIA, ...paresCarreras])
    }

    const handleGuardarDatosGenerales = () => {
        showAlert('Datos generales guardados!', 'success')
        guardarDatosGenerales()
    }
    

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column' },
                alignItems: 'center',
                marginTop: 8,
                marginBottom: 3
            }}>
                <ConfirmarBorrado
                    openBorrado={openBorrado}
                    handleCloseBorrado={handleCloseBorrado}
                    funcionEliminar={borrarParDeCarreras}
                    elementoAEliminar={parDeCarrerasABorrar}
                    textoBorrado="¿Está seguro de que desea eliminar este par de carreras?">
                </ConfirmarBorrado>
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

                    <Typography sx={{fontWeight: 'bold' }} variant="h6" component="h1" gutterBottom>
                        Pares de carreras
                    </Typography>
                    <IconButton
                        sx={{ display: 'inline', width: 'auto', marginTop: '10px' }}
                        onClick={handleAgregarPar}>
                        <AddCircleIcon color="success" sx={{ fontSize: '48px' }} />
                    </IconButton>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 'small',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginBottom: '5px',
                                color: (mensajeGuardado == "Hay cambios sin guardar") ? theme.palette.primary.light : theme.palette.error.main
                            }}
                        >{mensajeGuardado}
                        </Typography>
                        <Button disabled={!sePuedeGuardar} variant="contained" color="success" startIcon={<SaveIcon />} onClick={handleGuardarDatosGenerales}>
                            Guardar
                        </Button>
                    </Box>
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
                    <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 'small'}}>Grado</Typography>
                    <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 'small'}}></Typography>
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
                                editarParDeCarreras={editarParDeCarreras}
                                borrarParDeCarreras={handleBorrado}
                            />)
                    }
                </Box>
            </Box>
        </>
    );
}

export default ParesDeCarreras;
