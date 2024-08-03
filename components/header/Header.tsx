import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { router } from "expo-router";
const { width, height } = Dimensions.get("screen");
interface propsType {
  title: String;
  goBack?: boolean;
}
const Header: React.FC<propsType> = ({ title, goBack }) => {
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <View style={styles.wrapper}>
      {/* left section */}
      <View style={styles.left}>
        {goBack ? (
          <Ionicons
            style={{ paddingHorizontal: 15 }}
            name="arrow-back"
            size={24}
            color={Colors.text2}
            onPress={handleGoBack}
          />
        ) : (
          <DrawerToggleButton tintColor={Colors.text2} />
        )}

        <Text style={styles.title}>{title}</Text>
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
