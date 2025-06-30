import axios from "axios";

const baseURL = "http://localhost:3001/api";

export const getCohorteCarrera = async (idCarrera, idPeriodo) => {
  try {
    const response = await axios.get(`${baseURL}/cohortes/carrera/${idCarrera}/periodo/${idPeriodo}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getCohorteMateria= async (idCarrera, idPeriodo, idMateria) => {
    try {
      const response = await axios.get(`${baseURL}/cohortes/carrera/${idCarrera}/periodo/${idPeriodo}/materia/${idMateria}`);
      return response;
    } catch (error) {
      return error;
    }
  };