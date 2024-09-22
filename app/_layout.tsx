import useFonts from "@/hooks/useFonts";
import { Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Notification, { EventType } from "@notifee/react-native";
import Loading from "@/components/Loading";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
        // make any API calls you need to do here
        await useFonts(); //Pre-load fonts,
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    (async () => {})();
  });

  if (!appIsReady) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tab)" />
      </Stack>
    </GestureHandlerRootView>
  );
}
