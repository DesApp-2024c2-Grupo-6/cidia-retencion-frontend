import { Box , TextField, FormLabel} from "@mui/material";
import '../styles/MateriasCross.css';

export default function MateriasCross ({isEdit, title, array}){


    return(

        <Box className='card-materia'>
                <h5 className="card-materia-title">{title}</h5>
                <div className="card-materia-item">
                    <FormLabel
                    sx={
                        {
                            fontWeight: 'bold',
                            maxWidth: 'calc(20% - 5px)', 
                            fontSize: '12px'
                        }
                    }>Año</FormLabel>
                    <FormLabel
                    sx={
                        {
                            fontWeight: 'bold',
                            maxWidth: 'calc(20% - 5px)', 
                            fontSize: '12px'
                        }
                    }>Campo</FormLabel>
                </div>
                
                    {
                        array?.map( registro => (
                        <div className="card-materia-item">
                            
                            <TextField
                            defaultValue={registro.year}
                            variant='standard'
                            sx={
                                {
                                    maxWidth: 'calc(20% - 5px)', 
                                    '& .MuiInputBase-input': { 
                                        fontSize: '12px', 
                                        textAlign: 'center' }
                                }
                            }
                            inputProps={{readOnly: !isEdit}}/>

                            <TextField
                            defaultValue={registro.campo}
                            variant='standard'
                            sx={
                                {
                                    maxWidth: 'calc(20% - 5px)', 
                                    '& .MuiInputBase-input': { 
                                        fontSize: '12px', 
                                        textAlign: 'center' }
                                }
                            }
                            inputProps={{readOnly: !isEdit}}/>
                        </div>
                        ))
                    }
        </Box>
    )
}