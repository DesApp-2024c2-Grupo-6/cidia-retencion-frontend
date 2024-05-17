import './App.css'
import Header from './components/Header'
import VentanaEmergente from  './components/VentanaEmergente'
import ParrafoPlantilla from './components/ParrafoPlantilla'
import ListaParrafos from './pages/ListaParrafos'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import ConfiguracionCarreras from '../src/pages/ConfiguracionCarreras'
import { Box } from "@mui/material";



function App() {

    return (

        <>

            <Box className="app-container">
                <Header />
                <Box component="main"  className="main-content">
                    <Routes>
                        <Route path="/Configuracion" element={ <ConfiguracionCarreras></ConfiguracionCarreras> }></Route>
                        <Route path="/ListaParafos" element={ <ListaParrafos></ListaParrafos> }></Route>
                    </Routes>

                </Box>
                <Footer />
            </Box>



        </>

    )
}
export default App;