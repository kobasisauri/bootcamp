import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const getTeams = () => axios.get(apiUrl + 'teams');
export const getPositions = () => axios.get(apiUrl + 'positions');
export const getLaptopBrands = () => axios.get(apiUrl + 'brands');
export const getCpu = () => axios.get(apiUrl + 'cpus');
