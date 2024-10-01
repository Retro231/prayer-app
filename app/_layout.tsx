import useFonts from "@/hooks/useFonts";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import Notification, { EventType } from "@notifee/react-native";
import Loading from "@/components/Loading";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/rtk/store";

export default function RootLayout() {
  Notification.onBackgroundEvent(async ({ type, detail }) => {
    try {
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
    } catch (error) {
      console.log(error);
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
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tab)" />
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
