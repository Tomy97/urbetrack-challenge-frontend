import { describe, it, expect } from "vitest";
import { filterByZone } from "@/shared/lib/filters";
import { FILTER_ALL } from "@/shared/constants/filters";

type Item = { zoneId: string; label: string };

const items: Item[] = [
  { zoneId: "z1", label: "a" },
  { zoneId: "z2", label: "b" },
  { zoneId: "z1", label: "c" },
];

describe("filterByZone", () => {
  it("devuelve todos los items cuando la zona es ALL", () => {
    expect(filterByZone(items, FILTER_ALL)).toHaveLength(3);
    expect(filterByZone(items, FILTER_ALL)).toBe(items);
  });

  it("filtra los items por la zona indicada", () => {
    const result = filterByZone(items, "z1");
    expect(result).toHaveLength(2);
    expect(result.every((item) => item.zoneId === "z1")).toBe(true);
  });

  it("devuelve un array vacío si ninguna zona coincide", () => {
    expect(filterByZone(items, "z99")).toEqual([]);
  });

  it("no muta el array original", () => {
    const copy = [...items];
    filterByZone(items, "z1");
    expect(items).toEqual(copy);
  });
});
