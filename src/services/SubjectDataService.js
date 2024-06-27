// materias


import axios from 'axios';

const baseURL = 'http://localhost:3001/api'


export const getAllSubjectData = async () => {
    try {
        const response = await axios.get(`${baseURL}/materias/`);
        return response;
    } catch (error) {
        return error;
    }
}

