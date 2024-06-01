import { Box, TextField, FormLabel} from '@mui/material';
import '../styles/PanelConfiguradorGral.css';

export default function PanelConfiguradorGral({isEdit, suggestionThresholdRegularizedSubjects, minimumSubjectsRecommended, specialCarrerName}) {
   
    return(
        <Box className='container-config'>
            <Box
                className='container-config-item'>
                <FormLabel
                    sx={
                        {
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }
                    }
                >Materias para generar sugerencias: </FormLabel>
                <TextField 
                    value={suggestionThresholdRegularizedSubjects}
                    variant='standard'
                    className='container-config-item-input'
                    inputProps={{readOnly: !isEdit, style:{fontSize: '12px', textAlign: 'center'}}}/>
            </Box>

            <Box
                className='container-config-item'>
                <FormLabel
                    sx={
                        {
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }
                    }
                >Minimo de materias sugeridas para inscribirse:</FormLabel>
                <TextField 
                    value={minimumSubjectsRecommended}
                    variant='standard'
                    className='container-config-item-input' 
                    inputProps={{readOnly: !isEdit, style:{fontSize: '12px', textAlign: 'center'}}}/>
            </Box>

            <Box
                className='container-config-item'>
                <FormLabel
                    sx={
                        {
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }
                    }
                >Nombre especial:</FormLabel>
                <TextField 
                sx={{width: '280px'}}
                    value={specialCarrerName}
                    variant='standard'
                    inputProps={{readOnly: !isEdit, style:{fontSize: '12px', textAlign: 'right', paddingRight: '5px'}}}/> 
            </Box>

        </Box>
        
    )
}