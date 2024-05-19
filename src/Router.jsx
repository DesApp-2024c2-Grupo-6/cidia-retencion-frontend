import { Route, Routes } from "react-router-dom";
import ConfiguracionCarreras from "./pages/ConfiguracionCarreras";
import Home from "./pages/Home";

export function Router() {
    return (
        <Routes>
            <Route path='/configuracion' element={<ConfiguracionCarreras />} />
            { 
                // aca se pueden poner otras rutas ...
            }
            <Route path='*' element={ <Home /> } />
        </Routes>
    );
}