import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import theme from './styles/CustomTheme'
import { Router } from './Router';
import { Box } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';



function App() {

    return (
        <>
            <Box className="app-container">
                <ThemeProvider theme={theme}>
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
                </ThemeProvider>
            </Box >
        </>
    )
}
export default App;