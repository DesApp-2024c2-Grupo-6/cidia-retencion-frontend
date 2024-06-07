import React, { useState } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import TarjetaCondicion from './TarjetaCondicion';

const devolucionCarreras = [
  { 
      careerId: 1, 
      unahurSubjects: [{year:1},{year:4}], englishLevels: [{year:3},{year:4}], 
      suggestionThresholdRegularizedSubjects: 4 
  },
  { 
      careerId: 5, 
      unahurSubjects: [{year: 1}], englishLevels: [{year:2}, {year:3}], 
      suggestionThresholdRegularizedSubjects: 3
  },
  { 
      careerId: 6, 
      unahurSubjects: [{year:1}, {year:2}, {year:3}], englishLevels: [{year:2}], 
      suggestionThresholdRegularizedSubjects: 5 
  },
  { 
      careerId: 7, 
      unahurSubjects: [{year:3, campo: 'CFC1'}], 
      englishLevels: [{year:1, campo: 'CFC1'}], 
      suggestionThresholdRegularizedSubjects: 3 
  },
  { 
      careerId: 13, 
      unahurSubjects: [{ year: 3, campo: 'CFC1' }, { year: 4, campo: 'CFC2'}],
      englishLevels: [{ year: 1, campo: 'CFC1' }, { year: 5, campo: 'CFC2'}], 
      suggestionThresholdRegularizedSubjects: 3
  },
  { 
      careerId: 16, 
      unahurSubjects: [{year:1}, {year:4}], englishLevels: [{year:2}, {year:3}], 
      suggestionThresholdRegularizedSubjects: 3 
  },
  { 
      careerId: 21, 
      unahurSubjects: [{year:3, campo: 'Gral'}], 
      englishLevels: [{ year: 1, campo: 'Gral' }, { year: 2, campo: 'Gral'}], 
      suggestionThresholdRegularizedSubjects: 3 
  },
  { 
      careerId: 31, 
      unahurSubjects: [{year:1}], englishLevels: [{year:2}, {year:3}], 
      suggestionThresholdRegularizedSubjects: 3 
  },
  { 
      careerId: 34, 
      unahurSubjects: [{year:1}, {year:2}, {year:3}], englishLevels: [{year:2}, {year:4}], 
      suggestionThresholdRegularizedSubjects: 5 
  },
  { 
      careerId: 38, 
      unahurSubjects: [{ year: 3, campo: 'Gral' }, { year: 4, campo: 'Gral'}], 
      englishLevels: [{ year: 1, campo: 'Gral' }, { year: 3, campo: 'Gral'}], 
      suggestionThresholdRegularizedSubjects: 3, 
      specialCareerName: "Tecnicatura / Licenciatura en inform�tica"
  }
];
const EdicionParrafo = ({ initialClave, initialTexto, onSave, onCancel }) => {
  const [clave, setClave] = useState(initialClave);
  const [texto, setTexto] = useState(initialTexto);
  const [condicionesSeleccionadas, setCondicionesSeleccionadas] = useState([]);

  const handleClaveChange = (e) => setClave(e.target.value);
  const handleTextoChange = (e) => setTexto(e.target.value);
  const handleCondicionesChange = (event, values) => setCondicionesSeleccionadas(values);
  const handleSave = (e) => {
    e.preventDefault();
    onSave(clave, texto);
  };

  const handleCondicionChange = (index, newCondicion) => {
    const nuevasCondiciones = [...condicionesSeleccionadas];
    nuevasCondiciones[index] = newCondicion;
    setCondicionesSeleccionadas(nuevasCondiciones);
  };

  return (
    <Box component="form" onSubmit={handleSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '600px', margin: '0 auto' }}>
      <TextField label="Clave" value={clave} onChange={handleClaveChange} variant="outlined" fullWidth />
      <TextField label="Texto" value={texto} onChange={handleTextoChange} variant="outlined" fullWidth multiline rows={4} />
      <Autocomplete
        multiple
        id="condiciones-select"
        options={["SIEMPRE", "NUNCA", "EN_CARRERA", "MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES", "MATERIAS_COMUNES", "CANT_APROBADAS", "FINALES_PENDIENTES", "LIMITE_FINALES_PENDIENTES", "ORIENTACION"]}
        value={condicionesSeleccionadas}
        onChange={handleCondicionesChange}
        renderInput={(params) => <TextField {...params} label="Condiciones" variant="outlined" placeholder="Selecciona condiciones" />}
        sx={{ mt: 2 }} // Añadimos un margen superior al Autocomplete
      />
      <Box sx={{ mt: 2 }}>
        {condicionesSeleccionadas.map((condicion, index) => (
          <TarjetaCondicion key={index} condicion={condicion} onChange={(newCondicion) => handleCondicionChange(index, newCondicion)} />
        ))}
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button type="submit" variant="contained" color="primary">Guardar</Button>
        <Button variant="contained" color="secondary" onClick={onCancel}>Cancelar</Button>
      </Box>
    </Box>
  );
};

export default EdicionParrafo;