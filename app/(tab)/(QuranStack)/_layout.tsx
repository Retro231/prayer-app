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
      <Stack.Screen name="al_quran" options={{ headerShown: false }} />
      <Stack.Screen name="quran_page" options={{ headerShown: false }} />
    </Stack>
  );
}
