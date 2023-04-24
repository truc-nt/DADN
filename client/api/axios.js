import axios from 'axios';
const BASE_URL = 'http://10.0.2.2:3000';
//const BASE_URL = 'http://192.168.1.98:3000'

export default axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});