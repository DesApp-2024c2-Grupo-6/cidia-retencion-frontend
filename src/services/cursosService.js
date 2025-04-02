import axios from "axios";

const baseURL = "http://localhost:3001/api";

/**
 * @param {*} id Id de curso
 * @returns Informacion de curso u objeto vacio si id invalido
 */
export const getCurso = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/cursos/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * @param {*} id Id de curso
 * @returns Asistencias de curso o array vacio si Id invalido
 */
export const getAsistenciasDeCurso = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/cursos/${id}/asistenciaPorClase`
    );
    return response;
  } catch (error) {
    return error;
  }
};
