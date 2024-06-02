import { Box , TextField, FormLabel, IconButton} from "@mui/material";
import DeleteIcon  from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import '../styles/MateriasCross.css';
import { useState, useEffect } from "react";
import { update } from "lodash";

export default function MateriasEspeciales ({isEdit, title, array}){

    const [renderSubjects, setRenderSubjects] = useState(array);
    const [year, setYear] = useState(0);
    const [campo, setCampo] = useState("-");

    const handleOnDeleteRow = (index) => {
        const updateArray = renderSubjects.filter((_,i) => i != index);
        setRenderSubjects(updateArray)
    }

    const handleOnAddRow = () => {
        const newRow = {year: year, campo: campo};
        setRenderSubjects([...renderSubjects, newRow]);
    
    }

    useEffect( () => {setRenderSubjects([...array])}, [array])

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
                        renderSubjects?.map( (register, pos )=> (
                        <div className="card-materia-item" key={pos} index={pos}>
                            <TextField
                                value={register.year}
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

                            />
                            <TextField
                                value={register.campo}
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