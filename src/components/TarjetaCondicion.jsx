import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Select, MenuItem, TextField, Checkbox, Autocomplete } from '@mui/material';
import SelectMultipleAR from './SelectMultipleAR';

const TarjetaCondicion = ({condicion,listaCarreras,listaMaterias,onCheckboxChange,checkboxValue,deshabilitarCampoNumerico}) => {

    

    const renderOptions = () => {
    if (condicion === "EN_CARRERA") {
        return listaCarreras.map((carrera, index) => (
            <MenuItem key={ index } value={carrera.value}>
          {carrera.label}
        </MenuItem>));
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

    const [listaCarrerasElejidas, setListaCarrerasElejidas] = useState([]);
    const [listaMateriasFiltradas, setListaMateriasFiltradas] = useState([]);

    useEffect(() => {
        setListaMateriasFiltradas(listaMaterias);
    }, [listaMaterias]); // Dependencia: listaMaterias

    // Función para filtrar las materias cuando se seleccionan carreras
    useEffect(() => {
        const filtrarMateriasPorCarreras = () => {
            if (listaCarrerasElejidas.length > 0) {
                const materiasFiltradas = listaMaterias.filter(materia =>
                    listaCarrerasElejidas.includes(materia.id_carrera)
                );
                setListaMateriasFiltradas(materiasFiltradas);
            } else {
                setListaMateriasFiltradas([]);
            }
        };

        filtrarMateriasPorCarreras();
        
    }, [listaCarrerasElejidas, listaMaterias]); 

    const carrerasseleccionadas = (carreras) => {
        const carrerasIds = carreras.map(carrera => parseInt(carrera.split(' ')[1]));
        setListaCarrerasElejidas(carrerasIds);
    };

    const materiasseleccionadas = (event) => {
        console.log(event);
    };

    return ( 

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 1, padding: 1, border: '1px solid grey', borderRadius: 2 }}>
            {condicion === "CANT_APROBADAS" ? (
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Condición</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Cantidad</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ overflow: 'hidden', textAlign: 'center', justifyContent: 'center', textOverflow: 'ellipsis' }}>{condicion}</Typography>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', aligneItems:'center'}}>
                            <TextField type="number" variant="outlined" />
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '15ch', textAlign: 'center' }}>Condición</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '60ch', textAlign: 'center' }}>{ condicion === "EN_CARRERA"?"Carreras":"Materias" }</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Cantidad</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '15ch', textAlign: 'center' }}>Va en carrera</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap:2 }}>
                            <Box sx={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{condicion}</Typography>
                            </Box>
                            <Box sx={{ width: '52%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {condicion === "EN_CARRERA" ? (
                                    <SelectMultipleAR options={listaCarreras} onSelect={carrerasseleccionadas}  placeholder='Seleccione Carreras'></SelectMultipleAR>
                                ) : condicion === "MATERIAS_PENDIENTES" ? (
                                        <SelectMultipleAR options={listaMateriasFiltradas} onSelect={materiasseleccionadas}  placeholder='Seleccione Materias'></SelectMultipleAR>
                                ) : (
                                renderOptions()
                            )}
                        </Box>
                            <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <TextField type="number" variant="outlined" sx={{ width: '100%' }} disabled={deshabilitarCampoNumerico} /> {/* Ajustamos el tamaño */}
                        </Box>
                            <Box sx={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Checkbox checked={checkboxValue} onChange={onCheckboxChange} />
                        </Box>
                    </Box>
                </Box>
            )}
              
              
        </Box>
    
  );
};

TarjetaCondicion.propTypes = {
  condicion: PropTypes.string.isRequired,
  /*onChange: PropTypes.func.isRequired,*/
  devolucionCarreras: PropTypes.array.isRequired,
  listadoSubjectData: PropTypes.array.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  checkboxValue: PropTypes.bool.isRequired,
  deshabilitarCampoNumerico: PropTypes.bool.isRequired
};

export default TarjetaCondicion;