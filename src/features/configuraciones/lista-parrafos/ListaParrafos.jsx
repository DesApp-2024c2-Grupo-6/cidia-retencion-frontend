import React, { useState, useEffect } from 'react';
import ParrafoPlantilla from './components/ParrafoPlantilla';
import EdicionParrafo from './components/EdicionParrafo';

import { Box, Typography, Paper, Grid, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles';


//Context
import { useAlert } from '@context/AlertProvider';


import ConfirmarBorrado from '@components/popups/ConfirmarBorrado.jsx';
import { getAllParrafos, updateOneParrafo, updateAllParrafos, deleteOneParrafo, createParrafo } from '@services/ParrafosService.js';

const ParagraphList = () => {
  const [parrafos, setParrafos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  //Hooks
  const theme = useTheme()
  const { showAlert } = useAlert()

  const hayParrafoIncompleto = parrafos && parrafos.some(parrafo => parrafo.key == "" || parrafo.text == "")

  useEffect(() => {
    const fetchParrafos = async () => {
      try {
        const response = await getAllParrafos();
        if (response.status === 200) {
          const data = response.data.allParrafos[0]._rawData;
          if (Array.isArray(data)) {
            setParrafos(data)
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
  }, [editIndex]);

  const agregarParrafo = async () => {
    const clave = ``
    const texto = ``
    const response = await createParrafo({ nuevaClave: clave, nuevoTexto: texto });
    console.log(response)
    if (response.status == 200) {
      //El nuevo parrafo se agrega al principio de la lista
      const nuevoParrafo = response.data.parrafosData._rawData[0];
      setParrafos([nuevoParrafo, ...parrafos])
      setEditIndex(0)
    }
    else
      console.error('Error: No se pudo crear el parrafo', response);
  };

  const editarParrafo = async (parrafo) => {
    const response = await updateOneParrafo(parrafo);
    if (response.status == 200)
      console.log("Parrafo editado")
    else
      console.log("Error:" + response)
    setEditIndex(null);
  }

  const eliminarParrafo = async (key) => {
    try {
      handleCloseBorrado()
      const response = await deleteOneParrafo(key);
      console.log('Parrafo eliminado:', response);

      if (response.status === 200) {
        setParrafos(parrafos.filter(parrafo => parrafo.key !== key));
        showAlert('¡Párrafo eliminado!', 'error')
      } else {
        console.error('Error al eliminar el párrafo:', response.statusText);
        showAlert('Error: El parrafo no se pudo eliminar', 'error')

      }
    } catch (error) {
      console.error('Error al eliminar el párrafo:', error);
    }
  };

  const guardarOrdenParrafos = async (listaParrafos) => await updateAllParrafos({ parrafos: listaParrafos })

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
    guardarOrdenParrafos(updatedParrafos)
  };
  const [openBorrado, setOpenBorrado] = React.useState(Boolean);
  const [parrafoABorrar, setParrafoABorrar] = React.useState({});

  const handleBorrado = (parrafo) => {
    setOpenBorrado(true);
    setParrafoABorrar(parrafo);
  }

  const handleCloseBorrado = () => {
    setOpenBorrado(false);
    setParrafoABorrar({});
  }

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
      <ConfirmarBorrado openBorrado={openBorrado} handleCloseBorrado={handleCloseBorrado} funcionEliminar={eliminarParrafo} elementoAEliminar={parrafoABorrar} textoBorrado="¿Está seguro de que desea eliminar este párrafo?"></ConfirmarBorrado>
      <Typography sx={{marginBottom:'10px', fontWeight: '500'}} variant="h4" component="h1" gutterBottom >
        Plantillas de E-mail
      </Typography>
      {editIndex === null ? (
        <>
          <IconButton
            sx={{ display: 'inline', width: 'auto'}}
            onClick={() => agregarParrafo()}
            disabled={hayParrafoIncompleto}
          >
            <AddCircleIcon color={(hayParrafoIncompleto) ? "disabled" : "success"} sx={{ fontSize: '44px' }} />
          </IconButton>
          {hayParrafoIncompleto&&
          <Typography sx={{fontSize: 'small', textAlign: 'start',marginBottom: '1px',color: theme.palette.error.main}}>
            Hay plantillas con datos incompletos
          </Typography>
          }
      
          {Array.isArray(parrafos) && parrafos.map((paragraph, index) => (
            <Grid item xs={12} key={index} sx={{ marginTop: '16px', width: '70%'  }}>
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
                  key={index}//agregado
                  text={paragraph.text}
                  clave={paragraph.key}
                  onEditClick={() => setEditIndex(index)}
                  onDelete={() => handleBorrado(paragraph.key)}
                />
              </Paper>
            </Grid>
          ))}
        </>
      ) : (
        <EdicionParrafo
          parrafoData={parrafos[editIndex]}
          editarParrafo={editarParrafo}
          handleCancelar={() => setEditIndex(null)}
        />
      )}
    </Box>
  );
};

export default ParagraphList;