import axios from 'axios';
import { type CreateIncidentInput } from '@/shared/schemas/incident.schema';
import type { Incident } from '@/shared/types/incident';
import type { IncidentFilters } from '@/shared/lib/queryKeys';

const API_URL = `${import.meta.env.VITE_API_URL}/incidents`;

export const getIncidents = async (
  filters?: IncidentFilters,
): Promise<Incident[]> => {
  const params: Record<string, string> = {};
  if (filters?.status) params.status = filters.status;
  if (filters?.type) params.type = filters.type;

  const { data } = await axios.get<Incident[]>(API_URL, { params });
  return data;
};

export const getIncidentsById = async (incidentId: string): Promise<Incident> => {
  const { data } = await axios.get<Incident>(`${API_URL}/${incidentId}`);
  return data;
};

export const createIncidents = async (payload: CreateIncidentInput) => {
  const { data } = await axios.post<Incident>(API_URL, payload);
  return data;
};
