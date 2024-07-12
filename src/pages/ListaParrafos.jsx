import React, { useState, useEffect } from 'react';
import ParrafoPlantilla from '../components/ParrafoPlantilla';
import EdicionParrafo from '../components/EdicionParrafo';
import { Button, Box, Typography, Paper, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getAllParrafos, updateOneParrafo, deleteOneParrafo, createParrafo } from '../services/ParrafosService.js';

const ParagraphList = () => {
  const [parrafos, setParrafos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [cond, setCond] = useState([]); //Cris
  useEffect(() => {
    const fetchParrafos = async () => {
      try {
        const response = await getAllParrafos();
        if (response.status === 200) {
          const data = response.data.allParrafos[0]._rawData;
          if (Array.isArray(data)) {
            setParrafos(data);
          } else {
            console.error('Data fetched is not an array:', data);
          }
        } else {
          console.error('Error fetching paragraphs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching paragraphs:', error);
      }
    };

    fetchParrafos();
  }, []);

  const agregarParrafo = async (clave = "ejemplo_de_clave", texto = "Este es un ejemplo de texto para el párrafo.") => {
    console.log('Agregando párrafo:', { clave, texto });
    try {
      const response = await createParrafo({
        parrafoId: '668f20a4fb3e34d777eb3e1a', //Aca tocar por el id 
        nuevaClave: clave,
        nuevoTexto: texto
      });
      console.log('Response from createParrafo:', response);
      setParrafos([...parrafos, { key: clave, text: texto }]);
    } catch (error) {
      console.error('Error creating paragraph:', error);
    }
  };

  const editarParrafo = async (index, newClave, newText, condi) => { //Cris
    try {
      const updatedParrafo = {
        key: parrafos[index].key,
        updateFields: {
          key: newClave,
          text: newText,
          condition: condi //Cris
        }
      };
      console.log(updatedParrafo)
      const response = await updateOneParrafo(updatedParrafo);
      console.log('Response from backend:', response);
  
      if (response && response.message === 'Párrafo actualizado correctamente') {
        const updatedParrafos = [...parrafos];
        updatedParrafos[index].key = newClave;
        updatedParrafos[index].text = newText;
        setParrafos(updatedParrafos);
        setEditIndex(null);
      } else {
        console.error('Error updating paragraph:', response && response.message);
      }
    } catch (error) {
      console.error('Error updating paragraph:', error);
    }
  };

  const eliminarParrafo = async (key) => {
    try {
      const response = await deleteOneParrafo(key);
      console.log('Parrafo eliminado:', response);

      if (response.status === 200) {
        setParrafos(parrafos.filter(parrafo => parrafo.key !== key));
      } else {
        console.error('Error al eliminar el párrafo:', response.statusText);
      }
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
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.default',
        marginTop: 3,
        marginBottom: 3,
        padding: '20px',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Plantilla de E-mail
      </Typography>
      {editIndex === null ? (
        <>
          {Array.isArray(parrafos) && parrafos.map((paragraph, index) => (
            <Grid item xs={12} key={index} sx={{ marginTop: '16px', width: '100%' }}>
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
                  text={paragraph.text}
                  clave={paragraph.key}
                  onEditClick={() => setEditIndex(index)}
                  onDelete={() => eliminarParrafo(paragraph.key)}
                />
              </Paper>
            </Grid>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => agregarParrafo("ejemplo de Clave","ejemplo de texto")}
            sx={{ marginTop: '16px' }}
          >
            Añadir Párrafo
          </Button>
        </>
      ) : (
        <EdicionParrafo
          initialClave={parrafos[editIndex].key}
          initialTexto={parrafos[editIndex].text}
          onSave={(clave, texto) => editarParrafo(editIndex, clave, texto, cond)} //Cris
          onCancel={() => setEditIndex(null)}
          condiciones = {parrafos[editIndex].conditions} //Cris
        />
      )}
    </Box>
  );
};

export default ParagraphList;