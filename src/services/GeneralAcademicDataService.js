import axios from 'axios';

const baseURL = 'http://localhost:3001/api'


//obtener los datos generales
export const getGeneralAcademicData = async () => {
    try {
        const response = await axios.get(`${baseURL}/generalAcademicData`);
        return response;
    } catch (error) {
        return error;
    }
}

//actualizar los datos generales
export const updateGeneralAcademicData = async (newData) => {
    try {
        const response = await axios.put(`${baseURL}/generalAcademicData`, newData);
        return response;
    } catch (error) {
        return error;
    }
}



