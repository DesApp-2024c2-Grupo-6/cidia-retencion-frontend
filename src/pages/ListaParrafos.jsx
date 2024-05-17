import React, { useState } from 'react';
import ParrafoPlantilla from '../components/ParrafoPlantilla';
import { Button } from '@mui/material';

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
    <div>
      {parrafo.map((paragraph, index) => (
        <div
          key={paragraph.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          <ParrafoPlantilla
            text={paragraph.text}
            onEdit={(newText) => editarParrafo(index, newText)}
            onDelete={() => eliminarParrafo(index)}
          />
        </div>
      ))}
      <Button variant="contained" onClick={agregarParrafo}>
        Añadir Comunicado
      </Button>
    </div>
  );
};
export default ParagraphList;