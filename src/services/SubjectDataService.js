// materias


import axios from 'axios';

const baseURL = 'https://cidia-retencion-backend.onrender.com:3001/api'


export const getAllSubjectData = async () => {
    try {
        const response = await axios.get(`${baseURL}/materias/`);
        return response;
    } catch (error) {
        return error;
    }
}

export const getAllSubjectsGuarani = async () => {
    try {
        const response = await axios.get(`${baseURL}/materias/siu`);
        return response;
    } catch (error) {
        return error;
    }
}

export const getSubjectsByCareer = async (id_carrera) => {
    try {
        const response = await axios.get(`${baseURL}/materias/${id_carrera}`);
        console.log(`${baseURL}/materias/${id_carrera}`)
        return response;
    } catch (error) {
        return error;
    }
}

export const getSubjectsByCareerAndPlan = async (id_carrera,id_plan) => {
    try {
        const response = await axios.get(`${baseURL}/materias/${id_carrera}/idCareer/${id_plan}/plan`);
        return response;
    } catch (error) {
        return error;
    }
}
export const getSubjectsNotRegisteredByCareer = async (id_carrera) => {
    try {
        const response = await axios.get(`${baseURL}/materias/${id_carrera}/sin_registrar`);
        return response;
    } catch (error) {
        return error;
    }
}

export const createSubject = async(data) => {
    try {
        const response = await axios.post(`${baseURL}/materias`, data);
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
