import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { DrawerToggleButton } from "@react-navigation/drawer";
const { width, height } = Dimensions.get("screen");

const Header = () => {
  return (
    <View style={styles.wrapper}>
      {/* left section */}
      <View style={styles.left}>
        <DrawerToggleButton tintColor={Colors.text2} />
        <Text style={styles.title}>Page Title</Text>
      </View>
      {/* right section*/}
      <View style={styles.right}>
        <Ionicons
          name={"person-circle-outline"}
          size={32}
          color={Colors.text2}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 16,
    paddingRight: 10,
    paddingVertical: 16,
    backgroundColor: Colors.lightSea,
    maxWidth: "auto",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text2,
  },
  right: {},
});
