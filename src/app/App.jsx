import './App.css'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import { Router } from './Router';
import { Box, Button } from "@mui/material";
import { useAlert } from '@context/AlertProvider';

function App() {

    return (
        <>
            <Box className="app-container">
                    <Header />
                    <Box component="main" className="main-content" sx={{
                        zIndex: 10,
                        minHeight: "100dvh",
                        height: "auto",
                        backgroundColor: "white",
                        backgroundImage: "radial-gradient(#f0f2f5 1px, transparent 1px)",
                        backgroundSize: "16px 16px"
                    }}>
                        <Router />
                    </Box >
                    <Footer />
            </Box >
        </>
    )
}
export default App;