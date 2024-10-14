import useFonts from "@/hooks/useFonts";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import Notification, { EventType } from "@notifee/react-native";
import Loading from "@/components/Loading";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/rtk/store";
import NetInfo from "@react-native-community/netinfo";

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [netOk, setNetOk] = useState<boolean | null>(false);

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

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      setNetOk(state.isConnected);
      SplashScreen.hideAsync();
    });

    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

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
          {netOk ? (
            <Stack.Screen name="(tab)" />
          ) : (
            <Stack.Screen name="InternetInfo" />
          )}
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
