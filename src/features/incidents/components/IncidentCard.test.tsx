import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IncidentCard } from "@/features/incidents/components/IncidentCard";

const baseProps = {
  id: "42",
  type: "OVERFLOW" as const,
  status: "REPORTED" as const,
  description: "Contenedor desbordado frente a la plaza",
  zoneName: "Centro",
  createdAt: new Date().toISOString(),
};

describe("IncidentCard", () => {
  it("renderiza id, descripción, zona y label de tipo/estado", () => {
    render(<IncidentCard {...baseProps} />);
    expect(screen.getByText("#42")).toBeInTheDocument();
    expect(
      screen.getByText("Contenedor desbordado frente a la plaza"),
    ).toBeInTheDocument();
    expect(screen.getByText("Centro")).toBeInTheDocument();
    expect(screen.getByText("DESBORDE")).toBeInTheDocument();
    expect(screen.getByText("Reportado")).toBeInTheDocument();
  });

  it("invoca onSelect al hacer click", async () => {
    const onSelect = vi.fn();
    render(<IncidentCard {...baseProps} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("aplica el anillo de selección cuando selected es true", () => {
    render(<IncidentCard {...baseProps} selected />);
    expect(screen.getByRole("button").className).toContain("ring-2");
  });
});
