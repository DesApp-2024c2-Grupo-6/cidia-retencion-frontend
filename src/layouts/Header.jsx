import React, { useState } from 'react';
import logo from '@assets/img/Logo-UNAHUR-White.png';
import LogoColor from '@assets/img/logo_unahur_2.png';
import Button from '@mui/material/Button';
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

//Icons
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



function Header() {
    //Invoco Hook
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:1220px)');

    const handleClick = (path) => {
        console.log("Navigate to" + path)
        navigate(path);
        if (isMobile) setDrawerOpen(false);
    }


    const opciones = [
        { text: 'Configuraciones', path: '/configuracion', disabled: false, icon: <SettingsIcon /> },
        { text: 'Asistencia', path: '/asistencia-cursadas', disabled: false, icon: <PersonIcon /> },
        { text: 'Cohortes', path: '/cohortes', disabled: false, icon: <PeopleAltIcon /> },
        { text: 'Opción 4', path: '', disabled: true, icon: <ErrorOutlineIcon /> },
        { text: 'Opción 5', path: '', disabled: true, icon: <ErrorOutlineIcon /> },
        { text: 'Opción 6', path: '', disabled: true, icon: <ErrorOutlineIcon /> },
    ];

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "white", borderBottom: 1, borderColor: theme.palette.disabled.light, borderWidth: 2 }}>
            {isMobile ? (
                <>
                    <Box sx={{ width: '100%', height: '100px' }} display="flex" alignItems="center" justifyContent="space-between" >
                        <img src={LogoColor} alt="UNAHUR" style={{ marginLeft: '30px', height: '50px' }} />
                        <IconButton edge="end" color={theme.palette.disabled.main} aria-label="menu" onClick={handleDrawerToggle} sx={{ width: '60px', marginRight: '30px' }}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle} >
                            <List sx={{padding: 2}}>
                                {
                                    opciones.map(opcion =>
                                        <Button sx={{ marginBottom: 4, color: theme.palette.disabled.dark, fontWeight: 'bold', display: 'flex', flexDirection: 'column', fontSize: 'small', maxWidth: '160px', "&:disabled": { color: theme.palette.disabled.main }, "&:hover": { backgroundColor: theme.palette.disabled.light, } }}
                                            key={opcion.text} variant="text" onClick={() => handleClick(opcion.path)} disabled={opcion.disabled}>
                                            <Box>
                                                {opcion.icon}
                                            </Box>
                                            {opcion.text}
                                        </Button>
                                    )
                                }
                            </List>
                        </Drawer>
                    </Box>
                </>
            ) : (
                <Stack direction="row-reverse"
                    spacing={2}
                    sx={{
                        width: '100%',
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
                            padding: '0px'
                        }}
                        alt="Logo UNAHUR"
                        src={LogoColor}
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
                                opciones.map(opcion =>
                                    <Button sx={{ color: theme.palette.disabled.dark, fontWeight: 'bold', display: 'flex', flexDirection: 'column', fontSize: 'small', maxWidth: '160px', "&:disabled": { color: theme.palette.disabled.main }, "&:hover": { backgroundColor: theme.palette.disabled.light, } }}
                                        key={opcion.text} variant="text" onClick={() => handleClick(opcion.path)} disabled={opcion.disabled}>
                                        <Box>
                                            {opcion.icon}
                                        </Box>
                                        {opcion.text}
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