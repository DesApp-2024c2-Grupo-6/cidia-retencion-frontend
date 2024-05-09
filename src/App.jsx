import ButtonGeneral  from './components/ButtonGeneral'
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
            <ButtonGeneral 
                clr='success'
                name='SALUDAR'
                callback={saludar}
            />

            <CardDraft/>
            
        </>
    )
}




export default App;