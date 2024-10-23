import React, { useState, useEffect } from 'react';
//Componentes MUI
import { Button, Box, IconButton, Typography, Autocomplete, TextField, Input } from '@mui/material';
//Iconos
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function FilaMateriaComun({ materiaComunData, materiasDisponibles, editarMateriaComun, borrarMateriaComun }) {
    /*
        Retorna una fila con una el nombre de una materia, sun nombre especial y sus acciones de editar y borrar
        Parametros:
            -materiaComunData - Objeto - EJ:  { idLista: 1, id: 4, name: "Nuevos Entornos", realName:"Nuevos entornos y lenguajes: la produccion de conocimiento digital" },
            -materiasDisponibles - Objeto - Lista de materias traidas de la api de guarani
            -editarMateriaComun(nuevaMateria) - Funcion - Funcion que edita un objeto de la lista de materias comunes
            -borrarMateriaComun(idListaABorrar) - Funcion - Funcion que borra un objeto de la lista de materias comunes
        Retorna: JSX
    */
    const [estaSiendoEditado, setEstaSiendoEditado] = useState(false)

    const [materiaComun, setMateriaComun] = useState(materiaComunData)
    const [materiaEditada, setMateriaEditada] = useState(materiaComunData)

    const handleEditButtonClick = () => setEstaSiendoEditado(true)
    const handleDeleteButtonClick = () => borrarMateriaComun(materiaComun.idLista)

    const handleCancelarButtonClick = () => {
        setMateriaEditada(materiaComun)
        setEstaSiendoEditado(false)
    }
    const handleGuardarButtonClick = () => {
        setMateriaComun(materiaEditada)
        editarMateriaComun(materiaEditada)
        setEstaSiendoEditado(false)

    }

    const handleMateriaIdChange = (event, nuevaMateria) => setMateriaEditada({ ...materiaEditada, realName: nuevaMateria.name, id: nuevaMateria.id })
    const handleMateriaNameChange = (event) => setMateriaEditada({ ...materiaEditada, name: event.target.value })



    const VerFilaMateriaComun = () => {
        return (
            <>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 'small' }}>{materiaComun.realName}</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 'small' }}>{materiaComun.name}</Typography>
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

    return (
        <Box sx={{
            width: '1000px',
            minWidth: '250px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'space-between',
            borderBottom: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: '#dedede',
            paddingY: '10px',
            verticalAlign: 'center'
        }}>
            {
                !estaSiendoEditado
                    ? <VerFilaMateriaComun />
                    : (
                        <>{/*EditarFilaMateriaComun -> Teniamos problemas si lo renderizamos en su propio hook como hicimos mas arriba*/}
                            <Autocomplete
                                sx={{ flex: 1, textAlign: 'center', margin: 'auto', fontWeight: 'bold', fontSize: 'small', "& .MuiInputBase-root": { height: "30px" }, paddingLeft: "4px" }}
                                disablePortal
                                disableClearable
                                options={materiasDisponibles}
                                value={({id: materiaEditada.id, name: materiaEditada.realName})}
                                getOptionLabel={op => op.name}
                                getOptionKey={op => op.id}
                                onChange={handleMateriaIdChange}
                                freeSolo
                                renderInput={(params) => <TextField {...params} label="" sx={{ fontSize: 'small' }} />}
                            />
                            <Input
                                sx={{ flex: 1, textAlign: 'center', margin: 'auto', fontWeight: 'bold', fontSize: 'small', "& .MuiInputBase-root": { height: "30px" }, paddingLeft: "4px" }}
                                aria-label="Input Special name"
                                placeholder="Ingrese el nombre especial"
                                value={materiaEditada.name}
                                onChange={handleMateriaNameChange}
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
        </Box>
    )
}

export default FilaMateriaComun