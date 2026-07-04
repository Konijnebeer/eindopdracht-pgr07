import { Route } from "@/features/routes/type";
import { type Locale, useTranslation } from "@/lib/i18n";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

const API_BASE =
  "https://raw.githubusercontent.com/Konijnebeer/eindopdracht-pgr07/refs/heads/main/api";

// --- Get all ---

async function getRoutes(locale: Locale) {
  const response = await fetch(`${API_BASE}/${locale}/locations.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch routes");
  }
  const data = await response.json();
  return data.routes as Route[];
}

export const getRoutesQueryOptions = (locale: Locale) =>
  queryOptions({
    queryKey: ["routes", locale] as const,
    queryFn: () => getRoutes(locale),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export function useGetRoutes() {
  const { locale } = useTranslation();
  return useSuspenseQuery(getRoutesQueryOptions(locale));
}

// GPX tracks are just coordinates, so they are shared across languages.
async function getRouteById(id: number) {
  const response = await fetch(`${API_BASE}/route/${id}.gpx`);

  if (!response.ok) {
    return null;
    // throw new Error("Failed to fetch route");
  }
  const data = await response.text();
  return data;
}

export const getRouteByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["route", id] as const,
    queryFn: () => getRouteById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export function useGetRouteById(id: number) {
  return useSuspenseQuery(getRouteByIdQueryOptions(id));
}
