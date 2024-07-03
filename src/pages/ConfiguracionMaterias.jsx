import { Box, Typography,Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Materia from '../components/Materia';
import { getSubjectsByCareer , updateSubject } from '../services/SubjectDataService';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function ConfiguracionMaterias() {

    const navigate = useNavigate()
    const IdCarrera = useSelector((state) => state.carrera.IdCarrera);
    const nombreCarrera = useSelector((state) => state.carrera.nombreCarrera);
    const [subjects, setSubjects] = useState([]);
    
    useEffect( () => {

      const getSubjects = async(id_carrera) => {
        const subj = await getSubjectsByCareer(id_carrera);
        if(subj.status === 200){
          setSubjects(subj.data.subjectsByCareer);
        }
        
      }

      getSubjects(IdCarrera)
    }, [subjects])

    const handleSaveEdit = async (editedData) => {
      //TODO message.
      const upSubject = await updateSubject(editedData);
      console.log(upSubject)
    };
    const handleClicBack = () => {
      navigate('/configuracion/carrera');
    }
    return(
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
        <Typography 
            variant="h4"
            marginBottom={3} >
            {nombreCarrera}
        </Typography>  
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#f5f5f5',
          padding: '8px',
          borderBottom: '1px solid #ddd',
        }}
      >
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Código Materia</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Año</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Campo</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Nombre Especial</Typography>
        <Typography sx={{ flex: 1.5, textAlign: 'center', fontWeight: 'bold' }}>Acciones</Typography>
      </Box>

      {subjects?.map((item) => (
        <Materia key={item.id_materia} data={item} handleSaveEdit={handleSaveEdit}/>
      ))}

        <Button
          onClick={ handleClicBack }
          sx={{margin: 2}}
          variant='contained'
          startIcon={<ArrowCircleLeftIcon />}>
        VOLVER</Button>  
    </Box>
    )
}

export default ConfiguracionMaterias;