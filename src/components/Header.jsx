import React, { useState } from 'react';
import logo from '../../assets/img/Logo-UNAHUR.png';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

//import Box from '@mui/material/Box';

function Header() {
    //Invoco Hook
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:1220px)');
    
    //funciones para navegar tendremos 2 por ahora Home y Configuracion
    const handleOnClickHome = () => {
        navigate('/home');
        if (isMobile) setDrawerOpen(false);
    }

    const handleOnClickConfiguracion = () => {
        navigate('/configuracion');
        if (isMobile) setDrawerOpen(false); 
    }

    const buttons = [
        <Button key="Configuraciones" variant="contained" onClick={handleOnClickConfiguracion}>Configuraciones</Button>,
        <Button key="two" variant="contained" onClick={handleOnClickHome}>opción 2</Button>,
        <Button key="three" variant="contained">opción 3</Button>,
        <Button key="four" variant="contained">opción 4</Button>,
        <Button key="five" variant="contained">opción 5</Button>,
        <Button key="six" variant="contained">opción 6</Button>,
    ];

    const drawerButtons = [
        { text: 'Configuraciones', onClick: handleOnClickConfiguracion },
        { text: 'Opción 2', onClick: handleOnClickHome },
        { text: 'Opción 3' },
        { text: 'Opción 4' },
        { text: 'Opción 5' },
        { text: 'Opción 6' },
    ];

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <header>
            
                
                {isMobile ? (
                <>
                    <Box sx={{ width: '100%', height:'100px' }} display="flex" alignItems="center" justifyContent="space-between" >
                        <img src={logo} alt="UNAHUR" style={{marginLeft:'30px', height: '100px' }} />
                        <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{width:'50px', marginRight:'30px'}}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                            <List>
                                {drawerButtons.map((button, index) => (
                                    <ListItem button key={index} onClick={button.onClick}>
                                        <ListItemText primary={button.text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                    </Box>
                    </>
                ) : (
                        <>
                    <img src={logo} alt="UNAHUR" />
                    <ButtonGroup size="large" aria-label="large button group">
                    {buttons}
                            </ButtonGroup></>
                )}
            
        </header>
    );
}

export default Header;