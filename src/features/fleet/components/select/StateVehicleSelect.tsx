import { type SetStateAction } from 'react';
import type { VehicleStatusFilter } from '../../hooks/useFleet';
import type { VehicleStatus } from '@/shared/types/vehicle';
import { FILTER_ALL } from '@/shared/constants/filters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { VEHICLE_STATUS } from '@/shared/constants/domain';
import type { SelectType } from '@/shared/types/select';

interface StateVehicleSelectProp {
  value: VehicleStatusFilter;
  setValue: (value: SetStateAction<VehicleStatusFilter>) => void;
}
export const StateVehicleSelect = ({
  value,
  setValue,
}: StateVehicleSelectProp) => {
  const vehiclesState: SelectType[] = [
    {
      value: FILTER_ALL,
      label: 'Cualquier estado',
    },
    {
      value: VEHICLE_STATUS.ACTIVE,
      label: 'Activo',
    },
    {
      value: VEHICLE_STATUS.MAINTENANCE,
      label: 'Mantenimiento',
    },
    {
      value: VEHICLE_STATUS.OUT_OF_SERVICE,
      label: 'Fuera de servicio',
    },
  ];
  return (
    <Select
      value={value}
      onValueChange={(value) =>
        setValue(value as VehicleStatus | typeof FILTER_ALL)
      }
    >
      <SelectTrigger className="bg-card h-9 w-[180px]">
        <SelectValue placeholder="Cualquier estado" />
      </SelectTrigger>
      <SelectContent>
        {vehiclesState.map((v, i) => (
          <SelectItem key={i} value={v.value}>
            {v.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
