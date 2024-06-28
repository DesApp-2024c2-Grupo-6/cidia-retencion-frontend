import { React } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function Materia({data}) {

    const handleOnClickDelete = () => {
        console.log("Hola")
    }
    return(
        <Box
            sx={{
            display: 'flex',
            '&:nth-of-type(odd)': {
                backgroundColor: '#f9f9f9',
            },
            '&:nth-of-type(even)': {
                backgroundColor: '#ffffff',
            },
            }}
      >
        <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px' }}>{data.id_materia}</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px' }}>{data.anio}</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px' }}>{data.campo}</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px' }}>{data.nombreMateria}</Typography>
        <Box sx={{ flex: 1.5, textAlign: 'center', padding: '8px', display: 'flex', justifyContent: 'center', gap: 1 }}>
            <IconButton
                sx={{ width: '25px' }}
                onClick={handleOnClickDelete}> 
                <DeleteIcon sx={{ color: 'red'}} />
            </IconButton>
            <IconButton
             sx={{ width: '25px' }}
                onClick={() => handleOnClickDelete}> 
                <EditIcon sx={{color: 'blue'}} />
            </IconButton>
        </Box>
      </Box>
    )
}

export default Materia;