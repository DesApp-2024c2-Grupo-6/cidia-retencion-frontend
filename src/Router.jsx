import { Route, Routes } from "react-router-dom";
import SeleccionCarrera from "./pages/SeleccionCarrera";
import ConfiguracionCarrera from "./pages/ConfiguracionCarrera";
import Home from "./pages/Home";

export function Router() {
    return (
        <Routes>
        <Route path='/configuracion' element={<SeleccionCarrera />} />
        <Route path='/configuracion/carrera' element={<ConfiguracionCarrera />} />
            
            <Route path='*' element={ <Home /> } />
        </Routes>
    );
}