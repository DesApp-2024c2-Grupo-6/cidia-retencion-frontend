//MUI
import { Autocomplete, TextField, Stack, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//MUI - Icons
import SearchIcon from '@mui/icons-material/Search';

export default function SelectorCohorte({ periodosData, carrerasData, handleChange, handleSearch, datosBusqueda, estaBuscando }){
    const theme = useTheme();
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "stretch",
                marginBottom: 2,
                width: "100%",
                flexWrap: 'wrap'
            }}>
            <Stack id="smar" sx={{ width: "30%", }} spacing={3}>
                <Autocomplete
                    disablePortal
                    disableClearable
                    sx={{ backgroundColor: "white" }}
                    options={periodosData || []}
                    onChange={(event, option) => handleChange(option.value, "idPeriodo")}
                    renderInput={(params) => <TextField {...params} label="Periodo" sx={{ height: '55px' }} />}
                />
            </Stack>
            <Stack id="smar" sx={{ width: "30%" }} spacing={3}>
                <Autocomplete
                    disablePortal
                    disableClearable
                    sx={{ backgroundColor: "white" }}
                    options={carrerasData || []}
                    onChange={(event, option) => handleChange(option.value, "idCarrera")}
                    renderInput={(params) => <TextField {...params} label="Carrera" sx={{ height: '55px' }} />}
                />
            </Stack>
            <Button
                sx={{
                    width: '15%',
                    display: "flex", justifyContent: "center", alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    color: "white"
                }}
                variant="contained"
                startIcon={<SearchIcon />}
                disabled={datosBusqueda.idPeriodo == "" || datosBusqueda.idCarrera == "" || estaBuscando}
                onClick={() => handleSearch()}
            >Buscar
            </Button>
        </Stack>
    )
}
