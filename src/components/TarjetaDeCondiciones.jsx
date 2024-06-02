import React from 'react'
import { Card, CardContent, Typography, Select, MenuItem, TextField, Checkbox, FormControlLabel } from '@mui/material';
const TarjetaDeCondiciones = ({ condicion, materiasCarreras, cantidad, vaEnCarrera, onChange }) => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Condición
          </Typography>
          <Select value={condicion} onChange={onChange('condicion')}>
            <MenuItem value="SIEMPRE">SIEMPRE</MenuItem>
            <MenuItem value="NUNCA">NUNCA</MenuItem>
            <MenuItem value="EN_CARRERA">EN_CARRERA</MenuItem>
            <MenuItem value="MATERIAS_PENDIENTES">MATERIAS_PENDIENTES</MenuItem>
            <MenuItem value="MATERIAS_NO_PENDIENTES">MATERIAS_NO_PENDIENTES</MenuItem>
            <MenuItem value="MATERIAS_COMUNES">MATERIAS_COMUNES</MenuItem>
            <MenuItem value="CANT_APROBADAS">CANT_APROBADAS</MenuItem>
            <MenuItem value="FINALES_PENDIENTES">FINALES_PENDIENTES</MenuItem>
            <MenuItem value="LIMITE_FINALES_PENDIENTES">LIMITE_FINALES_PENDIENTES</MenuItem>
            <MenuItem value="ORIENTACION">ORIENTACION</MenuItem>
          </Select>
          {condicion === 'EN_CARRERA' && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Materias/Carreras
              </Typography>
              <Select value={materiasCarreras} onChange={onChange('materiasCarreras')}>
                {/* Aquí podrías agregar opciones para las materias y carreras */}
              </Select>
            </>
          )}
          {(condicion === 'MATERIAS_PENDIENTES' || condicion === 'MATERIAS_NO_PENDIENTES') && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Cantidad
              </Typography>
              <TextField type="number" value={cantidad} onChange={onChange('cantidad')} />
            </>
          )}
          <Typography variant="subtitle1" gutterBottom>
            Va en carrera
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={vaEnCarrera} onChange={onChange('vaEnCarrera')} />}
            label="Incluye"
          />
        </CardContent>
      </Card>
    );
  };
export default TarjetaDeCondiciones;