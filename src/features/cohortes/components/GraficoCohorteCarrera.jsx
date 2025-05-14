import React, { PureComponent } from 'react';
//MUI
import { Box, useTheme } from '@mui/material';

//Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


//Utils
import { formatearCuatrimestre } from '../utils/utlis';


const pipelines = {
  una: "1",
  dos: "2",
  tresACinco: "3 a 5",
  seisADiez: "6 a 10",
  onceAQuince: "11 a 15",
  dieciseisAVeinte: "16 a 20",
  veintiunoOMas: "21 o +",
}

const CustomTooltip = ({ active, payload, label, totalAlumnos }) => {

  const theme = useTheme()

  const colors = {
    una: theme.palette.snow.light,
    dos: theme.palette.snow.main,
    tresACinco: theme.palette.snow.dark,
    seisADiez: theme.palette.ice.light,
    onceAQuince: theme.palette.ice.main,
    dieciseisAVeinte: theme.palette.ice.dark,
    veintiunoOMas: theme.palette.sea.main,
  }

  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p>{'A fin de ' + label}</p>
        {payload.map((item, index) => {
          if (item.value === 0) return null;
          const color = colors[item.name]

          return (
            <p key={index} style={{ color }}>
              Regularizados en {pipelines[item.name] + ": " + item.value}
            </p>
          );
        })}
        <p style={{ color: theme.palette.primary.main }}>Cantidad estudiantes: {totalAlumnos}</p>
      </div>
    );
  }

  return null;
};

const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`} style={{ color: entry.color }}>
          <strong>{pipelines[entry.value]}</strong>
        </li>
      ))}
    </ul>
  );
};

const CustomLabel = ({ x, y, width, height, value, cantidad }) => {
  return (
    <text
      x={x + width / 2}
      y={y + height / 2}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={12}
    >
      {cantidad}
    </text>
  );
};

export default function GraficoCohorteCarrera({ cohorteData, totalAlumnos }) {

  const theme = useTheme()

  const data = cohorteData.cohortes.map(cohorte => ({ name: formatearCuatrimestre(cohorte.nombrePeriodo), ...cohorte.regularizados }))

  return (
    <Box sx={{ width: '100%', margin: 'auto', height: '30rem', marginBottom: 5, marginTop: '40px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barGap={4}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, totalAlumnos]} />
          <Tooltip content={<CustomTooltip totalAlumnos={totalAlumnos} />} />
          <Legend formatter={(value) => pipelines[value]}/>
          <Bar dataKey="veintiunoOMas" stackId="a" fill={theme.palette.sea.main} label={<CustomLabel cantidad={"21 o +"} />} />
          <Bar dataKey="dieciseisAVeinte" stackId="a" fill={theme.palette.ice.dark} label={<CustomLabel cantidad={"16 a 20"} />} />
          <Bar dataKey="onceAQuince" stackId="a" fill={theme.palette.ice.main} label={<CustomLabel cantidad={"11 a 15"} />} />
          <Bar dataKey="seisADiez" stackId="a" fill={theme.palette.ice.light} label={<CustomLabel cantidad={"6 a 10"} />} />
          <Bar dataKey="tresACinco" stackId="a" fill={theme.palette.snow.dark} label={<CustomLabel cantidad={"3 a 5"} />} />
          <Bar dataKey="dos" stackId="a" fill={theme.palette.snow.main} label={<CustomLabel cantidad={"2"} />} />
          <Bar dataKey="una" stackId="a" fill={theme.palette.snow.light} label={<CustomLabel cantidad={"1"} />} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}