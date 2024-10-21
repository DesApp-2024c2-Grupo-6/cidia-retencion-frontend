import React, { useState, useEffect } from 'react';
import ParrafoPlantilla from '../components/ParrafoPlantilla';
import EdicionParrafo from '../components/EdicionParrafo';
import { Button, Box, Typography, Paper, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConfirmarBorrado from '../components/ConfirmarBorrado.jsx';
import { getAllParrafos, updateOneParrafo, deleteOneParrafo, createParrafo } from '../services/ParrafosService.js';

const ParagraphList = () => {
  const [parrafos, setParrafos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [cond, setCond] = useState([]); 

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
  }, [editIndex]);

  const agregarParrafo = async (clave, texto) => {

    try {
      const response = await createParrafo({
        parrafoId: '668f20a4fb3e34d777eb3e1', //Aca tocar por el id 
        nuevaClave: clave,
        nuevoTexto: texto
      });
      console.log('Response from createParrafo:', response);
      const dato = response.parrafo._rawData[response.parrafo._rawData.length - 1];
      console.log(dato)
      setParrafos([...parrafos, { key: dato.key, text: dato.text }]);
    } catch (error) {
      console.error('Error creating paragraph:', error);
    }
  };


  //DATOS QUE SON INFORMACION ADICIONAL DE "EN_CARRERA"
  const [idsCarreras, setIdsCarreras] = useState([]);
  const [incluye, setIncluye] = useState(false);

  //DATOS QUE SON INFORMACION ADICIONAL DE "MATERIAS_PENDIENTES"
  const [idsMateriasMP, setIdsMateriasMP] = useState([]);
  const [cantidadAprobadasMP, setCantidadAprobadasMP] = useState(0);

  //DATOS QUE SON INFORMACION ADICIONAL DE "MATERIAS_NO_PENDIENTES"
  const [idsMateriasMNP, setIdsMateriasMNP] = useState([]);
  const [cantidadAprobadasMNP, setCantidadAprobadasMNP] = useState(0);

  //DATOS QUE SON INFORMACION ADICIONAL DE "CANTIDAD_APROBADAS"
  const [cantidadAprobadas, setCantidadAprobadas] = useState(0);

  const editarParrafo = async (index, newClave, newText, newConditions) => { 

    const formatearCondicion = (condicion) => {
      /*
        Retorna la condicion recibida, pero agregando los valores definidos en Tarjeta condicion
        segun su codigo de condicion
        Parametros:
          -condicion - objeto - Objeto que contiene el codigo y la configuracion de una condicion

        Retorna: Objeto
        EJ: formatearCondicion({codigo_condicion:"EN_CARRERA", config_condicion:{id_carreras:[], incluye:true}})
        => {codigo_condicion:"EN_CARRERA", config_condicion:{id_carreras:[1, 5, 7], incluye:"excluye"}}
      */
      const configuracionesPorCodigo = {
        "EN_CARRERA": {
          id_carreras: idsCarreras,
          en_carrera: (incluye) ? "incluye" : "excluye"
        },
        "MATERIAS_PENDIENTES": {
          id_materias: idsMateriasMP,
          cantidad: cantidadAprobadasMP
        },
        "MATERIAS_NO_PENDIENTES": {
          id_materias: idsMateriasMNP,
          cantidad: cantidadAprobadasMNP
        },
        "CANT_APROBADAS": {
          cantidad: cantidadAprobadas
        },
        "DEFAULT": {}
      }
      return ({...condicion, config_condicion: (configuracionesPorCodigo[condicion.codigo_condicion] || {})})
    }

    try {

      const condicionesFormateadas = newConditions.map(condicion => formatearCondicion(condicion))

      const updatedParrafo = {
        keyanterior: parrafos[index].key,
        key: newClave,
        text: newText,
        conditions: condicionesFormateadas
      }
      console.log(updatedParrafo)

      const response = await updateOneParrafo(updatedParrafo);
      setEditIndex(null);

    } catch (error) {
      console.error('Error updating paragraph:', error);
    }
  };

  const eliminarParrafo = async (key) => {
    try {
      handleCloseBorrado()
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
  const [openBorrado, setOpenBorrado] = React.useState(Boolean);
  const [parrafoABorrar, setParrafoABorrar] = React.useState({});

  const handleBorrado = (parrafo) =>{
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
      <ConfirmarBorrado openBorrado = {openBorrado} handleCloseBorrado = {handleCloseBorrado} funcionEliminar = {eliminarParrafo} elementoAEliminar = {parrafoABorrar} textoBorrado = "¿Está seguro de que desea eliminar este párrafo?"></ConfirmarBorrado>
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
                  key={index}//agregado
                  text={paragraph.text}
                  clave={paragraph.key}
                  onEditClick={() => setEditIndex(index)}
                  onDelete={() => handleBorrado(paragraph.key)}
                />
              </Paper>
            </Grid>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => agregarParrafo("ejemplo de Clave", "ejemplo de texto")}
            sx={{ marginTop: '16px' }}
          >
            Añadir Párrafo
          </Button>
        </>
      ) : (
        <EdicionParrafo
          initialClave={parrafos[editIndex].key}
          initialTexto={parrafos[editIndex].text}
          condiciones={parrafos[editIndex].conditions} //Cris
          onSave={(clave, texto, cond) => editarParrafo(editIndex, clave, texto, cond)} //Cris
          onCancel={() => setEditIndex(null)}
          setCantidadAprobadas={setCantidadAprobadas}
          setIdsCarrerasEC={setIdsCarreras}
          setIncluyeEC={setIncluye}
          setIdsMateriasMP = {setIdsMateriasMP}
          setCantidadAprobadasMP = {setCantidadAprobadasMP}
          setIdsMateriasMNP = {setIdsMateriasMNP}
          setCantidadAprobadasMNP = {setCantidadAprobadasMNP}
          carrerasSeleccionadas = {idsCarreras}
        />
      )}
    </Box>
  );
};

export default ParagraphList;