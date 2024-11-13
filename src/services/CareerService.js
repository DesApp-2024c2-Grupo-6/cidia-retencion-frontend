
import axios from 'axios';

const baseURL = 'http://localhost:3001/api'
const guaraniURL = 'http://localhost:4000'


/**
 * Obtener la configuracion de una carrera
 * @param {*} careerId es el ID de carrera
 * @returns una lista que puede contener o no el dato.
 */
export const getCurrentConfigCareer = async (careerId) => {
    try {
        const response = await axios.get(`${baseURL}/carreras/${careerId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const getCarreraConPlan = async (careerId,planId) => {
    try {
        const response = await axios.get(`${baseURL}/carreras/${careerId}/plan/${planId}`);
        return response;
    } catch (error) {
        return error;
    }
}

//Actualizar una carrera
export const updateOneCareer = async (data) => {
    try {
        const response = await axios.put(`${baseURL}/carreras/:id?careerId=`, data);
        return response;
    }
    catch (error) {
        return error;
    }
}

//obtener todas las carreras
export const getAllCareer = async () => {
    try {
        const response = await axios.get(`${baseURL}/carreras`);
        return response;
    } catch (error) {
        return error;
    }
}

//obtener todas las carreras de la api de guarani
export const getAllCareerGuarani = async () => {
    try {
        //const response = await axios.get(`${guaraniURL}/carreras`);
        const response = await axios.get(`${baseURL}/carreras/siu`);
        return response;
    } catch (error) {
        return error;
    }
}
//obtener todas las carreras de la api de guarani con planes
export const getAllCareerGuaraniConPlanes = async () => {
    try {
        const response = await axios.get(`${baseURL}/carreras/siu/conPlanes`);
        return response;
    } catch (error) {
        return error;
    }
}

//Guardar los datos de una carrera nueva
export const saveCareer = async (careerData) => {
    try {
        const response = await axios.post(`${baseURL}/carreras`, careerData);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}