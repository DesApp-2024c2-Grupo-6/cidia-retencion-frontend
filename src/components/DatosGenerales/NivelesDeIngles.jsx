import React, { useState, useEffect } from 'react';
//Componentes MUI
import { Stack, Button, Box, IconButton, Typography, Autocomplete, TextField, Input } from '@mui/material';


const NivelesIngles = ({materias, editarDatosGenerales, nivelesInglesData}) => {


    const handleOnChange = (event, listaDeMateriasSeleccionadas) => editarDatosGenerales(listaDeMateriasSeleccionadas.map(materia => materia.id))


    return(
        <Box
        sx={{
            display: 'flex',
            flexDirection: { xs: 'column' },
            alignItems: 'center',
            bgcolor: 'background.default',
            marginTop: 8,
            marginBottom: 3
        }}>
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
                <h2 className="label">Niveles Inglés</h2><></>

            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: '1000px',
                width: '100%',
                margin: '0 auto',

            }}>
                <Stack  id = "smar" spacing={3}>
                <Autocomplete
                    multiple
                    id="select-ingles"
                    options={materias}
                    value={materias.filter(materia => nivelesInglesData.includes(materia.id))}
                    getOptionLabel={(option) => option.name + " #" + option.id.toString()}
                    onChange={handleOnChange}
                    renderInput={(params) => <TextField {...params} label="Niveles Inglés" variant="outlined" placeholder="Seleccione Materias" />}

                /> 
                </Stack>
                

            </Box>
        </Box>
    )
}

export default NivelesIngles