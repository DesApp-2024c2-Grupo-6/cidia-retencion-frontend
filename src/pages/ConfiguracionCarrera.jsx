import React , { useState }from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box , Button, ButtonGroup} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import '../styles/ConfiguracionCarreras.css';
import PanelConfiguradorGral from '../components/PanelConfiguradorGral'
import MateriasCross from '../components/MateriasCross';

function ConfiguracionCarrera() { 
    const IdCarrera = useSelector((state) => state.carrera.IdCarrera);
    const nombreCarrera = useSelector((state) => state.carrera.nombreCarrera);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const handleOnClickCondiciones = () => {
        navigate('/configuracion/condiciones')
}
    const handleOnClickEdit = () => {
        setIsEdit(!isEdit);
    }

    return (
        <>
            <Box sx={{
                height: '70vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
        }}>
          <h1>{nombreCarrera}</h1>  
            <Box 
            sx={{display: 'flex'}}>
                <Box
                    sx={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                 <MateriasCross isEdit={isEdit} title={"MATERIAS UNAHUR"}/>
                 <MateriasCross isEdit={isEdit} title={"NIVELES INGLES"}/>
                </Box>

               <Box>
                  <PanelConfiguradorGral isEdit={isEdit}/>
                  <Box>
                  <ButtonGroup 
                    variant='contained'
                     sx={{mt: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px'}}>
                <Button
                    startIcon={<ListIcon />}>MATERIAS</Button>    
                <Button
                    startIcon={<EditIcon />}
                    onClick={handleOnClickEdit}>{isEdit ? 'GUARDAR':'EDITAR'}</Button>  
                <Button
                    startIcon={<BuildIcon />}
                    onClick={ handleOnClickCondiciones }
                    >CONDICIONES</Button>  
                <Button
                    startIcon={<SaveIcon />}>
                GUARDAR</Button>  
            </ButtonGroup>
                  </Box>
               </Box>
               
            </Box>


            </Box>
        </>
    );
}

export default ConfiguracionCarrera;