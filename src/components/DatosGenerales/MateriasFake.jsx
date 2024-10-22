import React, { useState, useEffect } from 'react';
//Componentes MUI
import { Button,Stack, Box, IconButton, Typography, Autocomplete, TextField, Input } from '@mui/material';

import { CloseRounded } from '@mui/icons-material';
const MateriasFake = ({materias}) => {

    const [materiasFakeSeleccionadas, setMateriasFakeSeleccionadas] = React.useState([])


    const handleOnChange = (event, listaDeMateriasSeleccionadas) =>{
        setMateriasFakeSeleccionadas(listaDeMateriasSeleccionadas)
    }


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
                    <h2 className="label">Materias Fake</h2><></>
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
                    getOptionLabel={(option) => option.subjectName}
                    onChange={handleOnChange}
                    renderInput={(params) => <TextField {...params} label="Materias Fake" variant="outlined" placeholder="Seleccione Materias" />}

                /> 
                
                   
                
                </Stack>
                

            </Box>
        </Box>
        
        
        
    )
}

export default MateriasFake