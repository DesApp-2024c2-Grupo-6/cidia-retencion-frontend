import axios from 'axios';
//Tiene que estar en una carpeta Public sino no funciona. Luego esto sera un EndPoint
const DATA_JS = '../public/carrerData.json'

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