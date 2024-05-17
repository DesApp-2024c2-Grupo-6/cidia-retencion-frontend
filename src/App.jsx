import './App.css'
import Header from './components/Header'
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
                    </Routes>
                </Box>
                <Footer />
            </Box>
        </>
    )
}
export default App;