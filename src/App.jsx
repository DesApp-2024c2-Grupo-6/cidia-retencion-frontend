import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import theme from './styles/CustomTheme'
import { Router } from './Router';
import { Box } from "@mui/material";
import { ThemeProvider} from '@mui/material/styles';



function App() {

    return (
        <>
            <Box className="app-container">
                <ThemeProvider theme={theme}>
                <Header />
                <Box component="main" className="main-content">
                    <Router />
                </Box >
                <Footer />
                </ThemeProvider>
            </Box >
        </>
    )
}
export default App;