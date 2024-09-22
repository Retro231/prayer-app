import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ImageBackground, Linking, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

const headerBackgroundImage = require("@/assets/images/slamic-pattern-background.jpg");

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: Colors.darkSea,
      }}
      contentContainerStyle={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View>
        <ImageBackground
          source={headerBackgroundImage}
          style={styles.drawerHeader}
        >
          <Text style={styles.headerText}>Prayer App</Text>
          <Text style={[styles.headerText, { fontSize: 10 }]}>
            Version: 1.0
          </Text>
        </ImageBackground>
        <DrawerItemList {...props} />
      </View>
      <DrawerItem
        labelStyle={{
          fontSize: 15,
          fontWeight: "bold",
          color: "#ffffffc0",
        }}
        label="Exit"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout(props: any) {
  // <a href="https://www.vecteezy.com/free-vector/arabic-pattern">Arabic Pattern Vectors by Vecteezy</a>

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#ffffffc0",
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: "bold",
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -4,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.lightSea,
  },
  drawerFooter: {
    padding: 20,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#999",
  },
});
