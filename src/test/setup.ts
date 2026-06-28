import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

const win = window as Window & typeof globalThis

if (typeof window !== "undefined" && !window.matchMedia) {
  win.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

if (typeof window !== "undefined") {
  Element.prototype.scrollIntoView =
    Element.prototype.scrollIntoView ?? (() => {});

  if (!("ResizeObserver" in window)) {
    win.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  }

  if (!("PointerEvent" in window)) {
    class PointerEventStub extends MouseEvent {}
    win.PointerEvent = PointerEventStub as unknown as typeof PointerEvent;
  }

  Element.prototype.hasPointerCapture =
    Element.prototype.hasPointerCapture ?? (() => false);
  Element.prototype.setPointerCapture =
    Element.prototype.setPointerCapture ?? (() => {});
  Element.prototype.releasePointerCapture =
    Element.prototype.releasePointerCapture ?? (() => {});
}
