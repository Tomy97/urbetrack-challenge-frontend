import { createFileRoute } from "@tanstack/react-router";
import { DashboardView } from "@/features/dashboard/views";

export const Route = createFileRoute("/")({
  component: DashboardView,
});
