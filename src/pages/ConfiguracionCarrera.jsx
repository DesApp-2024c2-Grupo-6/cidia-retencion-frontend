import React , { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box , Button, ButtonGroup, Typography } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import '../styles/ConfiguracionCarreras.css';
import PanelConfiguradorGral from '../components/PanelConfiguradorGral'
import MateriasEspeciales from '../components/MateriasEspeciales';

function ConfiguracionCarrera() {
    //recupero el store
    const { IdCarrera, nombreCarrera } = useSelector((state) => state.carrera);

    const [isEdit, setIsEdit] = useState(false);
    const [carrera, setCarrera] = useState({}); 

    const toggleEdit = () => {
        setIsEdit((prevState) => !prevState); // Cambia el estado de edición
      }
    const navigate = useNavigate();
    const handleOnClickCondiciones = () => {
        navigate('/configuracion/condiciones')
    }

    useEffect( () => {
        const fechData = async () => {
            try{
                const res = await fetch('../../public/carrerData.json');
                const jsonData = await res.json();
                const carr = jsonData.filter( e => e.careerId === IdCarrera)[0]
                setCarrera(carr)
            } catch(error){
                console.log(error)
            }
        }
        fechData(IdCarrera)
    }, [])

    return (
        <>
            <Box sx={{
                height: '50vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography 
                    variant="h4"
                    marginBottom={1} >
                    {nombreCarrera}
                </Typography>  
                <Box sx={{}}>
                <Box
                    sx={{display: 'flex', flexDirection: 'row'}}>
                    <Box
                        sx={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        <MateriasEspeciales 
                            isEdit={isEdit}
                            title={"MATERIAS UNAHUR"} 
                            array={carrera.unahurSubjects ? carrera.unahurSubjects : []}/>
                        <MateriasEspeciales 
                            isEdit={isEdit} 
                            title={"NIVELES INGLES"} 
                            array={carrera.englishLevels ? carrera.englishLevels : []}/> 
                    </Box>
                    <PanelConfiguradorGral 
                        isEdit={isEdit}
                        suggestionThresholdRegularizedSubjects={carrera.suggestionThresholdRegularizedSubjects ? carrera.suggestionThresholdRegularizedSubjects : ""}
                        minimumSubjectsRecommended={carrera.minimumSubjectsRecommended ? carrera.minimumSubjectsRecommended : ""}
                        specialCarrerName={carrera.specialCareerName ? carrera.specialCareerName : ""}
                    />
                    </Box>
                        <ButtonGroup 
                            variant='contained'
                            sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', margin: '15px 0px 15px 15px', boxShadow: 'none'}}>
                            <Button
                                startIcon={<ArrowCircleLeftIcon />}>
                            VOLVER</Button>  
                            <Button
                                startIcon={isEdit ? <SaveIcon /> : <EditIcon />}
                                onClick={toggleEdit}>{isEdit ? 'GUARDAR':'EDITAR'}</Button>  
                            <Button
                                startIcon={<BuildIcon />}
                                onClick={ handleOnClickCondiciones }
                                >CONDICIONES</Button>  
                            <Button
                                startIcon={<ListIcon />}>MATERIAS</Button>  
                        </ButtonGroup>
                    
                </Box>
                

            </Box>
        </>
    );
}

export default ConfiguracionCarrera;