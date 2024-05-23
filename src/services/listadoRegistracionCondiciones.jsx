const listadoRegistacionCondiciones = [
    { 
        codigo: "N-1", 
        descripcion: "Para cursar cualquier materia del año N hay que tener regularizadas todas las del N-1"
    },
    {
        codigo: "N-2",
        descripcion: "Para cursar cualquier materia del año N hay que tener regularizadas todas las del N-2"
    },
    {
        codigo: "N-1R-2A",
        descripcion: "Para cursar cualquier materia del año N hay que tener, o bien regularizadas todas las del N-1, o bien aprobadas todas las del N-2"
    },
    {
        codigo: "CANT-MATERIAS",
        descripcion: "Hay que tener una cantidad de materias regularizadas, puede restringirse por campos",
        parametros: [
            { nombre: "cantidad", tipo: "Number", descripcion: "cuántas materias debe tener regularizadas el estudiante"},
            { nombre: "campos", tipo: "[String]", descripcion: "se piden materias de estos campos" },
            { nombre: "campos_excepto", tipo: "[String]", descripcion: "se piden materias que no sean de estos campos" },
        ]
    },
    {
        codigo: "ANIOS-COMPLETOS",
        descripcion: "Hay que tener regularizadas todas las materias hasta un año, salvo una determinada cantidad",
        parametros: [
            { nombre: "anio", tipo: "Number", descripcion: "hasta qué año debe tener completo el estudiante" },
            { nombre: "salvo_cantidad", tipo: "Number", descripcion: "hasta cuántas materias pueden faltar" }
        ]
    },
    {
        codigo: "CAMPOS-COMPLETOS",
        descripcion: "Hay que tener regularizadas todas las materias de uno o varios campos, salvo una determinada cantidad",
        parametros: [
            { nombre: "campos", tipo: "[String]", descripcion: "qué campos debe tener completo el estudiante" },
            { nombre: "salvo_cantidad", tipo: "Number", descripcion: "hasta cuántas materias pueden faltar" }
        ]
    },
    {
        codigo: "CANT-MATERIAS-ANIO",
        descripcion: "Hay que tener regularizadas una cantidad de materias de un año, cualesquiera o de ciertos campos",
        parametros: [
            { nombre: "anio", tipo: "Number", descripcion: "de qué año hay que tener una cantidad de materias regularizadas" },
            { nombre: "campos", tipo: "[String]", descripcion: "se piden materias de estos campos" },
            { nombre: "cantidad", tipo: "Number", descripcion: "cuántas materias debe tener regularizadas el estudiante del año indicado" }
        ]
    },
    {
        codigo: "MATERIAS-ESPECIFICAS",
        descripcion: "Hay que tener regularizadas ciertas materias",
        parametros: [
            { nombre: "materias", tipo: "[Number]", descripcion: "id de las materias que hay que tener regularizadas" },
            { nombre: "salvo_cantidad", tipo: "Number", descripcion: "hasta cuántas materias pueden faltar" }
        ]
    }
];
export default listadoRegistacionCondiciones;