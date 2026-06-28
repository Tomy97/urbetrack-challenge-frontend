import { isAllZones } from '@/shared/constants/filters';

export function filterByZone<T extends { zoneId: string }>(
  items: T[],
  zoneId: string,
): T[] {
  if (isAllZones(zoneId)) return items;
  return items.filter((item) => item.zoneId === zoneId);
}
