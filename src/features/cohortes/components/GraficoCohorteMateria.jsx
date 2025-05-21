import React, { PureComponent } from 'react';
//MUI
import { Box, useTheme } from '@mui/material';

//Recharts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


//Utils
import { formatearCuatrimestre } from '../utils/utlis';


export default function GraficoCohorteCarrera({ materiaData}){

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
                <Line type="monotone" dataKey="intentosCursada" name="Cantidad de intentos" stroke="#2222dd" />
                <Line type="monotone" dataKey="regularizados" name="Alumnos Regularizados" stroke="#22bb22" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>)
}