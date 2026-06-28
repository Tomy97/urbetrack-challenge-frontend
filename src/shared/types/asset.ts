export type AssetStatus = 'OK' | 'DAMAGED' | 'FULL' | 'OUT_OF_SERVICE';
export type AssetType = 'BIN' | 'CONTAINER' | 'BENCH';

export interface UrbanAsset {
  id: string;
  type: AssetType;
  status: AssetStatus;
  lat: number;
  lng: number;
  address: string;
  zoneId: string;
}
