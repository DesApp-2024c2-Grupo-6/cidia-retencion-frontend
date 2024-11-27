import { Box, Typography, Button, IconButton, Modal, TextField, Autocomplete, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Materia from '../components/Materia';
import { getSubjectsByCareerAndPlan, getSubjectsNotRegisteredByCareer, updateSubject, createSubject } from '../services/SubjectDataService';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { deleteSubject } from '../services/SubjectDataService';
import ConfirmarBorrado from '../components/ConfirmarBorrado';
import { useTheme } from '@mui/material/styles';




function ConfiguracionMaterias() {

  const theme = useTheme()

  const navigate = useNavigate()
  const IdCarrera = useSelector((state) => state.carrera.IdCarrera);
  const nombreCarrera = useSelector((state) => state.carrera.nombreCarrera);
  const IdPlan = useSelector((state) => state.carrera.IdPlan);
  const [subjects, setSubjects] = useState([]);
  const [save, setSave] = useState(false);
  const [deleted, setDeleted] = useState(false);

  //Modal para agregar una materia
  const [materiasSinRegistrar, setMateriasSinRegistrar] = useState([])
  const [camposMaterias, setCamposMaterias] = useState(["CB"])
  const [estaAbierto, setEstaAbierto] = useState(false);

  const MATERIA_VACIA = {
    id_carrera: IdCarrera,
    id_plan: IdPlan,
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

  const handleNuevaMateriaCampoAutocompleteChange = (event, campo) => {
    setNuevaMateria((prev) => ({ ...prev, campo: campo }));
  }

  const handleModalClose = () => {
    setEstaAbierto(false)
    setNuevaMateria(MATERIA_VACIA)
  }

  useEffect(() => {
    const getSubjects = async (id_carrera, id_plan) => {
      const listaCampos = []
      const subj = await getSubjectsByCareerAndPlan(id_carrera, id_plan);
      if (subj.status === 200) {
        setSubjects(subj.data.subjectsByCareer);
        subj.data.subjectsByCareer.forEach(materia => {
          if (materia.campo !== "" && materia.campo !== undefined && !listaCampos.includes(materia.campo)) {
            listaCampos.push(materia.campo)
          }
        })
      }


      if (listaCampos.length > 0) {
        setCamposMaterias(listaCampos)
      }
      else {
        setCamposMaterias(["CB"])
      }

    }
    getSubjects(IdCarrera, IdPlan)

  }, [save, deleted])


  useEffect(() => {
    const getMateriasSinRegistrar = async (id_carrera) => {
      const materias = await getSubjectsNotRegisteredByCareer(id_carrera);
      const materiasData = materias.data.materiasSinRegistrar.filter(materia => !materia.esUnahur)
      materiasData.sort((a, b) => a.nombre.localeCompare(b.nombre))
      setMateriasSinRegistrar(materiasData);

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

  const [openBorrado, setOpenBorrado] = React.useState(Boolean);
  const [materiaABorrar, setMateriaABorrar] = React.useState({});

  const handleBorrado = (materia) => {
    setOpenBorrado(true);
    setMateriaABorrar(materia);
  }

  const handleCloseBorrado = () => {
    setOpenBorrado(false);
    setMateriaABorrar({});
  }
  const handleOnClickDelete = async (data) => {
    handleCloseBorrado()
    const resSubject = await deleteSubject(data);
    if (resSubject.status === 200) {
      setDeleted();
    } else {
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1000px',
        margin: 'auto',
        marginTop: 3,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <ConfirmarBorrado openBorrado={openBorrado} setDeleted={setDeleted} handleCloseBorrado={handleCloseBorrado} funcionEliminar={handleOnClickDelete} elementoAEliminar={materiaABorrar} textoBorrado="¿Está seguro de que desea eliminar esta Materia?"     ></ConfirmarBorrado>
      <Box sx={{
        width: '1000px',
        minWidth: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'no-wrap',
        gap: '10px',
      }}>
        <Typography sx={{ fontWeight: '500' }} variant="h5" component="h1" gutterBottom>
          {nombreCarrera}
        </Typography>
        <IconButton
          sx={{ display: 'inline', width: 'auto'}}
          onClick={() => setEstaAbierto(true)}>
          <AddCircleIcon color="success" sx={{ fontSize: '48px' }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          backgroundColor: theme.palette.success.main,
          padding: '8px',
        }}
      >
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Código Materia</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Año</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Campo</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Nombre Completo</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Nombre Especial</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}>Acciones</Typography>
      </Box>

      {subjects?.map((item, index) => {
        if (!estaAbierto || (estaAbierto && index <= 15))
          return <Materia key={item.id_materia} campos={camposMaterias} data={item} handleSaveEdit={handleSaveEdit} handleBorrado={handleBorrado} />
      })}

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
            <Autocomplete
              value={nuevaMateria.campo}
              onChange={handleNuevaMateriaCampoAutocompleteChange}
              onInputChange={handleNuevaMateriaCampoAutocompleteChange}
              id="campo-nueva-materia"
              options={camposMaterias}
              disablePortal
              disableClearable
              freeSolo
              renderInput={(params) => <TextField {...params} label="Campo" />}
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