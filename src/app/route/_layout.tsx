import { Stack } from "expo-router";

export default function RouteLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Route",
        }}
      />
    </Stack>
  );
}
