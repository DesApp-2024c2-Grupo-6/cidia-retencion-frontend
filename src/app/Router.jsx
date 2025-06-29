import { Route, Routes } from "react-router-dom";

//Pages - Configuracion
import SeleccionCarrera from "../features/configuraciones/SeleccionCarrera";
import ListaParrafos from "../features/configuraciones/lista-parrafos/ListaParrafos";
import ConfiguracionCarrera from "../features/configuraciones/carreras/ConfiguracionCarrera";
import ConfiguracionCondicionCarrera from "../features/configuraciones/carreras/ConfiguracionCondicionesCarrera";
import ConfiguracionMaterias from "../features/configuraciones/carreras/ConfiguracionMaterias";
import DatosGenerales from "../features/configuraciones/datos-generales/DatosGenerales";

//Pages - Asistencia
import AsistenciaCursadas from "../features/asistencia-cursadas/AsistenciaCursadas";

//Pages - Cohortes
import Cohortes from "../features/cohortes/Cohortes";

//Rutas - Configuracion
const routesConfiguracion = [
    {
        path: '/configuracion',
        element: <SeleccionCarrera />
    },
    {
        path: '/configuracion/datos-generales',
        element: <DatosGenerales />
    },
    {
        path: '/configuracion/carrera',
        element: <ConfiguracionCarrera />
    },
    {
        path: '/configuracion/parrafos',
        element: <ListaParrafos />
    },
    {
        path: '/configuracion/condiciones',
        element: <ConfiguracionCondicionCarrera />
    },
    {
        path: '/configuracion/materias',
        element: <ConfiguracionMaterias />
    },
];

//Rutas - Asistencia
const routesAsistencia = [
    {
        path: 'asistencia-cursadas',
        element: <AsistenciaCursadas />
    }
]

//Rutas - Cohortes
const routesCohortes = [
    {
        path: 'cohortes',
        element: <Cohortes />
    }
]


//Merge de todas las rutas
const routes = [
    ...routesConfiguracion,
    ...routesAsistencia,
    ...routesCohortes,
]

export function Router() {
    return (

        <Routes>
            {
                routes.map(route => <Route key={route.path} path={route.path} element={route.element} />)
            }

        </Routes>

    );
}