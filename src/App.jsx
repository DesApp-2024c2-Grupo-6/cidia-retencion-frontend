import './App.css'
import Header from './components/Header'
import CardDraft from './components/Draft/CardDraft';
import ConfiguracionListadoMaterias from './components/ConfiguracionListadoMaterias';

function App() {

    const saludar = () =>{
        alert("Hola")
    }
    return (
        <>
            <Header />
            <h1>Pruebas locas</h1>
            <CardDraft/>
            <ConfiguracionListadoMaterias />
        </>
    )
}




export default App;