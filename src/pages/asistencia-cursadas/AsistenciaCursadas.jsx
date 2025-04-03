//MUI
import { Box, Autocomplete, TextField, Modal, Typography, Select, MenuItem, FormControl, InputLabel, Stack, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//Recharts
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Semana 1', porcentajeAlumnos: 100, cantidadAlumnos: 200 },
    { name: 'Semana 2', porcentajeAlumnos: 80, cantidadAlumnos: 160 },
    { name: 'Semana 3', porcentajeAlumnos: 90, cantidadAlumnos: 180 },
    { name: 'Semana 4', porcentajeAlumnos: 70, cantidadAlumnos: 140 },
    { name: 'Semana 5', porcentajeAlumnos: 60, cantidadAlumnos: 120 },
    { name: 'Semana 6', porcentajeAlumnos: 50, cantidadAlumnos: 100 },
    { name: 'Semana 7', porcentajeAlumnos: 85, cantidadAlumnos: 170 },
    { name: 'Semana 8', porcentajeAlumnos: 75, cantidadAlumnos: 150 },
    { name: 'Semana 9', porcentajeAlumnos: 65, cantidadAlumnos: 130 },
    { name: 'Semana 10', porcentajeAlumnos: 95, cantidadAlumnos: 190 },
    { name: 'Semana 11', porcentajeAlumnos: 80, cantidadAlumnos: 160 },
    { name: 'Semana 12', porcentajeAlumnos: 90, cantidadAlumnos: 180 },
    { name: 'Semana 13', porcentajeAlumnos: 70, cantidadAlumnos: 140 },
    { name: 'Semana 14', porcentajeAlumnos: 60, cantidadAlumnos: 120 },
    { name: 'Semana 15', porcentajeAlumnos: 85, cantidadAlumnos: 170 },
    { name: 'Semana 16', porcentajeAlumnos: 95, cantidadAlumnos: 190 },
];

const ejemploComision = {
    nombre:"comision1",
    inscriptos:3,
    semanas:[3,5,3,65,7,4,3,5,5,4,4,4,4,3,2,1]
}
const listaComisiones = [ejemploComision,ejemploComision,ejemploComision,ejemploComision]

const Comision = ({comision}) =>{
    return(
        <Box
              sx={{
                padding:"8px",
                gap: '8px',
                display: 'flex',
                '&:nth-of-type(odd)': {
                  backgroundColor: '#f9f9f9',
                },
                '&:nth-of-type(even)': {
                  backgroundColor: '#ffffff'
                },
              }}
            >

            <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '12px', alignContent: 'center' }}>{comision.nombre}</Typography>
            <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '12px', alignContent: 'center' }}></Typography>
            <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '12px', alignContent: 'center' }}>{comision.inscriptos}</Typography>
            {ejemploComision.semanas.map(semana => {
                return <Typography sx={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '12px'}}>{semana}</Typography>
            })}
        </Box>

    )
}
const ListadoComisiones = () =>{
    const theme = useTheme();
    return(
        <Box sx={{
            width: '85%',    
        }}>
            <Box
                sx={{
                    display: 'flex',
                    gap: '8px',
                    backgroundColor: theme.palette.success.main,
                    padding: '8px',
                }}
            >

                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Comisión</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}></Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Inscriptos</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 1</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 2</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 3</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 4</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 5</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 6</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 7</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 8</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 9</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 10</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 11</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 12</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 13</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 14</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 15</Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', alignContent: 'center' }}>Sem. 16</Typography>
            </Box>
       
        {listaComisiones.map( com => {
                   return <Comision comision={com}></Comision>
                }
            )}

    </Box>
    )

}
const DatosMateria = () => {
    const theme = useTheme();

    return (
        <Stack
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={0}
            sx={{
                width: '450px',
                minWidth: '300px',
                display: 'flex',
                margin: 'auto',
                justifyContent: 'space-between',
                border: 'solid',
                borderWidth: '1px',
                borderColor: '#dedede',
                verticalAlign: 'center'
            }}>
            <Stack direction="row" spacing={0} sx={{ justifyContent: "space-between", alignItems: "center", padding: 1 }}>
                <Typography>Inscriptos totales: </Typography>
                <Typography sx={{ color: theme.palette.success.light, fontWeight: 500 }}>200</Typography>
            </Stack>
            <Stack direction="row" spacing={0} sx={{ justifyContent: "space-between", alignItems: "center", padding: 1 }}>
                <Typography>Materia: </Typography>
                <Typography sx={{ color: theme.palette.success.light, fontWeight: 500 }}>Programación Estructurada</Typography>
            </Stack>
            <Stack direction="row" spacing={0} sx={{ justifyContent: "space-between", alignItems: "center", padding: 1 }}>
                <Typography>Comisión: </Typography>
                <Typography sx={{ color: theme.palette.success.light, fontWeight: 500 }}>(759) - Comisión 2</Typography>
            </Stack>


        </Stack>
    )
}

const Grafico = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cantidadAlumnos" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="porcentajeAlumnos" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    )
}


export default function AsistenciaCursadas() {
    return (
        <Box sx={{ minWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems:"center"
         }}>
            <Typography >Asistencia a cursadas</Typography>

                
                
            <ListadoComisiones />
            
            <Box sx={{ width: '80%', margin: 'auto' }}>
                <Box sx={{ marginBottom: 3 }}>
                    <DatosMateria />
                </Box>
                <Box sx={{ width: '100%', height: '20rem', marginBottom: 5 }}>
                    <Grafico />
                </Box>

            </Box>
        </Box>

    )
}