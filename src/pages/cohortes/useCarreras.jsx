import { useState, useEffect } from 'react';
import { getAllCareerGuaraniConPlanes } from '../../services/CareerService';


function useCarreras([]) {
    //Retorna una lista de las carreras de SIU Guarani, ordenadas alfabeticamente con este formato:
    // => [ { value:1 , nombre:"Algoritmos" }, {...}, ... ]

    const [value, setValue] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const carrerasSiu = await getAllCareerGuaraniConPlanes()
                const listaCarreras = carrerasSiu.data.map(c => ({
                    label: c.nombre,
                    value: c.id
                }))
                listaCarreras.sort((a, b) => a.label.localeCompare(b.label))
                setValue(listaCarreras)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        value,
        loading,
        error
    };
}

export default useCarreras;