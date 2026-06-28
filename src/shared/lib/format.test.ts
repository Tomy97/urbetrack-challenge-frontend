import { describe, it, expect, afterEach, vi } from "vitest";
import {
  formatNumber,
  formatDateTime,
  formatRelativeTime,
  formatCapacity,
} from "@/shared/lib/format";

describe("formatNumber", () => {
  it("formatea miles con separador es-AR", () => {
    expect(formatNumber(1234567)).toBe("1.234.567");
  });

  it("deja los números chicos sin separador", () => {
    expect(formatNumber(42)).toBe("42");
  });
});

describe("formatCapacity", () => {
  it("agrega el sufijo kg con el número formateado", () => {
    expect(formatCapacity(5000)).toBe("5.000 kg");
  });
});

describe("formatDateTime", () => {
  it("devuelve fecha y hora en formato dd/mm/yyyy hh:mm", () => {
    const result = formatDateTime("2026-06-28T15:30:00.000Z");
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4},?\s+\d{2}:\d{2}$/);
  });
});

describe("formatRelativeTime", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("devuelve 'hoy' cuando es el mismo día", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-28T12:00:00.000Z"));
    expect(formatRelativeTime("2026-06-28T08:00:00.000Z")).toBe("hoy");
  });

  it("devuelve 'hace 1 d' para un día de diferencia", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-28T12:00:00.000Z"));
    expect(formatRelativeTime("2026-06-27T10:00:00.000Z")).toBe("hace 1 d");
  });

  it("devuelve 'hace N d' para varios días", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-28T12:00:00.000Z"));
    expect(formatRelativeTime("2026-06-23T12:00:00.000Z")).toBe("hace 5 d");
  });
});
