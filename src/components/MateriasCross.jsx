import { Margin } from "@mui/icons-material";
import { Box , TextField, FormLabel} from "@mui/material";
import '../styles/MateriasCross.css';

export default function MateriasCross ({isEdit, title}){

    return(
        <Box className='card-materia'>
                <h5 className="card-materia-title">{"MATERIAS UNAHUR"}</h5>
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
                <div className="card-materia-item">
                    <TextField
                        defaultValue={1}
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
                        defaultValue={"AyR"}
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

                <div className="card-materia-item">
                    <TextField
                        defaultValue={3}
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
                        defaultValue={"AyM"}
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


        </Box>
    )
}