import axios from "axios";

const baseURL = "https://cidia-retencion-backend.onrender.com/api";

/**
 * Entrada: Ninguna
 * Salida: Array con periodos lectivos
 */
export const getPeriodos = async () => {
  try {
    const response = await axios.get(`${baseURL}/periodosLectivos`);
    return response;
  } catch (error) {
    return error;
  }
};
