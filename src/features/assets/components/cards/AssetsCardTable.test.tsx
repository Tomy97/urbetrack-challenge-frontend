import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AssetsCardTable } from "@/features/assets/components/cards/AssetsCardTable";
import { makeAsset } from "@/test/factories";

vi.mock("@/shared/hooks/useZoneLookup", () => ({
  useZoneLookup: () => ({
    zones: [],
    zoneMap: new Map(),
    getZoneName: (zoneId: string) => (zoneId === "z1" ? "Centro" : "Norte"),
  }),
}));

describe("AssetsCardTable", () => {
  it("muestra el estado vacío cuando no hay items", () => {
    render(<AssetsCardTable items={[]} />);
    expect(
      screen.getByText("Sin resultados para los filtros aplicados."),
    ).toBeInTheDocument();
  });

  it("renderiza una fila por asset con sus labels traducidos", () => {
    render(
      <AssetsCardTable
        items={[
          makeAsset({ id: "1", type: "BIN", status: "OK", zoneId: "z1" }),
          makeAsset({
            id: "2",
            type: "CONTAINER",
            status: "DAMAGED",
            zoneId: "z2",
          }),
        ]}
      />,
    );
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("#2")).toBeInTheDocument();
    expect(screen.getByText("Tacho")).toBeInTheDocument();
    expect(screen.getByText("Contenedor")).toBeInTheDocument();
    expect(screen.getByText("Dañado")).toBeInTheDocument();
  });

  it("resuelve el nombre de zona vía getZoneName", () => {
    render(
      <AssetsCardTable items={[makeAsset({ id: "1", zoneId: "z1" })]} />,
    );
    expect(screen.getByText("Centro")).toBeInTheDocument();
  });
});
