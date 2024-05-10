import './App.css'
import Header from './components/Header'
import VentanaEmergente from  './components/VentanaEmergente'
import ParrafoPlantilla from './components/ParrafoPlantilla'
import ListaParrafos from './components/ListaParrafos'
function App() {
    return (
        <>
            <ParrafoPlantilla text="hola" onEdit={() => console.log('Editar párrafo')} onDelete={() => console.log('Eliminar párrafo')}></ParrafoPlantilla>
            <ListaParrafos></ListaParrafos> 
     
     </>
    )
}




export default App;