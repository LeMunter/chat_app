import axios, { AxiosInstance } from 'axios';
import config from '../../config';

const { BASE_URL } = config;

export const instance = (): AxiosInstance => {
    const token = window.localStorage.getItem('token');

    const options = {
        baseURL: `${BASE_URL}api`,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };

    return axios.create(options);
};
