import React, { useState } from 'react';
import ParrafoPlantilla from '../components/ParrafoPlantilla';
import { Button, Box, Container, Typography } from '@mui/material';

const ParagraphList = () => {
  const [parrafo, setParrafo] = useState([]);

  const agregarParrafo = () => {
    const nuevoParrafo = {
      id: parrafo.length + 1,
      text: `Comunicado ${parrafo.length + 1}`
    };
    setParrafo([...parrafo, nuevoParrafo]);
  };

  const editarParrafo = (index, newText) => {
    const updatedParrafos = [...parrafo];
    updatedParrafos[index].text = newText;
    setParrafo(updatedParrafos);
  };

  const eliminarParrafo = (index) => {
    const updatedParrafos = [...parrafo];
    updatedParrafos.splice(index, 1);
    setParrafo(updatedParrafos);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    const oldIndex = e.dataTransfer.getData('index');
    const updatedParrafos = [...parrafo];
    const draggedParagraph = updatedParrafos[oldIndex];

    updatedParrafos.splice(oldIndex, 1);
    updatedParrafos.splice(newIndex, 0, draggedParagraph);

    setParrafo(updatedParrafos);
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Plantilla de E-mail
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {parrafo.map((paragraph, index) => (
          <Box
            key={paragraph.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            sx={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fafafa',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ParrafoPlantilla
              text={paragraph.text}
              onEdit={(newText) => editarParrafo(index, newText)}
              onDelete={() => eliminarParrafo(index)}
            />
          </Box>
        ))}
      </Box>
      <Button variant="contained" onClick={agregarParrafo}>
        Añadir Comunicado
      </Button>
    </Container>
  );
};

export default ParagraphList;