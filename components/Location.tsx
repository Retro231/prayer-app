import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

const Location = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="location" size={24} color={"red"} />
      <Text
        style={{
          color: Colors.green,
          fontWeight: "semibold",
          fontFamily: "MontserratSemiBold",
          fontSize: 14,
        }}
      >
        Moulvibazar, Sylhet
      </Text>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({});
