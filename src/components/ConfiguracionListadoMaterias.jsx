import { Box } from "@mui/material"


function ConfiguracionListadoMaterias(){
    return(
        <Box sx={
            { 
                p:1, 
                border: '2px dashed grey', 
                display: 'flex', 
                flexDirection:'column'}
            }>
            <h2>Agregar Materia</h2>
            {
                //Este select reemplazarlo por el que armó Javi
            }
            <select name="materia">
                <option value="" disabled selected>Materias</option>
                <option value="v1">Matematica I</option>
                <option value="v2">Logica y Programación</option>
                <option value="v3">Ingleese II</option>
            </select>
        </Box>
    )
}

export default ConfiguracionListadoMaterias;