import axios from 'axios';

const API_URI = 'http://localhost:8080';

export const authetication = async(data)=>{
    try{
        const response = await axios.post(`${API_URI}/login`, data,{ withCredentials: true });
        return response;
    }catch(error){
        return { status: 500, message: 'Network error' };
    }
}