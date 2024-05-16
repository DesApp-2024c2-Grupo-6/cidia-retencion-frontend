import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import ConfiguracionCarreras from '../src/pages/ConfiguracionCarreras'
import CardDraft from './components/Draft/CardDraft';


function App() {

    const saludar = () =>{
        alert("Hola")
    }
    return (
        <>
            <div className="app-container">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/Configuracion" element={ <ConfiguracionCarreras></ConfiguracionCarreras> }></Route>
                    </Routes>
                </main>
                <Footer />
            </div>
        </>
    )
}
export default App;