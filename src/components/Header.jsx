import logo from '../../assets/img/Logo-UNAHUR.png';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { useNavigate } from 'react-router-dom';
//import Box from '@mui/material/Box';

function Header() {
    //Invoco Hook
    const navigate = useNavigate();
    
    //funciones para navegar tendremos 2 por ahora Home y Configuracion
    const handleOnClickHome = () => {
        navigate('/home')
    }

    const handleOnClickConfiguracion = () => {
        navigate('/configuracion')
    }

const buttons = [
    <Button key="Configuraciones" variant="contained" onClick={handleOnClickConfiguracion}>Configuraciones</Button>,
    <Button key="two" variant="contained" onClick={handleOnClickHome}>opción 2</Button>,
    <Button key="three" variant="contained">opción 3</Button>,
    <Button key="four" variant="contained">opción 4</Button>,
    <Button key="four" variant="contained">opción 4</Button>,
    <Button key="four" variant="contained">opción 4</Button>,
];

    return (
        <header>
            <img src={logo} alt="UNAHUR" />
            {<ButtonGroup size="large" aria-label="Large button group">{buttons}</ButtonGroup>}
        </header>
    );
}

export default Header;