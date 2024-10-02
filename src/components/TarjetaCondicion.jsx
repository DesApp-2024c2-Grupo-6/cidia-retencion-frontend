import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Checkbox } from '@mui/material';
import SelectMultipleAR from './SelectMultipleAR';

const TarjetaCondicion = ({ condicion, objeto, listaCarreras, handleSelectionCareer, listaMaterias, listaMateriasParaSelect, handleCheckbox, deshabilitarCampoNumerico, setCantidadAprobadas,
    setIdsMateriasMP, setCantidadAprobadasMP, setIdsMateriasMNP, setCantidadAprobadasMNP, checkboxDisabled
}) => {

    const [listamateriasseleccionadas, setListamateirasseleccionadas] = useState([])

    useEffect(() => {
        const lista = listaMaterias.map(m => ({
            value: m.id_materia,
            label: `Materia ${m.id_materia}`
        }));

        const eliminarDuplicados = (arr) => {
            const map = new Map();
            return arr.filter(item => !map.has(item.value) && map.set(item.value, true));
        };
        const listaSinDuplicados = eliminarDuplicados(lista);

        setListamateirasseleccionadas(listaMateriasParaSelect.length > 0 ? listaMateriasParaSelect : listaSinDuplicados);
    }, [listaMaterias])

 
    //CANTIDAD_APROBADAS
    const [cantidad, setCantidad] = useState((condicion == "CANT_APROBADAS" && objeto.config_condicion.cantidad) ? objeto.config_condicion.cantidad : '');
    //CANTIDAD_APROBADAS DE MATERIAS_PENDIENTES
    const [cantidadMP, setCantidadMP] = useState((condicion == "MATERIAS_PENDIENTES" && objeto.config_condicion.cantidad) ? objeto.config_condicion.cantidad : '');
    //CANTIDAD_APROBADAS DE MATERIAS_NO_PENDIENTES
    const [cantidadMNP, setCantidadMNP] = useState((condicion == "MATERIAS_NO_PENDIENTES" && objeto.config_condicion.cantidad) ? objeto.config_condicion.cantidad : '');



    ////SIN USAR
    const carrerasseleccionadas = (carreras) => {
        handeSelectionCareer(carreras);
    };

    const [isChecked, setIsChecked] = useState((objeto.config_condicion.en_carrera == "incluye"));

    //SIN USAR
    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        handleCheckbox(checked);
    };

    const handleCarrerasEnCarreraChange = (idCarreras) => {
        //Teniamos un bug donde aveces idCarreras era una lista de objetos y no una de numeros, la linea de abajo soluciona ese bug
        const lista = (idCarreras && typeof idCarreras[0] == 'number') ? idCarreras : idCarreras.map(carrera => carrera.value)
        handleSelectionCareer(lista)
    }

    const handleMateriasPendientesChange = (idMaterias) => {
        //Teniamos un bug donde aveces idCarreras era una lista de objetos y no una de numeros, la linea de abajo soluciona ese bug
        const lista = (idMaterias && typeof idMaterias[0] == 'number') ? idMaterias : idMaterias.map(materia => materia.value)
        setIdsMateriasMP(lista)
    };

    const handleMateriasNoPendientesChange = (idMaterias) => {
        //Teniamos un bug donde aveces idCarreras era una lista de objetos y no una de numeros, la linea de abajo soluciona ese bug
        const lista = (idMaterias && typeof idMaterias[0] == 'number') ? idMaterias : idMaterias.map(materia => materia.value)
        setIdsMateriasMNP(lista)

    };

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 2, padding: 1, border: '1px solid lightgray', borderRadius: 2, '&:hover': {
                borderColor: 'black',
            },
        }}>
            {condicion === "CANT_APROBADAS" && (
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Condición</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', width: '10ch', textAlign: 'center' }}>Cantidad</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ overflow: 'hidden', textAlign: 'center', justifyContent: 'center', textOverflow: 'ellipsis' }}>{condicion}</Typography>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField type="number" value={cantidad} variant="outlined" onChange={(event) => { setCantidadAprobadas(event.target.value), setCantidad(event.target.value) }} />
                        </Box>
                    </Box>
                </Box>
            )}
            {condicion === "EN_CARRERA" && (
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 1 }}>
                        <Box sx={{ width: '15%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Condición</Typography>
                        </Box>
                        <Box sx={{ width: '60%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Carreras</Typography>
                        </Box>
                        <Box sx={{ width: '10%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Va en carrera</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 1 }}>
                        <Box sx={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{condicion}</Typography>
                        </Box>
                        <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <SelectMultipleAR options={listaCarreras} seleccionadas={objeto.config_condicion.id_carreras} onSelect={handleCarrerasEnCarreraChange} placeholder='Seleccione Carreras'></SelectMultipleAR>
                        </Box>
                        <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Checkbox disabled={checkboxDisabled} checked={isChecked} onChange={(event) => { setIsChecked(event.target.checked), handleCheckbox(event.target.checked) }} />
                        </Box>
                    </Box>
                </Box>
            )}
            {(condicion === "MATERIAS_PENDIENTES") && (

                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 1 }}>
                        <Box sx={{ width: '25%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Condición</Typography>
                        </Box>
                        <Box sx={{ width: '60%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Materias</Typography>
                        </Box>
                        <Box sx={{ width: '10%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Cantidad</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 1 }}>
                        <Box sx={{ width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{condicion}</Typography>
                        </Box>
                        <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <SelectMultipleAR options={listamateriasseleccionadas} seleccionadas={objeto.config_condicion.id_materias} onSelect={(value) => handleMateriasPendientesChange(value)} placeholder='Seleccione Materias'></SelectMultipleAR>
                        </Box>
                        <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField type="number" value={cantidadMP} variant="outlined" onChange={(event) => {setCantidadAprobadasMP(event.target.value), setCantidadMP(event.target.value)}} sx={{ width: '100%' }} />
                        </Box>
                    </Box>
                </Box>
            )}
            {(condicion === "MATERIAS_NO_PENDIENTES") && (

                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 1 }}>
                        <Box sx={{ width: '25%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Condición</Typography>
                        </Box>
                        <Box sx={{ width: '60%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Materias</Typography>
                        </Box>
                        <Box sx={{ width: '10%', textAlign: 'center' }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="body2">Cantidad</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 1 }}>
                        <Box sx={{ width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{condicion}</Typography>
                        </Box>
                        <Box sx={{ width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <SelectMultipleAR options={listamateriasseleccionadas} seleccionadas={objeto?.config_condicion.id_materias} onSelect={handleMateriasNoPendientesChange} placeholder='Seleccione Materias'></SelectMultipleAR>
                        </Box>
                        <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField type="number" value={cantidadMNP} variant="outlined" onChange={(event) => {setCantidadAprobadasMNP(event.target.value), setCantidadMNP(event.target.value)}} sx={{ width: '100%' }} />
                        </Box>
                    </Box>
                </Box>
            )}

        </Box>
    );
};

//TarjetaCondicion.propTypes = {
//    condicion: PropTypes.string.isRequired,
//    listaCarreras: PropTypes.array.isRequired,
//    listaMaterias: PropTypes.array.isRequired,  
//    onCheckboxChange: PropTypes.func.isRequired,
//    deshabilitarCampoNumerico: PropTypes.bool.isRequired,
//};

export default TarjetaCondicion;
