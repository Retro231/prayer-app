import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Drawer>
          <Drawer.Screen
            name="(tabs)" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Home",
              title: "overview",
            }}
          />
          <Drawer.Screen
            name="compass" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Compass",
              title: "overview",
            }}
          />
          <Drawer.Screen
            name="live_makkah_madinah" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Live Makkah Madinah",
              title: "overview",
            }}
          />
        </Drawer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
