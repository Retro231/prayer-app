import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const mediaHome = () => {
  return (
    <Stack>
      <Stack.Screen name="media" options={{ headerShown: false }} />
      <Stack.Screen name="live_makkah" options={{ headerShown: false }} />
      <Stack.Screen name="live_madina" options={{ headerShown: false }} />
      <Stack.Screen name="islamic_iptv" options={{ headerShown: false }} />
    </Stack>
  );
};

export default mediaHome;
