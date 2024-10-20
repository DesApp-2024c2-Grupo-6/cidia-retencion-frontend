import { Box, Typography, Button, IconButton, Modal, TextField, Autocomplete } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Materia from '../components/Materia';
import { getSubjectsByCareer, getSubjectsNotRegisteredByCareer, updateSubject, createSubject } from '../services/SubjectDataService';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';



function ConfiguracionMaterias() {

  const navigate = useNavigate()
  const IdCarrera = useSelector((state) => state.carrera.IdCarrera);
  const nombreCarrera = useSelector((state) => state.carrera.nombreCarrera);
  const [subjects, setSubjects] = useState([]);
  const [save, setSave] = useState(false);
  const [deleted, setDeleted] = useState(false);

  //Modal para agregar una materia
  const [materiasSinRegistrar, setMateriasSinRegistrar] = useState()
  const [estaAbierto, setEstaAbierto] = useState(false);

  const MATERIA_VACIA = {
    id_carrera: IdCarrera,
    id_materia: "",
    anio: "",
    campo: "",
    specialSubjectName: "",
  }
  const [nuevaMateria, setNuevaMateria] = useState(MATERIA_VACIA)
  const sePuedeGuardar = (nuevaMateria.id_materia && (nuevaMateria.anio >= 1 && nuevaMateria.anio <= 7))

  const handleNuevaMateriaChange = (event) => {
    const { name, value } = event.target;
    setNuevaMateria((prev) => ({ ...prev, [name]: value }));
  }

  const handleNuevaMateriaAutocompleteChange = (event, materia) => {
    setNuevaMateria((prev) => ({ ...prev, id_materia: materia.id }));
  }

  const handleModalClose = () => {
    setEstaAbierto(false)
    setNuevaMateria(MATERIA_VACIA)
  }

  useEffect(() => {
    const getSubjects = async (id_carrera) => {
      const subj = await getSubjectsByCareer(id_carrera);
      if (subj.status === 200) {
        setSubjects(subj.data.subjectsByCareer);
      }

    }
    getSubjects(IdCarrera)
  }, [save, deleted])


  useEffect(() => {
    const getMateriasSinRegistrar = async (id_carrera) => {
      const materias = await getSubjectsNotRegisteredByCareer(id_carrera);
      if (materias.status === 200) {
        const materias = materias.data.materiasSinRegistrar
        setMateriasSinRegistrar(materias);

      }
    }
    getMateriasSinRegistrar(IdCarrera)

  }, [save, deleted])

  const handleSaveCreate = async (materiaACrear) => {
    const materiaCreada = await createSubject(materiaACrear);
    setEstaAbierto(false)
    setNuevaMateria(MATERIA_VACIA)
    setSave(!save);
  };

  const handleSaveEdit = async (editedData) => {
    const upSubject = await updateSubject(editedData);
    setSave(!save);
  };
  const handleClicBack = () => {
    navigate('/configuracion/carrera');
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '800px',
        margin: 'auto',
        marginTop: 3,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'no-wrap',
          gap: '10px'
        }}
      >
        <Typography
          sx={{ display: 'inline', width: 'auto' }}
          variant="h4"
          marginBottom={3} >
          {nombreCarrera}
        </Typography>
        <IconButton
          sx={{display: 'inline', width: 'auto', marginBottom:'12px'}}
          onClick={() => setEstaAbierto(true)}>
          <AddCircleIcon sx={{ color: 'green', fontSize: '48px' }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#609800',
          padding: '8px',
        }}
      >
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Código Materia</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Año</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Campo</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', backgroundColor: '#609800', color: '#FFFFFF' }}>Nombre Completo</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', backgroundColor: '#609800', color: '#FFFFFF' }}>Nombre Especial</Typography>
        <Typography sx={{ flex: 1.5, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Acciones</Typography>
      </Box>

      {!estaAbierto && subjects?.map((item) => (
        <Materia key={item.id_materia} setDeleted={() => setDeleted(!deleted)} data={item} handleSaveEdit={handleSaveEdit} />
      ))}

      <Button
        onClick={handleClicBack}
        sx={{ margin: 2 }}
        variant='contained'
        startIcon={<ArrowCircleLeftIcon />}>
        VOLVER</Button>

      {/*Modal para agregar materia*/}
      <Modal
        open={estaAbierto}
        onClose={handleModalClose}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar Materia
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: 2,
              gap: 2,
            }}
          >
            <Autocomplete
              options={materiasSinRegistrar}
              onChange={handleNuevaMateriaAutocompleteChange}
              disablePortal
              disableClearable
              freeSolo
              getOptionLabel={(materia) => materia.nombre}
              renderInput={(params) => <TextField {...params} label="Materia" />}
            />
            <TextField
              label="Año"
              name="anio"
              type='number'
              value={nuevaMateria.anio}
              onChange={handleNuevaMateriaChange}
            />
            <TextField
              label="Campo"
              name="campo"
              value={nuevaMateria.campo}
              onChange={handleNuevaMateriaChange}
            />
            <TextField
              label="Nombre Especial"
              name="specialSubjectName"
              value={nuevaMateria.specialSubjectName}
              onChange={handleNuevaMateriaChange}
            />
            <Box
              sx={{ display: 'flex', gap: '10px' }}>
              <Button variant="contained" startIcon={<ArrowCircleLeftIcon />} onClick={handleModalClose}>Volver</Button>
              <Button variant="contained" disabled={!sePuedeGuardar} color="secondary" startIcon={<SaveIcon />} onClick={() => handleSaveCreate(nuevaMateria)}>
                Guardar
              </Button>

            </Box>

          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default ConfiguracionMaterias;