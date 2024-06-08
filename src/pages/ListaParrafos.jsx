import React, { useState } from 'react';
import ParrafoPlantilla from '../components/ParrafoPlantilla';
import EdicionParrafo from '../components/EdicionParrafo';
import { Button, Box, Typography, Fab, Paper, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const listadoPrueba = [
  {texto: "En función de tu recorrido académico en la carrera ${nombreDeLaCarrera}, te enviamos las siguientes sugerencias de inscripción para el próximo período.", clave: "intro", condiciones:[
    {
        codigo_condicion: 'SIEMPRE'
    },]}, 
  {texto: "Por un lado, considerando las materias que regularizaste hasta ahora, <i>te sugerimos</i> que consideres para " +
  "tu inscripción algunas de las siguientes materias, en función de las correlatividades de tu plan de estudios:"+
  ""+
  "${materiasCorrelativas}"+
  "<b><u>Aclaración</u></b>: "+
  "Si entre las sugerencias ves una materia que ya regularizaste o tenés en curso, no te preocupes, se debe a una cuestión administrativa interna.",
   clave: "materiasCorrelativas", condiciones:[
    {
        codigo_condicion: 'SIEMPRE'
    },
] },
  {texto: "Por otro lado, hemos notado que en tus últimos dos cuatrimestres " +
  "${cantidadMateriasInscriptoTotal} y ${cantidadMateriasRegularizadasTotal}. " +
  "Por lo tanto, para el próximo cuatrimestre <i>te sugerimos</i> que ${cantidadMateriasRecomendacion}${anualesQueSeRestan}."+
  "Es importante que consideres el tiempo que deberás dedicarle a cada materia, " +
  "tanto de cursada como por fuera de las clases, y el tiempo del que podrás disponer para el estudio." +
  "La planificación del cuatrimestre es un acto fundamental para el sostenimiento de la cursada en la universidad."
, clave: "recomendacionCantidadMaterias" ,condiciones:[
  {
      codigo_condicion: 'SIEMPRE'
  },
]},
  {texto: "Recordá que también podés cursar las siguientes materias comunes en cualquier momento de la carrera y que, " +
  "por su carga horaria semanal, pueden ser un buen complemento para materias con mayor carga teórica:"
  +
  "${materiasComunesPendientes}", clave: "materiasComunes",condiciones:[
    {
        codigo_condicion: 'MATERIAS_COMUNES'
    },
]},
  {texto: "Te sugerimos que no dejes para último momento la cursada de ${informaticaMateriasBasicas}; esto es importante " +
  "para incorporar otros conocimientos y fundamental para poder seguir avanzando en tu trayecto.", clave: "informatica1MateriasBasicas", condiciones:[
    {
        codigo_condicion: 'EN_CARRERA',
        config_condicion: { id_carreras: [21, 38], condicion_en_carrera: "incluye"}
    },
    {
        codigo_condicion: 'MATERIAS_NO_PENDIENTES',
        config_condicion: { id_materias: [578], cant: 1 }
    },
    {
        codigo_condicion: 'MATERIAS_PENDIENTES',
        config_condicion: { id_materias: [545, 546], cant: 1 }
    }
]},
  {texto: "Te sugerimos que por tu grado de avance en la carrera consideres hacer Inglés 1 dada " +
  "la importancia del idioma al momento de encarar materias avanzadas.", clave: "informatica2Ingles", condiciones:[
    {
        codigo_condicion: 'EN_CARRERA',
        config_condicion: { id_carreras: [21, 38], condicion_en_carrera: "incluye" }
    },
    {
        codigo_condicion: 'CANT_APROBADAS',
        config_condicion: { cant: 7 }
    },
    {
        codigo_condicion: 'MATERIAS_PENDIENTES',
        config_condicion: { id_materias: [31], cant: 1 }
    }
]},
  {texto: "Te sugerimos que no dejes para los últimos años la cursada de ${materiasNatacionFaltantes}. " +
  "Tené en cuenta esto, sobre todo, si no tenés experiencia en natación.", clave: "educFisica1Natacion", condiciones:[
    {
        codigo_condicion: 'EN_CARRERA',
        config_condicion: { id_carreras: [1], condicion_en_carrera: "incluye" }
    },
    {
        codigo_condicion: 'MATERIAS_PENDIENTES',
        config_condicion: { id_materias: [20, 26], cant: 1 }
    }
]},
  {texto: "Te sugerimos que no dejes para último momento la cursada de ${metalurgiaMateriasTroncalesAnio1Pendientes} del primer año; " +
  "esto es fundamental para poder seguir avanzando en tu trayectoria académica.", clave: "metalurgia1MateriasTroncalesAnio1", condiciones:[
    {
        codigo_condicion: 'EN_CARRERA',
        config_condicion: { id_carreras: [5, 31], condicion_en_carrera: "incluye" }
    },
    {
        codigo_condicion: 'MATERIAS_PENDIENTES',
        config_condicion: { id_materias: [160, 149], cant: 1 }
    }
]},
  {texto: "Asimismo, es importante que en la planificación de tu cursada consideres también " +
  "la preparación de los exámenes finales de las siguientes materias que ya tenés regularizadas:"
  +
  "${materiasConFinalPendiente}", clave: "finalesPendientes", condiciones:[
    {
        codigo_condicion: 'FINALES_PENDIENTES'
    },
]},
  {texto: "(1) Si no te presentás a rendir el final en los próximos llamados, se vencerá tu regularidad y deberás recursar la materia. " +
  "Para conocer las fechas de llamados a exámenes finales, podés consultar el Calendario Académico: " +
  "http://www.unahur.edu.ar/es/calendario-academico.", clave: "finalesFechasLimite",condiciones:[
    {
        codigo_condicion: 'LIMITE_FINALES_PENDIENTES'
    },
]},
  {texto: "<b>IMPORTANTE</b>: esta información podría no tener en cuenta los datos de la cursada inmediata anterior. " +
  "No te preocupes si eso sucede, la información está siendo procesada.", clave: "avisoImportante",condiciones:[
    {
        codigo_condicion: 'SIEMPRE'
    },
]},{texto: "Si necesitás asesoramiento en la planificación de tu carrera o acompañamiento para retomar tu cursada, " +
"podés acercarte a la Dirección de Orientación al Estudiante o también al Instituto que te corresponde.", clave: "orientacion",condiciones:[
  {
      codigo_condicion: 'ORIENTACION'
  },
]},

  {texto: "Si necesitás asesoramiento en la planificación de tu carrera o acompañamiento para retomar tu cursada, " +
  "podés acercarte a la Dirección de Orientación al Estudiante o también al Instituto que te corresponde.", clave: "orientacion"},
  {texto: "Frente a cualquier duda, podés comunicarte con la dirección del Instituto al que pertenece tu carrera. " +
  "En la UNAHUR estamos para acompañarte."+
  "Para referencia UNAHUR - DNI: ${dni}", clave: "final",condiciones:[
    {
        codigo_condicion: 'SIEMPRE'
    },
]}
];

const ParagraphList = () => {
  const [parrafos, setParrafos] = useState(listadoPrueba);
  const [editIndex, setEditIndex] = useState(null);

  const agregarParrafo = (clave, texto) => {
    const nuevoParrafo = { texto, clave };
    setParrafos([...parrafos, nuevoParrafo]);
  };

  const editarParrafo = (index, newClave, newText) => {
    const updatedParrafos = [...parrafos];
    updatedParrafos[index] = { texto: newText, clave: newClave };
    setParrafos(updatedParrafos);
    setEditIndex(null);
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

  if (parrafos.length === 0) {
    return (
      <Box
        sx={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          No hay párrafos para mostrar
        </Typography>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => agregarParrafo("", "")}
          sx={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
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
            {parrafos.map((paragraph, index) => (
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
                    text={paragraph.texto}
                    clave={paragraph.clave}
                    onEditClick={() => setEditIndex(index)}
                    onDelete={() => eliminarParrafo(index)}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => agregarParrafo("", "")}
            sx={{
              position: 'fixed',
              bottom: '16px',
              right: '16px',
            }}
          >
            <AddIcon />
          </Fab>
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