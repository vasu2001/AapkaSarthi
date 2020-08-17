import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://qa-api.aapkasarthi.com/v1/',
});

export default () => axiosInstance;
