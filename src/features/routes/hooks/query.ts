import { Route } from "@/features/routes/type";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

// --- Get all ---

async function getRoutes() {
  const response = await fetch(
    "https://raw.githubusercontent.com/Konijnebeer/eindopdracht-pgr07/refs/heads/main/api/locations.json",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
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
