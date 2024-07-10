import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import TarjetaCondicion from './TarjetaCondicion';
import Stack from '@mui/material/Stack';
import '../styles/SelectMultipleAR.css';
import devolucionCarrera from '../services/listadoCarreras';
import listadoSubjectData from '../services/listadoSubjectData';


const EdicionParrafo = ({ initialClave, initialTexto, onSave, onCancel }) => {
    const [clave, setClave] = useState(initialClave);
    const [texto, setTexto] = useState(initialTexto);
    const [condicionesSeleccionadas, setCondicionesSeleccionadas] = useState([]);
    const [checkboxValues, setCheckboxValues] = useState([]);
    const [listaCarreras, setListaCarreras] = useState([]);
    const [listaMaterias, setListaMaterias] = useState([]);
    const [autoCompleteOptionsDisabled, setAutoCompleteOptionsDisabled] = useState(true); // Nuevo estado para controlar si las opciones están deshabilitadas
    const [desabilitarResto, setDesabilitarResto] = useState(false);
    const [desabilitarNunca, setDesabilitarNunca] = useState(false);
    const [desabilitarSiempre, setDesabilitarSiempre] = useState(false);



    useEffect(() => {
        const lista = devolucionCarrera.map(c => ({
            label: `Carrera ${c.careerId}`,
            value: c.careerId
        }));
        setListaCarreras(lista);
    }, [])

    useEffect(() => {
        setListaMaterias(listadoSubjectData);
    }, [])

    const handleClaveChange = (e) => setClave(e.target.value);
    const handleTextoChange = (e) => setTexto(e.target.value);
  
    const handleCondicionesChange = (event, values) => {
        setCondicionesSeleccionadas(values);
        setCheckboxValues(Array(values.length).fill(false));
  // Verificar si "EN_CARRERA" está seleccionado
        const isEnCarreraSelected = values.includes('EN_CARRERA');
        // Habilitar o deshabilitar las opciones dependiendo de si "EN_CARRERA" está seleccionado
        //setAutoCompleteOptionsDisabled(!isEnCarreraSelected);

        const isSiempreSelected = values.includes('SIEMPRE');
        const isNuncaSelected = values.includes('NUNCA');
          if (isSiempreSelected || isNuncaSelected) {
              setDesabilitarResto(true);
          }
        if (isSiempreSelected) { setDesabilitarNunca(true) }
        if (isNuncaSelected) { setDesabilitarSiempre(true) }
        if (!isSiempreSelected && !isNuncaSelected) {
            setDesabilitarNunca(false);
            setDesabilitarSiempre(false);
            setDesabilitarResto(false);
            //setAutoCompleteOptionsDisabled(true);
        }
        if (!isEnCarreraSelected) {
            values = values.filter(cond => cond !== 'MATERIAS_PENDIENTES' && cond !== 'MATERIAS_NO_PENDIENTES');
            setAutoCompleteOptionsDisabled(true);
        }
        setCondicionesSeleccionadas(values);
    };

    //---------------------------------- METO FUNCIONES DE TARJETA CONDICION --------------------------------------------------------------------------------------------

    const [listaCarrerasElejidas, setListaCarrerasElejidas] = useState([]);

    //LA LISTA PARA LAS MATERIAS
    const [listaMateriasParaSelect, setListaMateriasParaSelect] = useState([]);


    // PARA CARGAR INICIALMENTE LA LISTA DE MATERIAS
    useEffect(() => {
        const materiasFiltradas = listaMaterias.filter(materia =>
            listaCarrerasElejidas.length > 0 ? listaCarrerasElejidas.includes(materia.id_carrera) : renderMaterias
        );
        const listaFiltrada = materiasFiltradas.map(m => ({
            value: m.id_materia,
            label: `Materia ${m.id_materia}`
        }));
        const eliminarDuplicados = (arr) => {
            const map = new Map();
            return arr.filter(item => !map.has(item.value) && map.set(item.value, true));
        };
        const listaSinDuplicados = eliminarDuplicados(listaFiltrada);

        setListaMateriasParaSelect(listaSinDuplicados.sort((a, b) => (a.value > b.value ? 1 : a.value < b.value ? -1 : 0)));
    }, []);

    //PARA FILTRAR LA LISTA DE MATERIAS CON LAS CARRERAS ELEGIDAS 
    useEffect(() => {
        //if (condicion !== "MATERIAS_PENDIENTES" && condicion !== "MATERIAS_NO_PENDIENTES") {
            if (listaCarrerasElejidas.length > 0) {
                const materiasFiltradas = listaMaterias.filter(materia =>
                    listaCarrerasElejidas.includes(materia.id_carrera)
                );
                const listaFiltrada = materiasFiltradas.map(m => ({
                    value: m.id_materia,
                    label: `Materia ${m.id_materia}`
                }));
                console.log("cantidad de materias: ", listaFiltrada.length)
                setListaMateriasParaSelect(listaFiltrada);
            } else {
                setListaMateriasParaSelect([]);
            }
        //}

    }, [listaCarrerasElejidas, listaMaterias]);

    //PARA CARGAR LA LISTA DE CARRERAS ELEGIDAS
    const carrerasseleccionadas = (carreras) => {
        setListaCarrerasElejidas(carreras);
    };




    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------


  const handleSave = (e) => {
    e.preventDefault();
    onSave(clave, texto);
  };

  const handleCheckboxChange = (value) => {
      setAutoCompleteOptionsDisabled(!value);
  };

  // Función para obtener las opciones deshabilitadas
    const getOptionDisabled = (option, index) => {

        if (autoCompleteOptionsDisabled && (option === 'MATERIAS_PENDIENTES' || option === 'MATERIAS_NO_PENDIENTES')) {
            return true;
      }
        if (desabilitarResto && (option === 'MATERIAS_COMUNES' || option === 'EN_CARRERA' || option === 'CANT_APROBADAS' || option === 'FINALES_PENDIENTES'
            || option === 'LIMITE_FINALES_PENDIENTES' || option === 'ORIENTACION')) {
          return true;
        }
        if (desabilitarSiempre && option === 'SIEMPRE') {
            return true;
        }
        if (desabilitarNunca && option === 'NUNCA') {
            return true;
        }
        return false;
  };

  return (
      <Box
          component="form"
          onSubmit={handleSave}
          sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: '1000px',
              width: '100%',
              margin: '0 auto',
          }}
      >
          <TextField label="Clave" value={clave} onChange={handleClaveChange} variant="outlined" fullWidth />
          <TextField label="Texto" value={texto} onChange={handleTextoChange} variant="outlined" fullWidth multiline rows={4} />
          <Stack id='smar' sx={{}}>
              <Autocomplete
                  multiple
                  id="condiciones-select"
                  options={["SIEMPRE", "NUNCA", "EN_CARRERA", "MATERIAS_PENDIENTES", "MATERIAS_NO_PENDIENTES", "MATERIAS_COMUNES", "CANT_APROBADAS", "FINALES_PENDIENTES", "LIMITE_FINALES_PENDIENTES", "ORIENTACION"]}
                  value={condicionesSeleccionadas}
                  onChange={handleCondicionesChange}
                  renderInput={(params) => <TextField {...params} label="Condiciones" variant="outlined" placeholder="Selecciona condiciones" />}
                  sx={{ mt: 2 }}
                  getOptionDisabled={getOptionDisabled}
              />
              <Box sx={{ mt: 2, width: '100%' }}>
                  {(!desabilitarNunca && !desabilitarSiempre) && condicionesSeleccionadas.map((condicion, index) => (
                      (condicion !== "MATERIAS_COMUNES" && condicion !== "FINALES_PENDIENTES" && condicion !== "LIMITE_FINALES_PENDIENTES" && condicion !== "ORIENTACION") &&
                      <TarjetaCondicion
                          key={index}
                          condicion={condicion}
                          listaCarreras={listaCarreras}
                          listaMaterias={listaMaterias}
                          listaMateriasParaSelect={listaMateriasParaSelect}
                          handleCheckbox={handleCheckboxChange}
                          handeSelectionCareer={carrerasseleccionadas}
                          deshabilitarCampoNumerico={!checkboxValues[index]} // Deshabilitar campo numérico si el checkbox está marcado
                      />
                  ))}
              </Box>
          </Stack>
          <Box display="flex" justifyContent="space-around">
              <Button type="submit" variant="contained" color="primary">Guardar</Button>
              <Button variant="contained" color="secondary" onClick={onCancel}>Cancelar</Button>
          </Box>
      </Box>
  );
};

export default EdicionParrafo;