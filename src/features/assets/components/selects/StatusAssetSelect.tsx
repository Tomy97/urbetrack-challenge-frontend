import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { ASSET_STATUS } from '@/shared/constants/domain';
import { FILTER_ALL } from '@/shared/constants/filters';
import type { AssetStatus } from '@/shared/types/asset';
import type { SelectType } from '@/shared/types/select';

type AssetStatusFilter = AssetStatus | typeof FILTER_ALL;

interface StatusAssetSelectProps {
  value: AssetStatusFilter;
  onChange: (value: AssetStatusFilter) => void;
}

const STATUS_OPTIONS: SelectType[] = [
  { value: FILTER_ALL, label: 'Todos los estados' },
  { value: ASSET_STATUS.OK, label: 'OK' },
  { value: ASSET_STATUS.FULL, label: 'Lleno' },
  { value: ASSET_STATUS.DAMAGED, label: 'Dañado' },
  { value: ASSET_STATUS.OUT_OF_SERVICE, label: 'Fuera de servicio' },
];

export const StatusAssetSelect = ({
  value,
  onChange,
}: StatusAssetSelectProps) => (
  <Select value={value} onValueChange={(v) => onChange(v as AssetStatusFilter)}>
    <SelectTrigger className="bg-card h-9 w-[180px]">
      <SelectValue placeholder="Todos los estados" />
    </SelectTrigger>
    <SelectContent>
      {STATUS_OPTIONS.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
