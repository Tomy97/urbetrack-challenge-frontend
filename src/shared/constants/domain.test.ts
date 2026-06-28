import { describe, it, expect } from "vitest";
import {
  isActiveIncidentStatus,
  INCIDENT_STATUS,
  ACTIVE_INCIDENT_STATUSES,
  KANBAN_INCIDENT_STATUSES,
} from "@/shared/constants/domain";

describe("isActiveIncidentStatus", () => {
  it("considera REPORTED como activo", () => {
    expect(isActiveIncidentStatus(INCIDENT_STATUS.REPORTED)).toBe(true);
  });

  it("considera IN_PROGRESS como activo", () => {
    expect(isActiveIncidentStatus(INCIDENT_STATUS.IN_PROGRESS)).toBe(true);
  });

  it("no considera RESOLVED como activo", () => {
    expect(isActiveIncidentStatus(INCIDENT_STATUS.RESOLVED)).toBe(false);
  });
});

describe("constantes de dominio", () => {
  it("ACTIVE_INCIDENT_STATUSES contiene solo estados activos", () => {
    expect(ACTIVE_INCIDENT_STATUSES).toEqual([
      INCIDENT_STATUS.REPORTED,
      INCIDENT_STATUS.IN_PROGRESS,
    ]);
  });

  it("KANBAN_INCIDENT_STATUSES contiene las tres columnas", () => {
    expect(KANBAN_INCIDENT_STATUSES).toHaveLength(3);
    expect(KANBAN_INCIDENT_STATUSES).toContain(INCIDENT_STATUS.RESOLVED);
  });
});
