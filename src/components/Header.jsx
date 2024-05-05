import logo from '../assets/img/Logo-UNAHUR.png';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const buttons = [
    <Button key="Configuraciones" variant="contained" onClick={changeOptionPage}>Configuraciones</Button>,
    <Button key="two" variant="contained">opci�n 2</Button>,
    <Button key="three" variant="contained">opci�n 3</Button>,
    <Button key="four" variant="contained">opci�n 4</Button>,
    <Button key="four" variant="contained">opci�n 4</Button>,
    <Button key="four" variant="contained">opci�n 4</Button>,
];
// 
function changeOptionPage(e) {
    window.sessionStorage.setItem("mainContent", e.key);
    
}
function Header() {
    return (
        <header>
            <img src={logo} alt="UNAHUR" />
            <ButtonGroup size="large" aria-label="Large button group">{buttons}</ButtonGroup>
        </header>
    );
}

export default Header;