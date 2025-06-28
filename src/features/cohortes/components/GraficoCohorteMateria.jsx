import React, { PureComponent } from 'react';
//MUI
import { Box, useTheme } from '@mui/material';

//Recharts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


//Utils
import { formatearCuatrimestre } from '../utils/utlis';
  
export default function GraficoCohorteCarrera({ materiaData}){
    const theme = useTheme()
    const colors = {
        intentos: theme.palette.snow.dark,
        regularizados: theme.palette.ice.dark,
    }
    const data = materiaData.cohorte.map(cohorte => ({ name: formatearCuatrimestre(cohorte.nombrePeriodo), regularizados:cohorte.acumulado.regularizados, intentosCursada:cohorte.acumulado.intentosCursada}))
    return(
        
        <ResponsiveContainer width="95%" height={400}>
            <LineChart
                width={600}
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
                <Line type="monotone" dataKey="intentosCursada" name="Cantidad de intentos" stroke={colors.intentos} />
                <Line type="monotone" dataKey="regularizados" name="Alumnos Regularizados" stroke={colors.regularizados} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>)
}