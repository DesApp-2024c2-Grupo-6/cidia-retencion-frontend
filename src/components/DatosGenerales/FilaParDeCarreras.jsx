import React, { useState, useEffect } from 'react';
//Componentes MUI
import { Button, Box, IconButton, Typography, Autocomplete, TextField } from '@mui/material';
//Iconos
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function FilaParDeCarreras({ parDeCarrerasData, carrerasDisponibles, editarParDeCarreras, borrarParDeCarreras}) {
    /*
        Retorna una fila con una carrera de pregrado, su carrera de grado y sus acciones de editar y borrar
        Parametros:
            -parDeCarrerasData - Objeto - EJ:  { shortCareer: { id: 21 }, longCareer: { id: 38 } }
            -carrerasDisponibles - Objeto - Lista de carreras traidas de la api de guarani
            -editarParDeCarreras(id, nuevoPar) - Funcion - Funcion que edita un objeto de la lista de pares de carreras
            -borrarParDeCarreras(idABorrar) - Funcion - Funcion que borra un objeto de la lista de pares de carreras
        Retorna: JSX
    */
    const [estaSiendoEditado, setEstaSiendoEditado] = useState(false)

    const [parCarreras, setParCarreras] = useState(parDeCarrerasData)
    const [parCarrerasEditadas, setParCarrerasEditadas] = useState(parDeCarrerasData)

    const handleEditButtonClick = () => setEstaSiendoEditado(true)
    const handleDeleteButtonClick = () => borrarParDeCarreras(parCarreras.id)

    const handleCancelarButtonClick = () => {
        setParCarrerasEditadas(parCarreras)
        setEstaSiendoEditado(false)
    }
    const handleGuardarButtonClick = () => {
        setParCarreras(parCarrerasEditadas)
        editarParDeCarreras(parCarrerasEditadas)
        setEstaSiendoEditado(false)
        
    }

    const handleShortCareerChange = (event, nuevaCarrera) => setParCarrerasEditadas({...parCarrerasEditadas, shortCareer: nuevaCarrera})
    const handleLongCareerChange = (event, nuevaCarrera) => setParCarrerasEditadas({...parCarrerasEditadas, longCareer: nuevaCarrera})
    


    const VerFilaParDeCarreras = () => {
        return (
            <>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 'small' }}>{parCarreras.shortCareer.nombre}</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 'small' }}>{parCarreras.longCareer.nombre}</Typography>
                <Box sx={{ flex: 1, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton
                        sx={{ width: '20px', height: '20px', padding: '17px', backgroundColor: 'green' }}
                        onClick={handleEditButtonClick}>
                        <EditIcon sx={{ color: 'white', fontSize: '20px' }} />
                    </IconButton>
                    <IconButton
                        sx={{ width: '20px', height: '20px', padding: '17px', backgroundColor: 'red' }}
                        onClick={handleDeleteButtonClick}>
                        <DeleteIcon sx={{ color: 'white', fontSize: '20px' }} />
                    </IconButton>
                </Box>
            </>
        )
    }

    const EditarFilaParDeCarreras = () => {
        return (
            <>
                <Autocomplete
                    sx={{ flex: 1, textAlign: 'center',margin:'auto', fontWeight: 'bold', fontSize: 'small',  "& .MuiInputBase-root": { height: "30px"}, paddingLeft:"4px" }}
                    disablePortal
                    disableClearable
                    options={carrerasDisponibles}
                    value={parCarrerasEditadas.shortCareer}
                    getOptionLabel={op => op.nombre}
                    getOptionKey={op => op.id}
                    onChange={handleShortCareerChange}
                    freeSolo
                    renderInput={(params) => <TextField {...params} label="" sx={{fontSize:'small'}}  />}
                />
                <Autocomplete
                    sx={{ flex: 1, textAlign: 'center', margin:'auto', fontWeight: 'bold', fontSize: 'small',  "& .MuiInputBase-root": { height: "30px" }, paddingLeft:"4px" }}
                    disablePortal
                    disableClearable
                    value={parCarrerasEditadas.longCareer}
                    options={carrerasDisponibles}
                    getOptionLabel={op => op.nombre}
                    getOptionKey={op => op.id}
                    onChange={handleLongCareerChange}
                    freeSolo
                    renderInput={(params) => <TextField {...params} label=""  />}
                />
                <Box sx={{ flex: 1, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton
                        sx={{ width: '20px', height: '20px', padding: '17px', backgroundColor: 'green' }}
                        onClick={handleGuardarButtonClick}>
                        <SaveIcon sx={{ color: 'white', fontSize: '20px' }} />
                    </IconButton>
                    <IconButton
                        sx={{ width: '20px', height: '20px', padding: '17px', backgroundColor: 'cornflowerBlue' }}
                        onClick={handleCancelarButtonClick}>
                        <ArrowBackIcon sx={{ color: 'white', fontSize: '20px' }} />
                    </IconButton>
                </Box>
            </>
        )
    }
    return (
        <Box sx={{
            width: '1000px',
            minWidth: '250px',
            display: 'flex',
            gap:'10px',
            justifyContent: 'space-between',
            borderBottom: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: '#dedede',
            paddingY: '10px',
            verticalAlign: 'center'
        }}>
            {
                estaSiendoEditado
                    ? <EditarFilaParDeCarreras />
                    : <VerFilaParDeCarreras />
            }
        </Box>
    )
}

export default FilaParDeCarreras