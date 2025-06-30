import axios from "axios";

const baseURL = "http://localhost:3001/api";

/**
 * Entrada: Id de carrera
 * Salida: Array con Id de alumnos de esa carrera o array vacio si el id es invalido
 */
export const getAlumnosDeCarrera = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/alumnos/carrera/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * Entrada: Array de Ids de alumno
 * Salida: Array de datos de alumnos con esos Ids
 */
export const getDatosDeAlumnos = async (alumnos) => {
  try {
    const response = await axios.post(
      `${baseURL}/alumnos/statusAcademico/masivo`,
      alumnos
    );
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * Entrada: Id de cuatrimestre
 * Salida: Array de alumnos
 */
export const getAlumnosPorCuatrimestre = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/alumnos/cuatrimestre/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
