import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Drawer
          screenOptions={{
            headerShown: false,
          }}
        >
          <Drawer.Screen
            name="(stack)" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Home",
              title: "Home",
            }}
          />
          <Drawer.Screen
            name="rate_us" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Rate Us",
              title: "Rate us",
            }}
          />
          <Drawer.Screen
            name="contact" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Contact",
              title: "contact",
            }}
          />
        </Drawer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
