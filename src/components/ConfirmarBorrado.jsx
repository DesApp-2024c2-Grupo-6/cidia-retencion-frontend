import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box, IconButton, Tooltip, Table } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';



const ConfirmarBorrado = (props) =>{
    const {openBorrado,handleCloseBorrado,funcionEliminar,elementoAEliminar,textoBorrado} = props
    return(
    <Modal
        open={openBorrado}
        onClose={handleCloseBorrado}
    >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'block',
            borderRadius: 3
        }}>
            <Box
                sx={{
                    textAlign: "center",
                    marginBottom: '10px'
                }}>
                    <Typography variant="h6" sx>
                        {textoBorrado}
                    </Typography>
            </Box>
            <Box 
                            variant='contained'
                            sx={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '20px', 
                                    margin: '15px 15px 0px 15px', 
                                    boxShadow: 'none'
                                }}
            >
                <Button variant="contained" color="error" onClick={() => funcionEliminar(elementoAEliminar)}>
                    Eliminar
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleCloseBorrado()}>
                    Cancelar
            </Button>
            </Box>
        </Box>
    
    </Modal>)
}


   




export default ConfirmarBorrado;