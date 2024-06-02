import { Box , TextField, FormLabel, IconButton} from "@mui/material";
import DeleteIcon  from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import '../styles/MateriasCross.css';
import { useState, useEffect } from "react";
import { update } from "lodash";

export default function MateriasEspeciales ({isEdit, title, array}){

    const [arrayB, setArrayB] = useState(array);
    const [year, setYear] = useState(0);
    const [campo, setCampo] = useState("-");

    const handleOnDeleteRow = (index) => {
        const updateArray = arrayB.filter((_,i) => i != index);
        setArrayB(updateArray)
    }

    const handleOnAddRow = () => {
        const newRow = {year: year, campo: campo};
        setArrayB([...arrayB, newRow]);
    
    }


    useEffect( () => {setArrayB([...array])}, [array])
    return(
        <Box className='card-materia'>
            <h5 className="card-materia-title">{title}</h5>
                <div className="card-materia-item">
                    <FormLabel
                    sx={
                        {
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }
                }
                        >Año</FormLabel>
                    <FormLabel
                        sx={
                          {
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }
                    }
                    >Campo</FormLabel>
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
                                value={registro.year}
                                variant='standard'
                                disabled={!isEdit}
                                sx={
                                    {
                                        maxWidth: 'calc(20% - 5px)', 
                                        '& .MuiInputBase-input': { 
                                            fontSize: '12px', 
                                            textAlign: 'center' }
                                    }
                                }
                                onChange={(event) => {
                                    const updatedArray = update(arrayB, { [pos]: { year: { $set: event.target.value } } });
                                    setArrayB(updatedArray);
                                  }}
                            />
                            <TextField
                                value={registro.campo}
                                variant='standard'
                                disabled={!isEdit}
                                sx={
                                    {
                                        maxWidth: 'calc(30% - 5px)', 
                                        '& .MuiInputBase-input': { 
                                            fontSize: '12px', 
                                            textAlign: 'center' }
                                    }
                                }
                                onChange={(event) => {
                                    const updatedArray = update(arrayB, { [pos]: { campo: { $set: event.target.value } } });
                                    setArrayB(updatedArray);
                                  }}
                            />
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