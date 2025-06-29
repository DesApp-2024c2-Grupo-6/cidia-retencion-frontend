//MUI
import { Box, Button, Typography } from '@mui/material';

//Hooks
import { useEffect, useState } from 'react';
import usePeriodos from '@hooks/usePeriodos';
import useCarreras from '@hooks/useCarreras';

//Services
import { getCohorteCarrera } from '@services/CohortesServices';

//Components
import SelectorCohorte from './components/SelectorCohorte';
import CohorteCarrera from './components/CohorteCarrera';
import CohorteLoader from './components/CohorteLoader';
import CohorteMateria from './components/CohorteMateria';
import CohorteNotSelected from './components/CohorteNotSelected';

//Context
import { useAlert } from '@context/AlertProvider';

export default function Cohortes() {

    const periodos = usePeriodos([])

    const carreras = useCarreras([])

    const [datosBusqueda, setDatosBusqueda] = useState({ idPeriodo: "", idCarrera: "", idMateria: "" })

    const [estaBuscando, setEstaBuscando] = useState(false)

    const [cohorteData, setCohorteData] = useState(null)

    const [requestStatus, setRequestStatus] = useState({ error: null, loading: false, })

    const { showAlert } = useAlert()


    const handleOpcionChange = (updatedValue, field) => {
        // updatedValue => Nuevo valor (Un id)
        // field => Nombre del campo a modificar ("idPeriodo" o "idCarrera") 
        const newValue = { ...datosBusqueda }
        newValue[field] = updatedValue
        setDatosBusqueda(newValue)
    }

    const handleMateriaChange = (idMateria) => {
        setDatosBusqueda({ ...datosBusqueda, idMateria: idMateria })
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleBusqueda = () => setEstaBuscando(true)

    useEffect(() => {
        const buscarCohorte = async () => {
            console.log("Iniciando busqueda...")
            console.log("Cargando...")
            setCohorteData(null)
            setDatosBusqueda({ ...datosBusqueda, idMateria: "" })
            setRequestStatus({ ...requestStatus, loading: true })
            try {
                const response = await getCohorteCarrera(datosBusqueda.idCarrera, datosBusqueda.idPeriodo);
                setCohorteData(response.data)
                showAlert('Datos de la cohorte generados', 'info')
            }
            catch (err) {
                setRequestStatus({ ...requestStatus, error: err })
                showAlert('Error: No se pudieron generar los datos de la cohorte', 'info')

            } finally {
                setRequestStatus({ ...requestStatus, loading: false })
                setEstaBuscando(false)
            }
        }

        estaBuscando && buscarCohorte()

    }, [estaBuscando])

    return (
        <>
            <Box sx={{ width: '100%', maxWidth:'1000px', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: "center", padding: 2 }} gap={2}>
                <Typography sx={{ textAlign: 'center', marginBottom: '30px', marginTop: '60px', fontWeight: '500' }} variant="h5" component="h1" gutterBottom>
                    Cohortes
                </Typography>
                <SelectorCohorte
                    periodosData={periodos.value.slice(3)}
                    carrerasData={carreras.value}
                    datosBusqueda={datosBusqueda}
                    handleChange={handleOpcionChange}
                    handleSearch={handleBusqueda}
                    estaBuscando={estaBuscando}
                />
                {
                    (datosBusqueda.idMateria != "") ? <CohorteMateria requestData={datosBusqueda} handleBack={handleMateriaChange} /> :
                        (cohorteData != null) ? <CohorteCarrera cohorteData={cohorteData} handleMateriaChange={handleMateriaChange} /> :
                            (!requestStatus.loading && cohorteData == null) ? <CohorteNotSelected text="Seleccione los datos de la cohorte" /> :
                                (requestStatus.loading) ? <CohorteLoader text="Generando análisis de datos" /> :
                                    (requestStatus.error) && <CohorteNotSelected text="No se encontraron datos de la cohorte" />
                }
            </Box>
        </>
    )
}