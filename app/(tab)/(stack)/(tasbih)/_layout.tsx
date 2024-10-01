import { Stack } from "expo-router";

export default function TasbihLayout() {
  return (
    <Stack>
      <Stack.Screen name="tasbih_counter" options={{ headerShown: false }} />
      <Stack.Screen name="tasbih_home" options={{ headerShown: false }} />
    </Stack>
  );
}
