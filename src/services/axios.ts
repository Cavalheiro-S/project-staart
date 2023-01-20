import axios from "axios";

export const api = axios.create({
    baseURL: 'https://frontend-project.staart.com/',
});