export type IncidentStatus = 'REPORTED' | 'IN_PROGRESS' | 'RESOLVED';
export type IncidentType = 'OVERFLOW' | 'DAMAGE' | 'LITTERING' | 'OTHER';

export interface Incident {
  id: string;
  type: IncidentType;
  status: IncidentStatus;
  description: string;
  lat: number;
  lng: number;
  zoneId: string;
  createdAt: string;
}
