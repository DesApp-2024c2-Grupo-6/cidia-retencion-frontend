import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Router } from './Router';

import { Box } from "@mui/material";


function App() {

    return (

        <>
            <Box className="app-container">
                <Header />
                <Box component="main" className="main-content">
                  <Router />
                </Box >
                <Footer />
            </Box >
        
          </>

    )
}
export default App;