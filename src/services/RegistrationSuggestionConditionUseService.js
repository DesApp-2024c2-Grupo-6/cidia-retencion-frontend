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
