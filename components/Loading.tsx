import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <ActivityIndicator size={24} color={Colors.text1} />
      {/* <Text
        style={{
          fontFamily: "MontserratMedium",
          fontWeight: "medium",
          fontSize: 24,
          color: Colors.text1,
        }}
      >
        Please wait...
      </Text> */}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
