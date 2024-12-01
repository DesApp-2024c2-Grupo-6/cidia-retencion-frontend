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

//Utils
import { isEqual } from 'lodash';
import MateriasComunes from '../components/DatosGenerales/MateriasComunes';


function FormDatosGenerales({ carrerasData, materiasData }) {

  const DATOS_VACIOS = { careerPairs: [], fakeSubjectIds: [], specialSubjects: [], englishLevelIds: [] };
  materiasData.sort((a,b) => a.name.localeCompare(b.name))
  carrerasData.sort((a,b) => a.nombre.localeCompare(b.nombre))
  const [datosGenerales, setDatosGenerales] = useState(DATOS_VACIOS)
  const [datosGeneralesSinEditar, setDatosGeneralesSinEditar] = useState(DATOS_VACIOS)
  const [carrerasGuarani, setCarrerasGuarani] = useState(carrerasData)
  const [estanLosDatosCargados, setEstanLosDatosCargados] = useState(false)
  const [seGuardaronLosDatos, setSeGuardaronLosDatos] = useState(false)



  const datosGeneralesConNombres = (datosGenerales) => {
    //Aregrega los nombres a las carreras y materias de los datos generales
    //Retorna un objeto
    const paresCarrerasConNombres = datosGenerales.careerPairs.map(par => {
      const parConNombre = par;
      const carreraCortaGuarani = carrerasData.find(carrera => carrera.id == par.shortCareer.id)
      const carreraLargaGuarani = carrerasData.find(carrera => carrera.id == par.longCareer.id)
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
      const materiaGuarani = materiasData.find(materia => materia.id == materiaConNombre.id)
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
      await setDatosGenerales(datosGeneralesConNombres(datosGeneralesRecibidos.data.datosAcademicos))
      await setDatosGeneralesSinEditar(structuredClone(datosGeneralesConNombres(datosGeneralesRecibidos.data.datosAcademicos)))
      setEstanLosDatosCargados(true)
      setSeGuardaronLosDatos(false)
    }
    getDatosGenerales()
  }, [seGuardaronLosDatos])



  //Confirmacion de guardado
  const hayParCarreraVacio = datosGenerales.careerPairs.find(par => par.shortCareer.id == "" || par.longCareer.id == "")
  const hayMateriaComunVacia = datosGenerales.specialSubjects.find(materia => materia.id == "" || materia.name == "")
  const hayCambios = !isEqual(datosGenerales, datosGeneralesSinEditar)
  const sePuedeGuardar = hayCambios && !hayParCarreraVacio && !hayMateriaComunVacia
  const mensajeGuardado = (hayParCarreraVacio || hayMateriaComunVacia) ? "Debe llenar todos los campos" : (!hayCambios) ? "No hay cambios para guardar" : "Hay cambios sin guardar"

  //Funciones para editar las propiedades de generalAcademicData
  const editarParesCarrerasDatosGenerales = (nuevosPares) => setDatosGenerales({ ...datosGenerales, careerPairs: nuevosPares })
  const editarMateriasComunesDatosGenerales = (nuevasMaterias) => setDatosGenerales({ ...datosGenerales, specialSubjects: nuevasMaterias })
  const editarNivelesInglesDatosGenerales = (listaIds) => setDatosGenerales({ ...datosGenerales, englishLevelIds: listaIds })
  const editarMateriasFakeDatosGenerales = (listaMateriasFake) => setDatosGenerales({ ...datosGenerales, fakeSubjectIds: listaMateriasFake })

  const guardarDatosGenerales = async () => {
    const response = await updateGeneralAcademicData(datosGenerales)
    if (response.status == 200)
      setSeGuardaronLosDatos(true)
  }

  return (
    <>
      {estanLosDatosCargados &&
        <ParesDeCarreras
          paresCarrerasData={datosGenerales.careerPairs}
          editarDatosGenerales={editarParesCarrerasDatosGenerales}
          carrerasGuaraniData={carrerasData}
          guardarDatosGenerales={guardarDatosGenerales}
          sePuedeGuardar={sePuedeGuardar}
          mensajeGuardado={mensajeGuardado}
        />
      }

      <NivelesIngles
        materias={materiasData}
        nivelesInglesData={datosGenerales.englishLevelIds}
        editarDatosGenerales={editarNivelesInglesDatosGenerales}


      />
      <MateriasFake
        materias={materiasData}
        materiasFakeData={datosGenerales.fakeSubjectIds}
        editarDatosGenerales={editarMateriasFakeDatosGenerales}
      />

      {
        estanLosDatosCargados &&
        <MateriasComunes
          materiasComunesData={datosGenerales.specialSubjects}
          editarDatosGenerales={editarMateriasComunesDatosGenerales}
          materiasGuaraniData={materiasData}
        />
      }

    </>
  );
}

function DatosGenerales() {

  const [materiasGuarani, setMateriasGuarani] = useState()
  const [carrerasGuarani, setCarrerasGuarani] = useState()

  useEffect(() => {
    const getMateriasYCarreras = async () => {
      const materias = (await getAllSubjectsGuarani()).data.materiasSiu
      const listaFiltrada = materias.filter((materia) => { return materia.name != undefined })
      const materiasSinRepetidos = listaFiltrada.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.id === value.id
        ))
      )
      const carreras = (await getAllCareerGuarani()).data
      setCarrerasGuarani(carreras)
      setMateriasGuarani(materias)
    }
    getMateriasYCarreras()
  }, [])

  return (
    <>
      {materiasGuarani && carrerasGuarani &&
        <FormDatosGenerales carrerasData={carrerasGuarani} materiasData={materiasGuarani} />
      }
    </>
  );

}

export default DatosGenerales;