import { describe, it, expect } from "vitest";
import { createIncidentSchema } from "@/shared/schemas/incident.schema";

const validInput = {
  type: "OVERFLOW" as const,
  description: "Contenedor desbordado en la esquina",
  zoneId: "z1",
  lat: -34.6,
  lng: -58.4,
};

describe("createIncidentSchema", () => {
  it("acepta un payload válido", () => {
    const result = createIncidentSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rechaza una descripción vacía", () => {
    const result = createIncidentSchema.safeParse({
      ...validInput,
      description: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "La descripción es obligatoria.",
      );
    }
  });

  it("rechaza una descripción demasiado corta", () => {
    const result = createIncidentSchema.safeParse({
      ...validInput,
      description: "abc",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Mínimo 6 caracteres.");
    }
  });

  it("rechaza una zona vacía", () => {
    const result = createIncidentSchema.safeParse({
      ...validInput,
      zoneId: "",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza un tipo de incidente inválido", () => {
    const result = createIncidentSchema.safeParse({
      ...validInput,
      type: "UNKNOWN",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza una latitud fuera de rango", () => {
    const result = createIncidentSchema.safeParse({
      ...validInput,
      lat: 200,
    });
    expect(result.success).toBe(false);
  });

  it("rechaza una longitud fuera de rango", () => {
    const result = createIncidentSchema.safeParse({
      ...validInput,
      lng: -500,
    });
    expect(result.success).toBe(false);
  });
});
