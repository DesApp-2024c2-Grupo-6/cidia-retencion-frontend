import './App.css'
import Header from './components/Header'
import { Router } from './Router';


function App() {

    const saludar = () =>{
        alert("Hola")
    }
    return (

        <>
            <Header />
            <Router />
        </>

    )
}
export default App;