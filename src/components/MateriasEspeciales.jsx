import { Box , TextField, FormLabel, IconButton} from "@mui/material";
import DeleteIcon  from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import '../styles/MateriasCross.css';
import { useState, useEffect } from "react";
import React from "react";
import ConfirmarBorrado from "./ConfirmarBorrado";


export default function MateriasEspeciales (
    {isEdit, 
    title,
    array, 
    handleUpdateYear,
    handleUpdateCampo}){
        
    const [renderSubjects, setRenderSubjects] = useState(array);
    const handleOnDeleteRow = (index) => {
        const updateArray = renderSubjects.filter((_,i) => i != index);
        setRenderSubjects(updateArray) //actualizo estado local sino no cambia
        handleUpdateCampo(updateArray) //actualizo estado comp padre.
        handleCloseBorrado()
        if (renderSubjects ==[]){
            
        }
    }
    const handleOnAddRow = () => {
        const newRow = {year: "", campo: ""};
        setRenderSubjects([...renderSubjects, newRow]);
    }
    const [openBorrado, setOpenBorrado] = React.useState(Boolean);
    const [materiaEspecialABorrar, setMateriaEspecialABorrar] = React.useState({});

    const handleBorrado = (materia) =>{
      setOpenBorrado(true);
      setMateriaEspecialABorrar(materia);
     }

    const handleCloseBorrado = () => {
        setOpenBorrado(false);
        setMateriaEspecialABorrar({});
    }

    
    
    const handleInputChangeAnio = (e, pos, field) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        var updatedArray = renderSubjects.map( (item, index) =>  index === pos ? {...item, [field]: value} : item)
        setRenderSubjects(updatedArray)
        field === 'year' ? handleUpdateYear(updatedArray) : handleUpdateCampo(updatedArray);    
    }
    const handleInputChangeCampo = (e, pos, field) => {
        const value = e.target.value
        const updatedArray = renderSubjects.map( (item, index) =>  index === pos ? {...item, [field]: value} : item)
        setRenderSubjects(updatedArray)
        field === 'year' ? handleUpdateYear(updatedArray) : handleUpdateCampo(updatedArray);    
    }
    

    useEffect( () => {setRenderSubjects([...array])}, [array])

    return(
        <Box className='card-materia'>
            <ConfirmarBorrado openBorrado = {openBorrado} handleCloseBorrado = {handleCloseBorrado} funcionEliminar = {handleOnDeleteRow} elementoAEliminar = {materiaEspecialABorrar} textoBorrado = "¿Está seguro de que desea eliminar esta Materia?"     ></ConfirmarBorrado>
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
                    <IconButton
                        color='success'
                        disabled={!isEdit}
                        sx={{ width: '25px' }}
                        onClick={handleOnAddRow} >        
                            <AddIcon />
                    </IconButton>
                        
                    
                </div>
                    {
                        renderSubjects?.map( (register, pos )=> (
                        <div className="card-materia-item" key={pos} index={pos}>
                            <TextField
                                value={register.year}
                                variant='standard'
                                disabled={!isEdit}
                                onChange={(e) => handleInputChangeAnio(e,pos,'year')}
                                sx={
                                    {
                                        maxWidth: 'calc(30% - 5px)', 
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
                                onChange={(e) => handleInputChangeCampo(e,pos,'campo')}
                                sx={
                                    {
                                        maxWidth: 'calc(30% - 5px)', 
                                        '& .MuiInputBase-input': { 
                                            fontSize: '12px', 
                                            textAlign: 'center' }
                                    }
                                }

                            />
                            
                                <IconButton
                                    disabled={!isEdit}
                                    sx={{ width: '25px' }}
                                    onClick={() => handleBorrado(pos)}> 
                                    <DeleteIcon
                                        fontSize="small"
                                        sx={{ color: isEdit ? 'red' : 'grey'}} />
                                </IconButton>
                                 
                                                       
                        </div>
                        ))
                    }
        </Box>
    )
}