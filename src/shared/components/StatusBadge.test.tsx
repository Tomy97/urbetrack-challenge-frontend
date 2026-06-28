import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  StatusBadge,
  getIncidentMarkerColor,
  getAssetMarkerColor,
} from "@/shared/components/StatusBadge";

describe("StatusBadge", () => {
  it("renderiza el label provisto", () => {
    render(<StatusBadge kind="incident" status="REPORTED" label="Reportado" />);
    expect(screen.getByText("Reportado")).toBeInTheDocument();
  });

  it("aplica estilos de incidente reportado (destructive)", () => {
    render(<StatusBadge kind="incident" status="REPORTED" label="Reportado" />);
    expect(screen.getByText("Reportado").className).toContain("destructive");
  });

  it("aplica estilos de asset OK (success)", () => {
    render(<StatusBadge kind="asset" status="OK" label="OK" />);
    expect(screen.getByText("OK").className).toContain("success");
  });

  it("aplica estilos de vehículo en mantenimiento (warning)", () => {
    render(
      <StatusBadge kind="vehicle" status="MAINTENANCE" label="Mantenimiento" />,
    );
    expect(screen.getByText("Mantenimiento").className).toContain("warning");
  });

  it("agrega className adicional", () => {
    render(
      <StatusBadge
        kind="asset"
        status="OK"
        label="OK"
        className="custom-x"
      />,
    );
    expect(screen.getByText("OK").className).toContain("custom-x");
  });
});

describe("getIncidentMarkerColor", () => {
  it("devuelve rojo para REPORTED", () => {
    expect(getIncidentMarkerColor("REPORTED")).toBe("#ef4444");
  });

  it("devuelve naranja para IN_PROGRESS", () => {
    expect(getIncidentMarkerColor("IN_PROGRESS")).toBe("#f97316");
  });

  it("devuelve verde para RESOLVED", () => {
    expect(getIncidentMarkerColor("RESOLVED")).toBe("#22c55e");
  });
});

describe("getAssetMarkerColor", () => {
  it("devuelve rojo para OUT_OF_SERVICE", () => {
    expect(getAssetMarkerColor("OUT_OF_SERVICE")).toBe("#ef4444");
  });

  it("devuelve naranja para DAMAGED", () => {
    expect(getAssetMarkerColor("DAMAGED")).toBe("#f97316");
  });

  it("devuelve amarillo para FULL", () => {
    expect(getAssetMarkerColor("FULL")).toBe("#eab308");
  });

  it("devuelve verde para OK", () => {
    expect(getAssetMarkerColor("OK")).toBe("#22c55e");
  });
});
