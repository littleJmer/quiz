import axios from 'axios';

const baseURL = 'http://127.0.0.1:1337/api/';

const api = () => {
    return axios.create({
        baseURL: baseURL,
        timeout: 5000
    });
}

export default api;