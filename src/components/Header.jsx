import React, { useState } from 'react';
import logo from '../../assets/img/Logo-UNAHUR-White.png';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';



import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';


import SettingsIcon from '@mui/icons-material/Settings';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ListItemIcon } from '@mui/material';



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


    const drawerButtons = [
        { text: 'Configuraciones', onClick: handleOnClickConfiguracion, disabled: false, icon: <SettingsIcon/> },
        { text: 'Opción 2', onClick: handleOnClickHome, disabled: true, icon: <ErrorOutlineIcon/> },
        { text: 'Opción 3', disabled: true, icon: <ErrorOutlineIcon/> },
        { text: 'Opción 4', disabled: true, icon: <ErrorOutlineIcon/>  },
        { text: 'Opción 5', disabled: true, icon: <ErrorOutlineIcon/> },
        { text: 'Opción 6', disabled: true, icon: <ErrorOutlineIcon/> },
    ];

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <AppBar position="static" sx={{ boxShadow: 0, backgroundColor: theme.palette.primary.dark }}>
            {isMobile ? (
                <>
                    <Box sx={{ width: '100%', height: '100px' }} display="flex" alignItems="center" justifyContent="space-between" >
                        <img src={logo} alt="UNAHUR" style={{ marginLeft: '30px', height: '50px' }} />
                        <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ width: '50px', marginRight: '30px' }}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle} >
                            <List>
                                {drawerButtons.map((button, index) => (
                                    <ListItem button key={index} onClick={button.onClick} sx={{color: theme.palette.primary.dark}}>
                                        {button.icon}
                                        <ListItemText primary={button.text} sx={{marginLeft:'8px'}} />
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                    </Box>
                </>
            ) : (
                <Stack direction="row-reverse"
                    spacing={2}
                    sx={{
                        width:'100%',
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: '10px',
                        paddingX: '2%'
                        
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            width: '250px',
                            padding: '10px'
                        }}
                        alt="Logo UNAHUR"
                        src={logo}
                    />
                    <Box>
                        <Stack
                            direction="row"
                            spacing={0}
                            sx={{
                                justifyContent: "flex-start",
                                alignItems: "flex-end",
                            }}
                        >
                            {
                                drawerButtons.map(button =>
                                    <Button sx={{ color:'white', fontWeight: 'bold', display: 'flex', flexDirection: 'column', fontSize:'small', maxWidth:'160px', "&:disabled": { color: '#6894a3' }, "&:hover": { backgroundColor: '#0b4c63' }}}
                                        key={button.text} variant="text" onClick={button.onClick} disabled={button.disabled}>
                                        <Box>
                                            {button.icon}
                                        </Box>
                                        {button.text}
                                    </Button>
                                )
                            }
                        </Stack>
                    </Box>
                </Stack>
            )
            }

        </AppBar >
    );
}

export default Header;