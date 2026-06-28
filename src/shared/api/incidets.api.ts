import axios from 'axios';
import { type CreateIncidentInput } from '@/shared/schemas/incident.schema';

const API_URL = `${import.meta.env.VITE_API_URL}/incidents`;

export const getIncidents = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};
export const getIncidentsById = async (incidentId: string) => {
  const { data } = await axios.get(`${API_URL}/${incidentId}`);
  return data;
};
export const createIncidents = async (payload: CreateIncidentInput) => {
  const { data } = await axios.post(API_URL, payload);
  return data;
};
