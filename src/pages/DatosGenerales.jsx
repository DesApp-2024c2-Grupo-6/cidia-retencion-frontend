import React, { useState, useEffect } from 'react';
//Componentes MUI
import { Button, Box, Autocomplete, TextField, IconButton, Typography } from '@mui/material';
//Iconos
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
//Estilos
import '../styles/ConfiguracionCarreras.css';
import { useNavigate } from 'react-router-dom';
import NivelesIngles from '../components/DatosGenerales/NivelesDeIngles';
import MateriasFake from '../components/DatosGenerales/MateriasFake';


//Componentes
import ParesDeCarreras from '../components/DatosGenerales/ParesDeCarreras';

//Datos del back
import { getAllSubjectsGuarani } from '../services/SubjectDataService'
import { getAllCareerGuarani } from '../services/CareerService'
import { getGeneralAcademicData, updateGeneralAcademicData } from '../services/GeneralAcademicDataService'


//import listadoCarrerasGuarani from '../services/listadoCarrerasGuarani'
import listadoGeneralAcademicData from '../services/listadoGeneralAcademicData'
import MateriasComunes from '../components/DatosGenerales/MateriasComunes';

//Materias SIU
const materiasSiu = await getAllSubjectsGuarani()
const listaFiltrada = materiasSiu.data.materiasSiu.filter((materia) => { return materia.name != undefined })
const materiasSinRepetidos = listaFiltrada.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.id === value.id
  ))
)

//Carreras SIU
const listadoCarrerasGuarani = (await getAllCareerGuarani()).data


function DatosGenerales() {

  const DATOS_VACIOS = {careerPairs: [],fakeSubjectIds: [], specialSubjects: [], englishLevelIds: []};

  const [datosGenerales, setDatosGenerales] = useState(DATOS_VACIOS)
  const [carrerasGuarani, setCarrerasGuarani] = useState(listadoCarrerasGuarani)
  const [estanLosDatosCargados, setEstanLosDatosCargados] = useState(false)

  
  const datosGeneralesConNombres = (datosGenerales) => {
    //Esto es para agregar los nombres a las carreras y materias de los datos generales
    const paresCarrerasConNombres = datosGenerales.careerPairs.map(par => {
      const parConNombre = par;
      const carreraCortaGuarani = listadoCarrerasGuarani.find(carrera => carrera.id == par.shortCareer.id)
      const carreraLargaGuarani = listadoCarrerasGuarani.find(carrera => carrera.id == par.longCareer.id)
      if (carreraCortaGuarani != undefined)
        parConNombre.shortCareer.nombre = carreraCortaGuarani.nombre;
      else
        parConNombre.shortCareer.nombre = "Nombre no encontrado"

      if (carreraLargaGuarani != undefined)
        parConNombre.longCareer.nombre = carreraLargaGuarani.nombre;
      else
        parConNombre.longCareer.nombre = "Nombre no encontrado"
      return parConNombre
    })

    const materiasComunesConNombres = datosGenerales.specialSubjects.map(subject => {
      const materiaConNombre = subject
      const materiaGuarani = materiasSinRepetidos.find(materia => materia.id == materiaConNombre.id)
      if (materiaGuarani != undefined)
        materiaConNombre.realName = materiaGuarani.name
      else
        materiaConNombre.realName = "Nombre no encontrado";
      return materiaConNombre
    })

    const datosFormateados = { ...datosGenerales, careerPairs: paresCarrerasConNombres, specialSubjects: materiasComunesConNombres }
    return datosFormateados
  }
    

  useEffect(() => {
    const getDatosGenerales = async () => {
      const datosGeneralesRecibidos = await getGeneralAcademicData()
      console.log(datosGeneralesRecibidos)
      await setDatosGenerales(datosGeneralesConNombres(datosGeneralesRecibidos.data.datosAcademicos))
      setEstanLosDatosCargados(true)
    }
    getDatosGenerales()

  }, [])

  

  //Confirmacion de guardado
  const hayParCarreraVacio = datosGenerales.careerPairs.find(par => par.shortCareer.id == "" || par.longCareer.id == "")
  const hayMateriaComunVacia = datosGenerales.specialSubjects.find(materia => materia.id == "" || materia.name == "")
  const sePuedeGuardar = !hayParCarreraVacio && !hayMateriaComunVacia

  //Funciones para editar las propiedades de generalAcademicData
  const editarParesCarrerasDatosGenerales = (nuevosPares) => setDatosGenerales({ ...datosGenerales, careerPairs: nuevosPares })
  const editarMateriasComunesDatosGenerales = (nuevasMaterias) => setDatosGenerales({ ...datosGenerales, specialSubjects: nuevasMaterias })
  const editarNivelesInglesDatosGenerales = (listaIds) => setDatosGenerales({ ...datosGenerales, englishLevelIds: listaIds })
  const editarMateriasFakeDatosGenerales = (listaMateriasFake) => setDatosGenerales({ ...datosGenerales, fakeSubjectIds: listaMateriasFake })

  const guardarDatosGenerales = async () => await updateGeneralAcademicData(datosGenerales)

  return (
    <>
    { estanLosDatosCargados &&
      <ParesDeCarreras
        paresCarrerasData={datosGenerales.careerPairs}
        editarDatosGenerales={editarParesCarrerasDatosGenerales}
        carrerasGuaraniData={carrerasGuarani}
        guardarDatosGenerales={guardarDatosGenerales}
        sePuedeGuardar={sePuedeGuardar}
      />
    }

      <NivelesIngles
        materias={materiasSinRepetidos}
        nivelesInglesData={datosGenerales.englishLevelIds}
        editarDatosGenerales={editarNivelesInglesDatosGenerales}


      />
      <MateriasFake
        materias={materiasSinRepetidos}
        materiasFakeData={datosGenerales.fakeSubjectIds}
        editarDatosGenerales={editarMateriasFakeDatosGenerales}
      />

    {
      estanLosDatosCargados &&
      <MateriasComunes
        materiasComunesData={datosGenerales.specialSubjects}
        editarDatosGenerales={editarMateriasComunesDatosGenerales}
        materiasGuaraniData={materiasSinRepetidos}
      />
    }

    </>
  );
}

export default DatosGenerales;
