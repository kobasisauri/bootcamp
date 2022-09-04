import axios from 'axios';
import config from 'config';

const apiUrl = process.env.REACT_APP_API_URL;

export const createLaptop = (model) =>
  axios.post(apiUrl + 'laptop/create', model, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getLaptops = () =>
  axios.get(apiUrl + 'laptops', { params: { token: config.token } });

export const getLaptop = (id) =>
  axios.get(`${apiUrl}laptop/${id}`, { params: { token: config.token } });
