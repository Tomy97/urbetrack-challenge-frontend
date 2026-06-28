import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { useZoneFilterStore } from "@/shared/store/zone-filter.store";
import { FILTER_ALL } from "@/shared/constants/filters";
import { createWrapper } from "@/test/utils";
import { makeIncident, makeAsset, makeVehicle, makeZone } from "@/test/factories";

vi.mock("@/shared/api/incidets.api", () => ({
  getIncidents: vi.fn(),
}));
vi.mock("@/shared/api/assets.api", () => ({
  getAssets: vi.fn(),
}));
vi.mock("@/shared/api/vehicles.api", () => ({
  getVehicles: vi.fn(),
}));
vi.mock("@/shared/api/zones.api", () => ({
  getZones: vi.fn(),
}));

import { getIncidents } from "@/shared/api/incidets.api";
import { getAssets } from "@/shared/api/assets.api";
import { getVehicles } from "@/shared/api/vehicles.api";
import { getZones } from "@/shared/api/zones.api";

const zones = [makeZone({ id: "z1", name: "Centro" }), makeZone({ id: "z2", name: "Norte" })];

const incidents = [
  makeIncident({ id: "1", status: "REPORTED", zoneId: "z1" }),
  makeIncident({ id: "2", status: "IN_PROGRESS", zoneId: "z1" }),
  makeIncident({ id: "3", status: "RESOLVED", zoneId: "z2" }),
  makeIncident({ id: "4", status: "REPORTED", zoneId: "z2" }),
];

const assets = [
  makeAsset({ id: "1", status: "OK", zoneId: "z1" }),
  makeAsset({ id: "2", status: "DAMAGED", zoneId: "z1" }),
  makeAsset({ id: "3", status: "OUT_OF_SERVICE", zoneId: "z2" }),
];

const vehicles = [
  makeVehicle({ id: "1", status: "ACTIVE", zoneId: "z1" }),
  makeVehicle({ id: "2", status: "MAINTENANCE", zoneId: "z2" }),
];

beforeEach(() => {
  vi.mocked(getZones).mockResolvedValue(zones);
  vi.mocked(getIncidents).mockResolvedValue(incidents);
  vi.mocked(getAssets).mockResolvedValue(assets);
  vi.mocked(getVehicles).mockResolvedValue(vehicles);
  useZoneFilterStore.setState({ zoneId: FILTER_ALL });
});

describe("useDashboardStats", () => {
  it("calcula los totales globales con todas las zonas", async () => {
    const { result } = renderHook(() => useDashboardStats(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.stats.totalIncidents).toBe(4);
    expect(result.current.stats.totalAssets).toBe(3);
    expect(result.current.stats.totalVehicles).toBe(2);
  });

  it("cuenta incidentes por estado y activos", async () => {
    const { result } = renderHook(() => useDashboardStats(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.stats.reported).toBe(2);
    expect(result.current.stats.inProgress).toBe(1);
    expect(result.current.stats.activeIncidentsCount).toBe(3);
  });

  it("cuenta assets dañados/fuera de servicio y vehículos activos", async () => {
    const { result } = renderHook(() => useDashboardStats(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.stats.assetsDamaged).toBe(1);
    expect(result.current.stats.assetsOutOfService).toBe(1);
    expect(result.current.stats.activeVehicles).toBe(1);
  });

  it("filtra las estadísticas por la zona seleccionada", async () => {
    useZoneFilterStore.setState({ zoneId: "z1" });

    const { result } = renderHook(() => useDashboardStats(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.stats.zoneLabel).toBe("Centro");
    expect(result.current.stats.totalIncidents).toBe(2);
    expect(result.current.stats.activeIncidentsCount).toBe(2);
    expect(result.current.stats.incidentsByZone).toHaveLength(1);
    expect(result.current.stats.incidentsByZone[0]?.zoneId).toBe("z1");
  });

  it("ordena recentIncidents por fecha descendente y limita a 5", async () => {
    const many = Array.from({ length: 7 }, (_, i) =>
      makeIncident({
        id: String(i),
        zoneId: "z1",
        createdAt: new Date(2026, 0, i + 1).toISOString(),
      }),
    );
    vi.mocked(getIncidents).mockResolvedValue(many);

    const { result } = renderHook(() => useDashboardStats(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.stats.recentIncidents).toHaveLength(5);
    const dates = result.current.stats.recentIncidents.map((i) =>
      new Date(i.createdAt).getTime(),
    );
    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });
});
