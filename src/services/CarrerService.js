import axios from 'axios';
//Tiene que estar en una carpeta Public sino no funciona. Luego esto sera un EndPoint
const DATA_JS = '../public/carrerData.json'
const baseURL = 'http://localhost:3001/api'
export const getCurrentConfigCarrer = async(careerId)  => {
    try {
        const response = await axios.get(DATA_JS);
        if(response.status === 200){
            const carreras = response.data;
            const carrera = carreras.filter( carrera => carrera.careerId === careerId)[0]
            return carrera;
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}

//Actualizar una carrera

export const updateOneCarrer = async(data) => {
    try{
        const response = await axios.put(`${baseURL}/carreras`,data);
        return response;
    }
    catch(error){
        return error;
    }
}