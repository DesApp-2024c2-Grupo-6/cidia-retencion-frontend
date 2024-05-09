import ButtonGeneral  from './components/ButtonGeneral'
import './App.css'
import Header from './components/Header'

function App() {
    return (
        <>
            <Header />
            <h1>Pruebas locas</h1>
            <ButtonGeneral 
                clr='success'
                name='SALUDAR'
                callback={() => alert("Hola!")}
            />
        </>
    )
}




export default App;