import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IncidentKanban } from "@/features/incidents/components/IncidentKanban";
import { FILTER_ALL } from "@/shared/constants/filters";
import { makeIncident } from "@/test/factories";

const incidents = [
  makeIncident({ id: "1", status: "REPORTED", description: "Reportado A" }),
  makeIncident({ id: "2", status: "IN_PROGRESS", description: "En curso B" }),
  makeIncident({ id: "3", status: "RESOLVED", description: "Resuelto C" }),
  makeIncident({ id: "4", status: "REPORTED", description: "Reportado D" }),
];

const getZoneName = () => "Centro";

describe("IncidentKanban", () => {
  it("renderiza las tres columnas de estado", () => {
    render(
      <IncidentKanban
        incidents={incidents}
        zoneId={FILTER_ALL}
        getZoneName={getZoneName}
        onSelect={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "Reportado" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "En progreso" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Resuelto" }),
    ).toBeInTheDocument();
  });

  it("ubica cada incidente en su columna y los renderiza todos", () => {
    render(
      <IncidentKanban
        incidents={incidents}
        zoneId={FILTER_ALL}
        getZoneName={getZoneName}
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByText("Reportado A")).toBeInTheDocument();
    expect(screen.getByText("Reportado D")).toBeInTheDocument();
    expect(screen.getByText("En curso B")).toBeInTheDocument();
    expect(screen.getByText("Resuelto C")).toBeInTheDocument();
  });

  it("invoca onSelect al hacer click en una tarjeta", async () => {
    const onSelect = vi.fn();
    render(
      <IncidentKanban
        incidents={incidents}
        zoneId={FILTER_ALL}
        getZoneName={getZoneName}
        onSelect={onSelect}
      />,
    );
    await userEvent.click(screen.getByText("En curso B"));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "2" }),
    );
  });
});
