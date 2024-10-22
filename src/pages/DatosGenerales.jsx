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

//Datos de prueba
import {getAllSubjectData,getAllSubjectsGuarani} from '../services/SubjectDataService'
import listadoCarrerasGuarani from '../services/listadoCarrerasGuarani'
import listadoGeneralAcademicData from '../services/listadoGeneralAcademicData'
import MateriasComunes from '../components/DatosGenerales/MateriasComunes';
const materiasSiu = await getAllSubjectsGuarani()
const listaFiltrada = materiasSiu.data.materiasSiu.filter((materia) => {return materia.name != undefined})
const materiasSinRepetidos = listaFiltrada.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.id === value.id
    ))
  )

function DatosGenerales() {

    //Esto se va a setear con un fetch cuando este lista la api de generalAcademicData
    const paresCarrerasConNombres = listadoGeneralAcademicData[0].careerPairs.map(par => ({shortCareer:{nombre: "Nombre carrera corta", id:par.shortCareer.id}, longCareer:{nombre: "Nombre carrera larga", id:par.longCareer.id}}))
    const materiasComunesConNombres = listadoGeneralAcademicData[0].specialSubjects.map(subject => ({id: subject.id, name:subject.name, realName:"Nombre de la materia"}))

    const [datosGenerales, setDatosGenerales] = useState({...listadoGeneralAcademicData[0], careerPairs: paresCarrerasConNombres, specialSubjects:materiasComunesConNombres})
    const [carrerasGuarani, setCarrerasGuarani] = useState(listadoCarrerasGuarani)

    //Funciones para editar las propiedades de generalAcademicData
    const editarParesCarrerasDatosGenerales = (nuevosPares) => setDatosGenerales({...datosGenerales, careerPairs: nuevosPares})
    const editarMateriasComunesDatosGenerales = (nuevasMaterias) => setDatosGenerales({...datosGenerales, specialSubjects: nuevasMaterias})
    const [materiasInglesSeleccionadas, setMateriasSeleccionadas] = React.useState([])
    /*
    useEffect(() => {

    }, [])
    */

    return (
        <>
            <ParesDeCarreras 
            paresCarrerasData={datosGenerales.careerPairs}
            editarDatosGenerales = {editarParesCarrerasDatosGenerales}
            carrerasGuaraniData={carrerasGuarani}
            />

            <NivelesIngles
            materias = {materiasSinRepetidos}
            setMaterias = {setMateriasSeleccionadas}
            />
            <MateriasFake
            materias = {materiasSinRepetidos}
            setMaterias = {setMateriasSeleccionadas}
            />

            
            <MateriasComunes
            materiasComunesData={datosGenerales.specialSubjects}
            editarDatosGenerales = {editarMateriasComunesDatosGenerales}
            carrerasGuaraniData={carrerasGuarani}
            />
            

        </>
    );
}

export default DatosGenerales;
