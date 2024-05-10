import React, { useState } from 'react';
import ParrafoPlantilla from './ParrafoPlantilla';

const ParagraphList = () => {
  const [paragraphs, setParagraphs] = useState([]);

  const addParagraph = () => {
    const newParagraph = {
      id: paragraphs.length + 1,
      text: `Párrafo ${paragraphs.length + 1}`
    };
    setParagraphs([...paragraphs, newParagraph]);
  };

  const editParagraph = (index, newText) => {
    const updatedParagraphs = [...paragraphs];
    updatedParagraphs[index].text = newText;
    setParagraphs(updatedParagraphs);
  };

  const deleteParagraph = (index) => {
    const updatedParagraphs = [...paragraphs];
    updatedParagraphs.splice(index, 1);
    setParagraphs(updatedParagraphs);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    const oldIndex = e.dataTransfer.getData('index');
    const updatedParagraphs = [...paragraphs];
    const draggedParagraph = updatedParagraphs[oldIndex];

    updatedParagraphs.splice(oldIndex, 1);
    updatedParagraphs.splice(newIndex, 0, draggedParagraph);

    setParagraphs(updatedParagraphs);
  };

  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <div
          key={paragraph.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          <ParrafoPlantilla
            text={paragraph.text}
            onEdit={(newText) => editParagraph(index, newText)}
            onDelete={() => deleteParagraph(index)}
          />
        </div>
      ))}
      <button variant="contained" onClick={addParagraph}>Añadir Párrafo</button>
    </div>
  );
};

export default ParagraphList;