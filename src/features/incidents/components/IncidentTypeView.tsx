import type { Incident } from '@/shared/types/incident';
import { INCIDENT_VIEW } from '@/shared/constants/filters';
import { IncidentKanban } from './IncidentKanban';
import { IncidentTable } from './IncidentTable';
interface IncidentTypeViewProp {
  typeView: typeof INCIDENT_VIEW.KANBAN | typeof INCIDENT_VIEW.TABLE;
  incidents: Incident[];
  zoneId: string;
  incidentId: string;
  getZoneName: (zoneId: string) => string;
  onSelect: (incident: Incident) => void;
}
export const IncidentTypeView = ({
  typeView,
  incidents,
  zoneId,
  incidentId,
  getZoneName,
  onSelect,
}: IncidentTypeViewProp) => {
  if (typeView === INCIDENT_VIEW.KANBAN) {
    return (
      <IncidentKanban
        incidents={incidents}
        zoneId={zoneId}
        selectedId={incidentId}
        getZoneName={getZoneName}
        onSelect={onSelect}
      />
    );
  }

  return (
    <IncidentTable
      incidents={incidents}
      zoneId={zoneId}
      selectedId={incidentId}
      getZoneName={getZoneName}
      onSelect={onSelect}
    />
  );
};
