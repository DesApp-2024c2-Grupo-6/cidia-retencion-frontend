const listadoDeParrafos= [
    {
        textId: 'suggestionMail',
        _rawData: [
            {
                key: "intro",
                text: [
                    "Estimado/a ${nombreDelAlumno},", "",
                    "En función de tu recorrido académico en la carrera ${nombreDeLaCarrera}, te enviamos las siguientes sugerencias de inscripción para el próximo período."
                ],
                conditions: [
                    {
                        codigo_condicion: 'SIEMPRE'
                    },
                ]
            },
            {
                key: 'materiasCorrelativas',
                text: [
                    "Por un lado, considerando las materias que regularizaste hasta ahora, <i>te sugerimos</i> que consideres para " +
                    "tu inscripción algunas de las siguientes materias, en función de las correlatividades de tu plan de estudios:"+
                    ""+
                    "${materiasCorrelativas}"+
                    "<b><u>Aclaración</u></b>: "+
                    "Si entre las sugerencias ves una materia que ya regularizaste o tenés en curso, no te preocupes, se debe a una cuestión administrativa interna.",
                    "",
                ],
                conditions: [
                    {
                        codigo_condicion: 'SIEMPRE'
                    },
                ]
            },
            {
                key: 'recomendacionCantidadMaterias',
                text: [
                    "Por otro lado, hemos notado que en tus últimos dos cuatrimestres " +
                    "${cantidadMateriasInscriptoTotal} y ${cantidadMateriasRegularizadasTotal}. " +
                    "Por lo tanto, para el próximo cuatrimestre <i>te sugerimos</i> que ${cantidadMateriasRecomendacion}${anualesQueSeRestan}.",
                    "Es importante que consideres el tiempo que deberás dedicarle a cada materia, " +
                    "tanto de cursada como por fuera de las clases, y el tiempo del que podrás disponer para el estudio." +
                    "La planificación del cuatrimestre es un acto fundamental para el sostenimiento de la cursada en la universidad."
                ],
                conditions: [
                    {
                        codigo_condicion: 'SIEMPRE'
                    },
                ]
            },
            {
                key: 'materiasComunes',
                text: [
                    "Recordá que también podés cursar las siguientes materias comunes en cualquier momento de la carrera y que, " +
                    "por su carga horaria semanal, pueden ser un buen complemento para materias con mayor carga teórica:",
                    "",
                    "${materiasComunesPendientes}"
                ],
                conditions: [
                    {
                        codigo_condicion: 'MATERIAS_COMUNES'
                    },
                ]
            },
            {
                key: 'informatica1MateriasBasicas',
                text:
                    "Te sugerimos que no dejes para último momento la cursada de ${informaticaMateriasBasicas}; esto es importante " +
                    "para incorporar otros conocimientos y fundamental para poder seguir avanzando en tu trayecto.",
                conditions: [
                    {
                        codigo_condicion: 'EN_CARRERA',
                        config_condicion: { id_carreras: [21, 38], condicion_en_carrera: "incluye"}
                    },
                    {
                        codigo_condicion: 'MATERIAS_NO_PENDIENTES',
                        config_condicion: { id_materias: [578], cant: 1 }
                    },
                    {
                        codigo_condicion: 'MATERIAS_PENDIENTES',
                        config_condicion: { id_materias: [545, 546], cant: 1 }
                    }
                ]
            },
            {
                key: 'informatica2Ingles',
                text:
                    "Te sugerimos que por tu grado de avance en la carrera consideres hacer Inglés 1 dada " +
                    "la importancia del idioma al momento de encarar materias avanzadas.",
                conditions: [
                    {
                        codigo_condicion: 'EN_CARRERA',
                        config_condicion: { id_carreras: [21, 38], condicion_en_carrera: "incluye" }
                    },
                    {
                        codigo_condicion: 'CANT_APROBADAS',
                        config_condicion: { cant: 7 }
                    },
                    {
                        codigo_condicion: 'MATERIAS_PENDIENTES',
                        config_condicion: { id_materias: [31], cant: 1 }
                    }
                ]
            },
            {
                key: 'educFisica1Natacion',
                text:
                    "Te sugerimos que no dejes para los últimos años la cursada de ${materiasNatacionFaltantes}. " +
                    "Tené en cuenta esto, sobre todo, si no tenés experiencia en natación.",
                conditions: [
                    {
                        codigo_condicion: 'EN_CARRERA',
                        config_condicion: { id_carreras: [1], condicion_en_carrera: "incluye" }
                    },
                    {
                        codigo_condicion: 'MATERIAS_PENDIENTES',
                        config_condicion: { id_materias: [20, 26], cant: 1 }
                    }
                ]
            },
            {
                key: 'metalurgia1MateriasTroncalesAnio1',
                text:
                    "Te sugerimos que no dejes para último momento la cursada de ${metalurgiaMateriasTroncalesAnio1Pendientes} del primer año; " +
                    "esto es fundamental para poder seguir avanzando en tu trayectoria académica.",
                conditions: [
                    {
                        codigo_condicion: 'EN_CARRERA',
                        config_condicion: { id_carreras: [5, 31], condicion_en_carrera: "incluye" }
                    },
                    {
                        codigo_condicion: 'MATERIAS_PENDIENTES',
                        config_condicion: { id_materias: [160, 149], cant: 1 }
                    }
                ]
            },
            {
                key: 'finalesPendientes',
                text: [
                    "Asimismo, es importante que en la planificación de tu cursada consideres también " +
                    "la preparación de los exámenes finales de las siguientes materias que ya tenés regularizadas:",
                    "",
                    "${materiasConFinalPendiente}",
                ],
                conditions: [
                    {
                        codigo_condicion: 'FINALES_PENDIENTES'
                    },
                ]
            },
            {
                key: 'finalesFechasLimite',
                text:
                    "(1) Si no te presentás a rendir el final en los próximos llamados, se vencerá tu regularidad y deberás recursar la materia. " +
                    "Para conocer las fechas de llamados a exámenes finales, podés consultar el Calendario Académico: " +
                    "http://www.unahur.edu.ar/es/calendario-academico.",
                conditions: [
                    {
                        codigo_condicion: 'LIMITE_FINALES_PENDIENTES'
                    },
                ]
            },
            {
                key: 'avisoImportante',
                text:
                    "<b>IMPORTANTE</b>: esta información podría no tener en cuenta los datos de la cursada inmediata anterior. " +
                    "No te preocupes si eso sucede, la información está siendo procesada.",
                conditions: [
                    {
                        codigo_condicion: 'SIEMPRE'
                    },
                ]
            },
            {
                key: 'orientacion',
                text:
                    "Si necesitás asesoramiento en la planificación de tu carrera o acompañamiento para retomar tu cursada, " +
                    "podés acercarte a la Dirección de Orientación al Estudiante o también al Instituto que te corresponde.",
                conditions: [
                    {
                        codigo_condicion: 'ORIENTACION'
                    },
                ]
            },
            {
                key: 'final',
                text: [
                    "Frente a cualquier duda, podés comunicarte con la dirección del Instituto al que pertenece tu carrera. " +
                    "En la UNAHUR estamos para acompañarte."+
                    "Para referencia UNAHUR - DNI: ${dni}"
                ],
                conditions: [
                    {
                        codigo_condicion: 'SIEMPRE'
                    },
                ]
            },
        ]
    },
    {
        textId: 'genericTexts',
        _rawData: [
            { key: "nombreMateriaUnahur", text: 'Materias UNAHUR' },
            { key: "cantidadHorasMateriaUnahur", text: '2' }
        ]
    }
]; export default listadoDeParrafos