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

export const getSubjectsByCareer = async (id_carrera) => {
    try {
        const response = await axios.get(`${baseURL}/materias/${id_carrera}?id_carrera=${id_carrera}`);
        console.log(`${baseURL}/materias/${id_carrera}?id_carrera=${id_carrera}`)
        return response;
    } catch (error) {
        return error;
    }
}

export const updateSubject = async(data) => {
    try {
        const response = await axios.put(`${baseURL}/materias/:id?id_materia=`, data);
        return response;
    } catch (error) {
        return error;
    }
}

export const deleteSubject = async(data) => {
    try {
        console.log(data)
        const response = await axios.delete(`${baseURL}/materias/:id?id_materia=`, {data});
        return response;
    } catch (error) {
        return error;
    }
}
