import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { KpiCard } from "@/features/dashboard/components/KpiCard";

describe("KpiCard", () => {
  it("renderiza el título y el valor", () => {
    render(
      <KpiCard title="Incidentes activos" value={12} icon={<span>icon</span>} />,
    );
    expect(screen.getByText("Incidentes activos")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("renderiza valores de tipo string", () => {
    render(<KpiCard title="Zona" value="Centro" icon={<span>i</span>} />);
    expect(screen.getByText("Centro")).toBeInTheDocument();
  });

  it("renderiza el icono pasado por props", () => {
    render(
      <KpiCard title="Test" value={1} icon={<span data-testid="kpi-icon" />} />,
    );
    expect(screen.getByTestId("kpi-icon")).toBeInTheDocument();
  });
});
