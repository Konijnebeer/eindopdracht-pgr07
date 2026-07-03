import { Route } from "@/features/routes/type";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

// --- Get all ---

async function getRoutes() {
  const response = await fetch(
    "https://raw.githubusercontent.com/Konijnebeer/eindopdracht-pgr07/refs/heads/main/api/locations.json",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch routes");
  }
  const data = await response.json();
  return data.routes as Route[];
}

export const getRoutesQueryOptions = queryOptions({
  queryKey: ["routes"] as const,
  queryFn: getRoutes,
  staleTime: 1000 * 60 * 5, // 5 minutes
});

export function useGetRoutes() {
  return useSuspenseQuery(getRoutesQueryOptions);
}

async function getRouteById(id: number) {
  const response = await fetch(
    `https://raw.githubusercontent.com/Konijnebeer/eindopdracht-pgr07/refs/heads/main/api/route/${id}.gpx`,
  );

  if (!response.ok) {
    return null
    // throw new Error("Failed to fetch route");
  }
  const data = await response.text();
  return data;
}

export const getRouteByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [...getRoutesQueryOptions.queryKey, id] as const,
    queryFn: () => getRouteById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export function useGetRouteById(id: number) {
  return useSuspenseQuery(getRouteByIdQueryOptions(id));
}
