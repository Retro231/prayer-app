import React from "react";
import { Stack } from "expo-router";

const menuHome = () => {
  return (
    <Stack>
      <Stack.Screen name="menu" options={{ headerShown: false }} />
      <Stack.Screen name="privacyPolicy" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
};

export default menuHome;
