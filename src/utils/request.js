import axios from "axios";
import { message } from 'ant-design-vue';

const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
});

request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
}, err => {
    message.error(err.message || '服务端异常');
    return Promise.reject(err);
});

request.interceptors.response.use(response => {
    return response;
}, err => {
    message.error(err.message || '服务端异常');
    return Promise.reject(err);
});

export default request;
