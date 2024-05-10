import './App.css'
import Header from './components/Header'
import CardDraft from './components/Draft/CardDraft';

function App() {

    const saludar = () =>{
        alert("Hola")
    }
    return (
        <>
            <Header />
            <h1>Pruebas locas</h1>
            <CardDraft/>
            
        </>
    )
}




export default App;