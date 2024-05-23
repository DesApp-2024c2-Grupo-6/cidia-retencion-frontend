
const condiciones = [
    {
        id_carrera: 6,
        anio: 2,
        codigo_condicion: 'CANT-MATERIAS-ANIO',
        config_condicion: { anio: 1, cantidad: 3, campos: ['CFE1', 'CFE2'] }
    },
    {
        id_carrera: 6,
        anio: 2,
        codigo_condicion: 'CANT-MATERIAS-ANIO',
        config_condicion: { anio: 1, cantidad: 2, campos: ['CFB1', 'CFB2'] }
    },
    {
        id_carrera: 34,
        anio: 2,
        codigo_condicion: 'CANT-MATERIAS-ANIO',
        config_condicion: { anio: 1, cantidad: 3, campos: ['CFE1', 'CFE2'] }
    },
    {
        id_carrera: 34,
        anio: 2,
        codigo_condicion: 'CANT-MATERIAS-ANIO',
        config_condicion: { anio: 1, cantidad: 2, campos: ['CFB1', 'CFB2'] }
    },
    {
        id_carrera: 6,
        anio: 3,
        codigo_condicion: 'ANIOS-COMPLETOS',
        config_condicion: { anio: 1 }
    },
    {
        id_carrera: 6,
        anio: 3,
        codigo_condicion: 'CANT-MATERIAS-ANIO',
        config_condicion: { anio: 2, cantidad: 3, campos: ['CFE1', 'CFE2'] }
    },
    {
        id_carrera: 34,
        anio: 3,
        codigo_condicion: 'ANIOS-COMPLETOS',
        config_condicion: { anio: 1 }
    },
    {
        id_carrera: 34,
        anio: 3,
        codigo_condicion: 'CANT-MATERIAS-ANIO',
        config_condicion: { anio: 2, cantidad: 3, campos: ['CFE1', 'CFE2'] }
    },
    {
        id_carrera: 34,
        anio: 4,
        codigo_condicion: 'CAMPOS-COMPLETOS',
        config_condicion: { campos: ['CFE1', 'CFB1'] }
    },
    {
        id_carrera: 34,
        anio: 5,
        codigo_condicion: 'CANT-MATERIAS-ANIO',
        config_condicion: { anio: 4, cantidad: 2, campos: ['CFE1', 'CFE2'] }
    },
    {
        id_carrera: 34,
        anio: 5,
        codigo_condicion: 'CANT-MATERIAS-ANIO',
        config_condicion: { anio: 4, cantidad: 2, campos: ['CFB1', 'CFB2'] }
    },
    {
        id_carrera: 6,
        id_materia: 227,
        codigo_condicion: 'ANIOS-COMPLETOS',
        config_condicion: { anio: 3 }
    },
    {
        id_carrera: 34,
        id_materia: 227,
        codigo_condicion: 'ANIOS-COMPLETOS',
        config_condicion: { anio: 3 }
    },
    {
        id_carrera: 7,
        codigo_condicion: 'N-2'
    },
    {
        id_carrera: 7,
        id_materia: 210,
        codigo_condicion: 'CANT-MATERIAS',
        config_condicion: { cantidad: 12, campos_excepto: ['CFC1', 'CFC2'] }
    },
    {
        id_carrera: 7,
        id_materia: 263,
        codigo_condicion: 'CANT-MATERIAS',
        config_condicion: { cantidad: 12, campos_excepto: ['CFC1', 'CFC2'] }
    },
    {
        id_carrera: 13,
        codigo_condicion: 'N-2'
    },
    {
        id_carrera: 13,
        id_materia: 210,
        codigo_condicion: 'CANT-MATERIAS',
        config_condicion: { cantidad: 12, campos_excepto: ['CFC1', 'CFC2'] }
    },
    {
        id_carrera: 13,
        id_materia: 263,
        codigo_condicion: 'CANT-MATERIAS',
        config_condicion: { cantidad: 12, campos_excepto: ['CFC1', 'CFC2'] }
    },
    {
        id_carrera: 13,
        id_materia: 399,
        codigo_condicion: 'CANT-MATERIAS',
        config_condicion: { cantidad: 22 }
    },
    {
        id_carrera: 13,
        id_materia: 398,
        codigo_condicion: 'CANT-MATERIAS',
        config_condicion: { cantidad: 22 }
    },
    {
        id_carrera: 13,
        id_materia: 407,
        codigo_condicion: 'CANT-MATERIAS',
        config_condicion: { cantidad: 34 }
    },
    {
        id_carrera: 13,
        anio: 4,
        codigo_condicion: 'ANIOS-COMPLETOS',
        config_condicion: { anio: 3, salvo_cantidad: 3 }
    },
    {
        id_carrera: 13,
        anio: 5,
        codigo_condicion: 'ANIOS-COMPLETOS',
        config_condicion: { anio: 3, salvo_cantidad: 3 }
    },
    {
        id_carrera: 1,
        codigo_condicion: 'N-2'
    },
    {
        id_carrera: 16,
        codigo_condicion: 'N-1R-2A'
    },
    {
        id_carrera: 21,
        anio: 3,
        codigo_condicion: 'MATERIAS-ESPECIFICAS',
        config_condicion: { materias: [545, 580, 546, 547, 549, 550] }
    },
    {
        id_carrera: 21,
        id_materia: 559,
        codigo_condicion: 'MATERIAS-ESPECIFICAS',
        config_condicion: { materias: [551] }
    },
    {
        id_carrera: 21,
        id_materia: 579,
        codigo_condicion: 'MATERIAS-ESPECIFICAS',
        config_condicion: { materias: [554] }
    },
    {
        id_carrera: 38,
        anio: 3,
        codigo_condicion: 'MATERIAS-ESPECIFICAS',
        config_condicion: { materias: [545, 580, 546, 547, 549, 550] }
    },
    {
        id_carrera: 38,
        id_materia: 559,
        codigo_condicion: 'MATERIAS-ESPECIFICAS',
        config_condicion: { materias: [551] }
    },
    {
        id_carrera: 38,
        id_materia: 579,
        codigo_condicion: 'MATERIAS-ESPECIFICAS',
        config_condicion: { materias: [554] }
    },
    {
        id_carrera: 39,
        codigo_condicion: 'N-2'
    },
    {
        id_carrera: 11,
        codigo_condicion: 'N-2'
    },
    {
        id_carrera: 2,
        codigo_condicion: 'N-2'
    },
    {
        id_carrera: 53,
        codigo_condicion: 'N-2'
    },
    {
        id_carrera: 12,
        codigo_condicion: 'N-2'
    }
];

export default condiciones;