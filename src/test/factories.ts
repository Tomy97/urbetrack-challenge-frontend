import type { Incident } from "@/shared/types/incident";
import type { UrbanAsset } from "@/shared/types/asset";
import type { Vehicle } from "@/shared/types/vehicle";
import type { Zone } from "@/shared/types/zone";

export function makeZone(overrides: Partial<Zone> = {}): Zone {
  return {
    id: "z1",
    name: "Centro",
    ...overrides,
  };
}

export function makeIncident(overrides: Partial<Incident> = {}): Incident {
  return {
    id: "1",
    type: "OVERFLOW",
    status: "REPORTED",
    description: "Contenedor desbordado",
    lat: -34.6,
    lng: -58.4,
    zoneId: "z1",
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

export function makeAsset(overrides: Partial<UrbanAsset> = {}): UrbanAsset {
  return {
    id: "1",
    type: "BIN",
    status: "OK",
    lat: -34.6,
    lng: -58.4,
    address: "Av. Siempreviva 742",
    zoneId: "z1",
    ...overrides,
  };
}

export function makeVehicle(overrides: Partial<Vehicle> = {}): Vehicle {
  return {
    id: "1",
    plate: "AB123CD",
    type: "TRUCK",
    status: "ACTIVE",
    capacity: 5000,
    zoneId: "z1",
    ...overrides,
  };
}
