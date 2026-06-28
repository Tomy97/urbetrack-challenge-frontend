import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReportIncidentDialog } from "@/shared/components/dialog/ReportIncidentDialog";
import { createWrapper } from "@/test/utils";
import { makeZone } from "@/test/factories";

vi.mock("@/shared/api/zones.api", () => ({
  getZones: vi.fn(),
}));
vi.mock("@/shared/api/incidets.api", () => ({
  createIncidents: vi.fn(),
}));
vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

import { getZones } from "@/shared/api/zones.api";
import { createIncidents } from "@/shared/api/incidets.api";
import { toast } from "sonner";

const zones = [makeZone({ id: "z1", name: "Centro" }), makeZone({ id: "z2", name: "Norte" })];

async function openDialog() {
  const user = userEvent.setup();
  render(<ReportIncidentDialog />, { wrapper: createWrapper() });
  await user.click(screen.getByRole("button", { name: /reportar incidente/i }));
  await screen.findByRole("dialog");
  return user;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(getZones).mockResolvedValue(zones);
  vi.mocked(createIncidents).mockResolvedValue({
    id: "99",
    type: "OVERFLOW",
    status: "REPORTED",
    description: "Contenedor desbordado",
    lat: -34.5755,
    lng: -58.4338,
    zoneId: "z1",
    createdAt: new Date().toISOString(),
  });
});

describe("ReportIncidentDialog", () => {
  it("abre el modal con el formulario al hacer click en el trigger", async () => {
    await openDialog();
    expect(
      screen.getByRole("heading", { name: /reportar incidente/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Crear incidente")).toBeInTheDocument();
  });

  it("muestra errores de validación al enviar campos requeridos vacíos", async () => {
    const user = await openDialog();
    await user.click(screen.getByRole("button", { name: /crear incidente/i }));

    expect(
      await screen.findByText("La descripción es obligatoria."),
    ).toBeInTheDocument();
    expect(screen.getByText("Seleccioná una zona.")).toBeInTheDocument();
    expect(createIncidents).not.toHaveBeenCalled();
  });

  it("envía el incidente y cierra el modal cuando los datos son válidos", async () => {
    const user = await openDialog();

    await user.type(
      screen.getByPlaceholderText(/contenedor desbordado/i),
      "Contenedor desbordado frente a la escuela",
    );

    const comboboxes = screen.getAllByRole("combobox");
    await user.click(comboboxes[comboboxes.length - 1]);
    const listbox = await screen.findByRole("listbox");
    await user.click(within(listbox).getByText("Centro"));

    await user.click(screen.getByRole("button", { name: /crear incidente/i }));

    await waitFor(() => expect(createIncidents).toHaveBeenCalledTimes(1));
    expect(vi.mocked(createIncidents).mock.calls[0][0]).toMatchObject({
      type: "OVERFLOW",
      zoneId: "z1",
      description: "Contenedor desbordado frente a la escuela",
    });

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith(
        "Incidente reportado correctamente",
      ),
    );

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
