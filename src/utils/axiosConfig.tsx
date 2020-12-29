import axios from 'axios';

const devURL = 'http://qa-api.aapkasarthi.com/v1/';
const prodURL = 'https://api.aapkasarthi.com/v1/';

const axiosInstance = axios.create({
  baseURL: prodURL,
});

export default () => axiosInstance;
