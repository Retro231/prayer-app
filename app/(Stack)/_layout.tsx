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
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="more" options={{ headerShown: false }} />
    </Stack>
  );
}
