import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { VEHICLE_TYPE } from '@/shared/constants/domain';
import { FILTER_ALL } from '@/shared/constants/filters';
import type { VehicleType } from '@/shared/types/vehicle';
import type { SetStateAction } from 'react';
import type { VehicleTypeFilter } from '../../hooks/useFleet';
import type { SelectType } from '@/shared/types/select';

interface TypeVehicleSelectProp {
  value: VehicleTypeFilter;
  setValue: (value: SetStateAction<VehicleTypeFilter>) => void;
}

const VEHICLES_TYPE: SelectType[] = [
  {
    value: FILTER_ALL,
    label: 'Todos los tipos',
  },
  {
    value: VEHICLE_TYPE.TRUCK,
    label: 'Camión',
  },
  {
    value: VEHICLE_TYPE.VAN,
    label: 'Van',
  },
  {
    value: VEHICLE_TYPE.PICKUP,
    label: 'Pickup',
  },
];
export const TypeVehicleSelect = ({
  value,
  setValue,
}: TypeVehicleSelectProp) => {
  return (
    <Select
      value={value}
      onValueChange={(value) =>
        setValue(value as VehicleType | typeof FILTER_ALL)
      }
    >
      <SelectTrigger className="bg-card h-9 w-[180px]">
        <SelectValue placeholder="Todos los tipos" />
      </SelectTrigger>
      <SelectContent>
        {VEHICLES_TYPE.map((vehicle, index) => (
          <SelectItem key={index} value={vehicle.value}>
            {vehicle.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
