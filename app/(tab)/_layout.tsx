import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.lightSea,
        tabBarInactiveTintColor: "#fff",
        // tabBarActiveBackgroundColor: "#D9D9D9",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.lightSea,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          fontWeight: "bold",
          color: "white",
        },
      }}
    >
      <Tabs.Screen
        name="(drawer)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              style={[
                styles.tabIcon,
                { backgroundColor: `${focused ? "#D9D9D9" : "transparent"}` },
              ]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="prayer_timer"
        options={{
          title: "Prayer Timer",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "alarm" : "alarm-outline"}
              color={color}
              style={[
                styles.tabIcon,
                { backgroundColor: `${focused ? "#D9D9D9" : "transparent"}` },
              ]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(QuranStack)"
        options={{
          title: "Al Quran",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "book" : "book-outline"}
              color={color}
              style={[
                styles.tabIcon,
                { backgroundColor: `${focused ? "#D9D9D9" : "transparent"}` },
              ]}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="media"
        options={{
          title: "Media",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "tv" : "tv-outline"}
              color={color}
              style={[
                styles.tabIcon,
                { backgroundColor: `${focused ? "#D9D9D9" : "transparent"}` },
              ]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
              style={[
                styles.tabIcon,
                { backgroundColor: `${focused ? "#D9D9D9" : "transparent"}` },
              ]}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    paddingHorizontal: 18,
    paddingVertical: 4,
    borderRadius: 15,
  },
});
