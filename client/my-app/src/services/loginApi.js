import axios from 'axios';

const API_URI = 'http://localhost:8080';

export const authetication = async(data)=>{
    try{
        const response = await axios.post(`${API_URI}/login`, data);
        return response;
    }catch(error){
        console.log('Error while calling the API ', error.message);
    }
}