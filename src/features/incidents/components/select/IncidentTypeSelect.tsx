import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { INCIDENT_TYPE } from '@/shared/constants/domain';
import { FILTER_ALL, isFilterAll } from '@/shared/constants/filters';
import type { IncidentSearch } from '../../schemas/incident-search.schema';
import type { SelectType } from '@/shared/types/select';

interface IncidentTypeSelectProp {
  type: IncidentSearch['type'];
  onChange: (value: IncidentSearch['type']) => void;
}

export const IncidentTypeSelect = ({
  type,
  onChange,
}: IncidentTypeSelectProp) => {
  const incidentsTypes: SelectType[] = [
    {
      value: FILTER_ALL,
      label: 'Todos los tipos',
    },
    {
      value: INCIDENT_TYPE.OVERFLOW,
      label: 'Desborde',
    },
    {
      value: INCIDENT_TYPE.DAMAGE,
      label: 'Daño',
    },
    {
      value: INCIDENT_TYPE.LITTERING,
      label: 'Basura',
    },
    {
      value: INCIDENT_TYPE.OTHER,
      label: 'Otro',
    },
  ];
  return (
    <Select
      value={type ?? FILTER_ALL}
      onValueChange={(value) =>
        onChange(
          isFilterAll(value) ? undefined : (value as IncidentSearch['type']),
        )
      }
    >
      <SelectTrigger className="bg-card h-9 w-[200px]">
        <SelectValue placeholder="Todos los tipos" />
      </SelectTrigger>
      <SelectContent>
        {incidentsTypes.map((incident, index) => (
          <SelectItem key={index} value={incident.value}>
            {incident.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
