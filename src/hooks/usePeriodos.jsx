import { useState, useEffect } from 'react';
import { getPeriodos } from '@services/PeriodosService';


function usePeriodos([]) {

    //Retorna una lista de las periodos de SIU Guarani que sean un cuatrimestre, ordenados alfabeticamente con este formato:
    // => [ { value:1 , nombre:"PRIMER CUATRIMESTRE 2024" }, {...}, ... ]

    const [value, setValue] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const periodos = await getPeriodos()
                const periodosFiltrados = periodos.data.filter(p => p.esCuatrimestre)
                const periodosFormato = periodosFiltrados.map(
                    p => ({
                        label: p.nombre,
                        value: p.periodoId
                    })
                )
                setValue(periodosFormato.reverse())
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

export default usePeriodos;