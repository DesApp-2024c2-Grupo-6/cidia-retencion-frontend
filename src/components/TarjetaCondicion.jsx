import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Select, MenuItem, TextField, Checkbox, Autocomplete } from '@mui/material';

const TarjetaCondicion = ({
  condicion,
  onChange,
  devolucionCarreras,
  listadoSubjectData,
  onCheckboxChange,
  checkboxValue,
  deshabilitarCampoNumerico
}) => {
  const renderOptions = () => {
    if (condicion === "EN_CARRERA") {
      return devolucionCarreras.map((carrera) => (
        <MenuItem key={carrera.careerId} value={carrera.careerId}>
          {carrera.specialCareerName || `Carrera ${carrera.careerId}`}
        </MenuItem>
      ));
    } else if (condicion === "MATERIAS_PENDIENTES") {
      return listadoSubjectData.map((subject) => (
        <MenuItem key={subject.id_materia} value={subject.id_materia}>
          Materia {subject.id_materia}
        </MenuItem>
      ));
    } else if (condicion === "MATERIAS_NO_PENDIENTES") {
      return (
        <Autocomplete
          options={listadoSubjectData.map((subject) => `Materia ${subject.id_materia}`)}
          renderInput={(params) => <TextField {...params} label="Materias" variant="outlined" fullWidth />}
          sx={{ width: '100%' }} // Ajustamos el ancho del Autocomplete
        />
      );
    } else {
      return (
        <>
          <MenuItem value="SIEMPRE">Siempre</MenuItem>
          <MenuItem value="NUNCA">Nunca</MenuItem>
          <MenuItem value="EN_CARRERA">En Carrera</MenuItem>
          <MenuItem value="MATERIAS_PENDIENTES">Materias Pendientes</MenuItem>
          <MenuItem value="MATERIAS_NO_PENDIENTES">Materias No Pendientes</MenuItem>
          <MenuItem value="MATERIAS_COMUNES">Materias Comunes</MenuItem>
          <MenuItem value="CANT_APROBADAS">Cantidad de Materias Aprobadas</MenuItem>
          <MenuItem value="FINALES_PENDIENTES">Finales Pendientes</MenuItem>
          <MenuItem value="LIMITE_FINALES_PENDIENTES">Límite de Finales Pendientes</MenuItem>
          <MenuItem value="ORIENTACION">Orientación</MenuItem>
        </>
      );
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 1, padding: 1, border: '1px solid grey', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '25ch', textAlign: 'center' }}>Condición</Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '25ch', textAlign: 'center' }}>Materia/Carrera</Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Cantidad</Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Va en carrera</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body1" sx={{ width: '25ch', overflow: 'hidden', textOverflow: 'ellipsis' }}>{condicion}</Typography>
        {condicion !== "MATERIAS_NO_PENDIENTES" ? (
          <Select value={condicion} onChange={(e) => onChange(e.target.value)} sx={{ width: 'calc(50% - 10px)' }}>
            {renderOptions()}
          </Select>
        ) : (
          renderOptions()
        )}
        <TextField type="number" variant="outlined" sx={{ width: 'calc(40% - 10px)' }} disabled={deshabilitarCampoNumerico} /> {/* Ajustamos el tamaño */}
        <Checkbox checked={checkboxValue} onChange={onCheckboxChange} />
      </Box>
    </Box>
  );
};

TarjetaCondicion.propTypes = {
  condicion: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  devolucionCarreras: PropTypes.array.isRequired,
  listadoSubjectData: PropTypes.array.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  checkboxValue: PropTypes.bool.isRequired,
  deshabilitarCampoNumerico: PropTypes.bool.isRequired
};

export default TarjetaCondicion;