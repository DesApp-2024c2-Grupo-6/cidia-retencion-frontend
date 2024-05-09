import ButtonGeneral  from './components/ButtonGeneral'
import './App.css'
import Header from './components/Header'
import Card from './components/Draft/Card';

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

            <Card />
        </>
    )
}




export default App;