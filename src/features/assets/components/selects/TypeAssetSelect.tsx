// TypeAssetSelect.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { ASSET_TYPE } from '@/shared/constants/domain';
import { FILTER_ALL } from '@/shared/constants/filters';
import type { AssetType } from '@/shared/types/asset';
import type { SelectType } from '@/shared/types/select';

type AssetTypeFilter = AssetType | typeof FILTER_ALL;

interface TypeAssetSelectProps {
  value: AssetTypeFilter;
  onChange: (value: AssetTypeFilter) => void;
}

const TYPE_OPTIONS: SelectType[] = [
  { value: FILTER_ALL, label: 'Todos los tipos' },
  { value: ASSET_TYPE.CONTAINER, label: 'Contenedor' },
  { value: ASSET_TYPE.BIN, label: 'Tacho' },
  { value: ASSET_TYPE.BENCH, label: 'Banco' },
];

export const TypeAssetSelect = ({ value, onChange }: TypeAssetSelectProps) => (
  <Select value={value} onValueChange={(v) => onChange(v as AssetTypeFilter)}>
    <SelectTrigger className="bg-card h-9 w-[180px]">
      <SelectValue placeholder="Todos los tipos" />
    </SelectTrigger>
    <SelectContent>
      {TYPE_OPTIONS.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
