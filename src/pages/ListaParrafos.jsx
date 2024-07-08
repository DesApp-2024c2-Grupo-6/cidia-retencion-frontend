import React, { useState ,useEffect } from 'react';
import ParrafoPlantilla from '../components/ParrafoPlantilla';
import EdicionParrafo from '../components/EdicionParrafo';
import { Button, Box, Typography, Paper, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getAllParrafos, updateOneParrafo, deleteOneParrafo,createParrafo } from '../services/ParrafosService.js';



const ParagraphList = () => {
  const [parrafos, setParrafos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchParrafos = async () => {
      try {
        const response = await getAllParrafos();
        if (response.status === 200) {
          
          
          setParrafos(response.data.allParrafos[0]._rawData);
        } else {
          console.error('Error fetching paragraphs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching paragraphs:', error);
      }
    };
  
    fetchParrafos();
  }, []);


  const agregarParrafo = (clave, texto) => {
    const nuevoParrafo = { texto, clave };
    setParrafos([...parrafos, nuevoParrafo]);
  };

  const editarParrafo = async (index, newClave, newText) => {
    try {
      const updatedParrafo = { ...parrafos[index], key: newClave, text: newText };
      const response = await updateOneParrafo(updatedParrafo); // Llamar al backend para actualizar el párrafo
      
      if (response.status === 200) {
        const updatedParrafos = [...parrafos];
        updatedParrafos[index] = response.data; // Actualizar el párrafo en el estado local
        setParrafos(updatedParrafos);
        setEditIndex(null);
      } else {
        console.error('Error updating paragraph:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating paragraph:', error);
    }
  };

  const eliminarParrafo = async (id) => {
    try {
      const eliminado = await deleteOneParrafo(id);
      console.log('Parrafo eliminado:', eliminado);
      
      // Actualiza el estado de los párrafos después de eliminar
      const updatedParrafos = parrafos.filter(parrafo => parrafo._id !== id);
      setParrafos(updatedParrafos);
  
    } catch (error) {
      console.error('Error al eliminar el párrafo:', error);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    const oldIndex = e.dataTransfer.getData('index');
    const updatedParrafos = [...parrafos];
    const draggedParagraph = updatedParrafos[oldIndex];

    updatedParrafos.splice(oldIndex, 1);
    updatedParrafos.splice(newIndex, 0, draggedParagraph);

    setParrafos(updatedParrafos);
  };

  return (
    <Box
          sx={{

              display: 'flex',
              flexDirection: { xs: 'column' },
              alignItems: 'center',
              bgcolor: 'background.default',
              marginTop: 3,
              marginBottom: 3,
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Plantilla de E-mail
      </Typography>
      {editIndex === null ? (
        <>
          <Grid container spacing={2} sx={{ maxWidth: '1200px', width: '100%' }}>
            {parrafos?.map((paragraph, index) => (
              <Grid item xs={12} key={index}>
                <Paper
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  sx={{
                    padding: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#fafafa',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <ParrafoPlantilla
                    _id={paragraph._id}
                    text={paragraph.text}
                    clave={paragraph.key}
                    onEditClick={() => setEditIndex(index)}
                    onDelete={() => eliminarParrafo(paragraph._id)}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => agregarParrafo("", "")}
            sx={{ marginTop: '16px' }}
          >
            Añadir Párrafo
          </Button>
        </>
      ) : (
        <EdicionParrafo
          initialClave={parrafos[editIndex].clave}
          initialTexto={parrafos[editIndex].texto}
          onSave={(clave, texto) => editarParrafo(editIndex, clave, texto)}
          onCancel={() => setEditIndex(null)}
        />
      )}
    </Box>
  );
};

export default ParagraphList;