export type VehicleStatus = 'ACTIVE' | 'MAINTENANCE' | 'OUT_OF_SERVICE'
export type VehicleType = 'TRUCK' | 'VAN' | 'PICKUP'

export interface Vehicle {
  id: string
  plate: string
  type: VehicleType
  status: VehicleStatus
  capacity: number
  zoneId: string
}
