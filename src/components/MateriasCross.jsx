import { Box , TextField, FormLabel, IconButton} from "@mui/material";
import DeleteIcon  from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import '../styles/MateriasCross.css';
import { useState } from "react";

export default function MateriasCross ({isEdit, title, array}){

    const [arrayB, setArrayB] = useState(array);
    
    const handleOnDeleteRow = (index) => {
        const updateArray = array.filter((_,i) => i != index);
        setArrayB(updateArray)
    }

    const handleOnAddRow = () => {
        const newRow = {year: "", campo: ""};
        setArrayB([...arrayB, newRow]);
    }
    return(
        <Box className='card-materia'>
            <h5 className="card-materia-title">{title}</h5>
                <div className="card-materia-item">
                    <FormLabel
                        sx={
                            {
                                fontWeight: 'bold',
                                maxWidth: 'calc(20% - 5px)', 
                                fontSize: '12px'
                            }
                    }>Año</FormLabel>
                    <FormLabel
                        sx={
                            {
                                fontWeight: 'bold',
                                maxWidth: 'calc(20% - 5px)', 
                                fontSize: '12px'
                            }
                    }>Campo</FormLabel>
                    {
                        isEdit && (
                            <IconButton
                                color='success'
                                sx={{ width: '25px' }}
                                onClick={handleOnAddRow} >
                                
                            <AddIcon />
                        </IconButton>
                        )
                    }
                        
                </div>
                    {
                        arrayB?.map( (registro, pos )=> (
                        <div className="card-materia-item" key={pos} index={pos}>
                            <TextField
                                defaultValue={registro.year}
                                variant='standard'
                                sx={
                                    {
                                        maxWidth: 'calc(20% - 5px)', 
                                        '& .MuiInputBase-input': { 
                                            fontSize: '12px', 
                                            textAlign: 'center' }
                                    }
                                }
                            inputProps={{readOnly: !isEdit}}/>

                            <TextField
                                defaultValue={registro.campo}
                                variant='standard'
                                sx={
                                    {
                                        maxWidth: 'calc(20% - 5px)', 
                                        '& .MuiInputBase-input': { 
                                            fontSize: '12px', 
                                            textAlign: 'center' }
                                    }
                                }
                                inputProps={{readOnly: !isEdit}}/>
                            {
                                isEdit && (
                                <IconButton
                                    sx={{ width: '25px' }}
                                    onClick={() => handleOnDeleteRow(pos)}> 
                                    <DeleteIcon
                                        fontSize="small"
                                        sx={{ color: 'red'}} />
                                </IconButton>
                                ) 
                            }                           
                        </div>
                        ))
                    }
        </Box>
    )
}