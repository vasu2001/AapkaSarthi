import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.aapkasarthi.com/v1/',
});

export default () => axiosInstance;
