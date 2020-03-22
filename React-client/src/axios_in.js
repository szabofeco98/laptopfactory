import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:9090',
    headers:{
     
    }
});

export default instance;