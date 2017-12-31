import axios from 'axios';

export const BASE_URL = process.env.API_BASE_URL;

export default function createAPI() {
    return axios.create({
        baseURL: BASE_URL,
    });
}