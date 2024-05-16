import { Route, Routes } from "react-router-dom";
// import { FilmsPage } from "./pages/FilmsPageReduxStyle";
import { ConfiguracionCarreras } from "./pages/ConfiguracionCarreras";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export function AppRouter() {
    return (
        <Routes>
            <Route path='/Configuracion' element={<ConfiguracionCarreras />} />
            <Route path='/' element={
            <Box sx={{ typography: 'h5', color: grey[900] }}>
                Elija una opción del menú
            </Box>
            } />
        </Routes>
    );
}