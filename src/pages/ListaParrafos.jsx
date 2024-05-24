import React, { useState } from 'react';
import ParrafoPlantilla from '../components/ParrafoPlantilla';
import { Button, Box, Container, Typography } from '@mui/material';

const listadoPrueba = [
  {texto: "En función de tu recorrido académico en la carrera ${nombreDeLaCarrera}, te enviamos las siguientes sugerencias de inscripción para el próximo período.", clave: "intro"}, 
  {texto: "patricio", clave: "materiasCorrelativas" },
  {texto: "patricio", clave: "recomendacionCantidadMaterias" },
  {texto: "Recordá que también podés cursar las siguientes materias comunes en cualquier momento de la carrera y que, " +
  "por su carga horaria semanal, pueden ser un buen complemento para materias con mayor carga teórica:"
  +
  "${materiasComunesPendientes}", clave: "materiasComunes"},
  {texto: "Te sugerimos que no dejes para último momento la cursada de ${informaticaMateriasBasicas}; esto es importante " +
  "para incorporar otros conocimientos y fundamental para poder seguir avanzando en tu trayecto.", clave: "informatica1MateriasBasicas"},
  {texto: "Te sugerimos que por tu grado de avance en la carrera consideres hacer Inglés 1 dada " +
  "la importancia del idioma al momento de encarar materias avanzadas.", clave: "informatica2Ingles"},
  {texto: "Te sugerimos que no dejes para los últimos años la cursada de ${materiasNatacionFaltantes}. " +
  "Tené en cuenta esto, sobre todo, si no tenés experiencia en natación.", clave: "educFisica1Natacion"},
  {texto: "Te sugerimos que no dejes para último momento la cursada de ${metalurgiaMateriasTroncalesAnio1Pendientes} del primer año; " +
  "esto es fundamental para poder seguir avanzando en tu trayectoria académica.", clave: "metalurgia1MateriasTroncalesAnio1"},
  {texto: "Asimismo, es importante que en la planificación de tu cursada consideres también " +
  "la preparación de los exámenes finales de las siguientes materias que ya tenés regularizadas:"
  +
  "${materiasConFinalPendiente}", clave: "finalesPendientes"},
  {texto: "(1) Si no te presentás a rendir el final en los próximos llamados, se vencerá tu regularidad y deberás recursar la materia. " +
  "Para conocer las fechas de llamados a exámenes finales, podés consultar el Calendario Académico: " +
  "http://www.unahur.edu.ar/es/calendario-academico.", clave: "finalesFechasLimite"},
  {texto: "<b>IMPORTANTE</b>: esta información podría no tener en cuenta los datos de la cursada inmediata anterior. " +
  "No te preocupes si eso sucede, la información está siendo procesada.", clave: "avisoImportante"},
  {texto: "Si necesitás asesoramiento en la planificación de tu carrera o acompañamiento para retomar tu cursada, " +
  "podés acercarte a la Dirección de Orientación al Estudiante o también al Instituto que te corresponde.", clave: "orientacion"},
  {texto: "Frente a cualquier duda, podés comunicarte con la dirección del Instituto al que pertenece tu carrera. " +
  "En la UNAHUR estamos para acompañarte."+
  "Para referencia UNAHUR - DNI: ${dni}", clave: "final"}
];

const ParagraphList = () => {
  const [parrafos, setParrafos] = useState(listadoPrueba); // Inicializamos el estado con listadoPrueba

  const agregarParrafo = () => {
    const nuevoParrafo = {
      id: parrafos.length + 1,
      text: `Comunicado ${parrafos.length + 1}`,
      clave: "" // Agregamos un campo para la clave, inicialmente vacío
    };
    setParrafos([...parrafos, nuevoParrafo]);
  };

  const editarParrafo = (index, newText, newClave) => {
    const updatedParrafos = [...parrafos];
    updatedParrafos[index].text = newText;
    updatedParrafos[index].clave = newClave; // Actualizamos el valor de la clave
    setParrafos(updatedParrafos);
  };

  const eliminarParrafo = (index) => {
    const updatedParrafos = [...parrafos];
    updatedParrafos.splice(index, 1);
    setParrafos(updatedParrafos);
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
        {parrafos.map((paragraph, index) => (
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
              text={paragraph.texto}
              clave={paragraph.clave} // Pasamos la clave como una propiedad al componente ParrafoPlantilla
              onEdit={(newText, newClave) => editarParrafo(index, newText, newClave)}
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