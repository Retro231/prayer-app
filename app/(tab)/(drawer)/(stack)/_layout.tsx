import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack
    // screenOptions={{
    //   headerStyle: {
    //     backgroundColor: "#f4511e",
    //   },
    //   headerTintColor: "#fff",
    //   headerTitleStyle: {
    //     fontWeight: "bold",
    //   },
    // }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="compass" options={{ headerShown: false }} />
      <Stack.Screen name="nearby_mosque" options={{ headerShown: false }} />
      <Stack.Screen name="halal_restaurant" options={{ headerShown: false }} />
      <Stack.Screen name="(tasbih)" options={{ headerShown: false }} />
      <Stack.Screen name="more" options={{ headerShown: false }} />
    </Stack>
  );
}
