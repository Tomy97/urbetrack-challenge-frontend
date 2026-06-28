import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IncidentTable } from "@/features/incidents/components/IncidentTable";
import { FILTER_ALL } from "@/shared/constants/filters";
import { makeIncident } from "@/test/factories";

const incidents = [
  makeIncident({ id: "1", zoneId: "z1", description: "Desborde centro" }),
  makeIncident({
    id: "2",
    zoneId: "z2",
    status: "IN_PROGRESS",
    description: "Daño norte",
  }),
];

const getZoneName = (zoneId: string) =>
  zoneId === "z1" ? "Centro" : "Norte";

describe("IncidentTable", () => {
  it("renderiza una fila por cada incidente cuando la zona es ALL", () => {
    render(
      <IncidentTable
        incidents={incidents}
        zoneId={FILTER_ALL}
        getZoneName={getZoneName}
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByText("Desborde centro")).toBeInTheDocument();
    expect(screen.getByText("Daño norte")).toBeInTheDocument();
  });

  it("filtra las filas por la zona seleccionada", () => {
    render(
      <IncidentTable
        incidents={incidents}
        zoneId="z1"
        getZoneName={getZoneName}
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByText("Desborde centro")).toBeInTheDocument();
    expect(screen.queryByText("Daño norte")).not.toBeInTheDocument();
  });

  it("invoca onSelect con el incidente al hacer click en la fila", async () => {
    const onSelect = vi.fn();
    render(
      <IncidentTable
        incidents={incidents}
        zoneId={FILTER_ALL}
        getZoneName={getZoneName}
        onSelect={onSelect}
      />,
    );
    await userEvent.click(screen.getByText("Desborde centro"));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1" }),
    );
  });

  it("resalta la fila seleccionada", () => {
    render(
      <IncidentTable
        incidents={incidents}
        zoneId={FILTER_ALL}
        selectedId="2"
        getZoneName={getZoneName}
        onSelect={vi.fn()}
      />,
    );
    const row = screen.getByText("Daño norte").closest("tr");
    expect(row?.className).toContain("bg-muted/50");
  });

  it("muestra el nombre de zona resuelto por getZoneName", () => {
    render(
      <IncidentTable
        incidents={incidents}
        zoneId={FILTER_ALL}
        getZoneName={getZoneName}
        onSelect={vi.fn()}
      />,
    );
    const row = screen.getByText("Desborde centro").closest("tr")!;
    expect(within(row).getByText("Centro")).toBeInTheDocument();
  });
});
