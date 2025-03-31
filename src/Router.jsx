import { Route, Routes } from "react-router-dom";

//Pages - Configuracion
import SeleccionCarrera from "./pages/SeleccionCarrera";
import ListaParrafos from "./pages/ListaParrafos";
import ConfiguracionCarrera from "./pages/ConfiguracionCarrera";
import ConfiguracionCondicionCarrera from "./pages/ConfiguracionCondicionesCarrera";
import ConfiguracionMaterias from "./pages/ConfiguracionMaterias";
import Home from "./pages/Home";
import DatosGenerales from "./pages/DatosGenerales";

//Pages - Asistencia

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

]

//Merge de todas las rutas
const routes = [
    ...routesConfiguracion,
     ...routesAsistencia
]

export function Router() {
    return (
        <Routes>
            {
                routes.map(route => <Route path={route.path} element={route.element}/>)
            }
            <Route path='*' element={<Home/>}/>
        </Routes>
    );
}