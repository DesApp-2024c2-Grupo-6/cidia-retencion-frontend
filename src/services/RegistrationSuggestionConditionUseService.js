// listado condiciones carrera



import axios from 'axios';

const baseURL = 'http://localhost:3001/api'


export const getAllSuggestionConditionUse = async () => {
    try {
        const response = await axios.get(`${baseURL}/registrationsuggestionconditionuse/`);
        return response;
    } catch (error) {
        return error;
    }
}

export const createConditionUse = async (data) => {
    try {
        const response = await axios.post(`${baseURL}/registrationsuggestionconditionuse/`, data);
        return response;
    }
    catch (error) {
        return error;
    }
}

export const deleteConditionUse = async (filtro) => {
    try {
        const response = await axios.delete(`${baseURL}/registrationsuggestionconditionuse/`, { data: filtro });
        return response;
    }
    catch (error) {
        return error;
    }
}
