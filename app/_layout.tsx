import useFonts from "@/hooks/useFonts";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Notification, { EventType } from "@notifee/react-native";
import Loading from "@/components/Loading";
export default function RootLayout() {
  Notification.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    if (notification && pressAction) {
      if (
        type === EventType.ACTION_PRESS &&
        pressAction.id === "mark-as-read"
      ) {
        // Update external API
        console.log("do something");
      }
      // await Notification.cancelNotification(notification.id ?? "");
    }
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await useFonts();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return <Loading />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tab)" />
    </Stack>
  );
}
