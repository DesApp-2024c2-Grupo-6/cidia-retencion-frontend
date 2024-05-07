import './App.css'
import Header from './components/Header'
import VentanaEmergente from  './components/VentanaEmergente'
import ParagraphComponent from './components/ParrafoPlantilla'
function App() {
    return (
        <>
            <ParagraphComponent text="hola" onEdit={() => console.log('Editar párrafo')} onDelete={() => console.log('Eliminar párrafo')}></ParagraphComponent>
     </>
    )
}




export default App;