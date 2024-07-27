import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface propsType {
  title: String;
  info: String;
  style?: ViewStyle | ViewStyle[];
}

const HeroStatus: React.FC<propsType> = ({ title, info, style }) => {
  return (
    <View style={[style]}>
      <Text
        style={{
          fontFamily: "MontserratSemiBold",
          fontWeight: "semibold",
          fontSize: 16,
          color: Colors.text2,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: "MontserratMedium",
          fontWeight: "medium",
          fontSize: 26,
          color: Colors.text2,
        }}
      >
        {info}
      </Text>
    </View>
  );
};

export default HeroStatus;

const styles = StyleSheet.create({});
