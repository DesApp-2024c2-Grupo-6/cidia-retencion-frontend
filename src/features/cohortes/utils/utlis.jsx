
export function formatearCuatrimestre(nombrePeriodo) {
    // "Primer Cuatrimestre 2024" => "1C - 2024"
    const texto = nombrePeriodo.toUpperCase().trim();
    let numeroCuatrimestre = '';

    if (texto.startsWith('PRIMER CUATRIMESTRE')) {
        numeroCuatrimestre = '1C';
    } else if (texto.startsWith('SEGUNDO CUATRIMESTRE')) {
        numeroCuatrimestre = '2C';
    } else {
        numeroCuatrimestre = '?C'
    }

    // Extraer el año (últimos 4 caracteres si están bien formateados)
    let año = texto.slice(-4);
    if (!/^\d{4}$/.test(año)) {
        año = "????"
    }

    return `${numeroCuatrimestre}${año}`;
}
