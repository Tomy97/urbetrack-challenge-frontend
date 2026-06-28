import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/zones`;
export const getZones = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};
