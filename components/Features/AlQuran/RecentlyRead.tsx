import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const RecentlyRead = () => {
  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        margin: 10,
        gap: 5,
      }}
    >
      <Text style={styles.text}>Recently Read:</Text>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Text
          style={[
            styles.text,
            { textDecorationLine: "underline", cursor: "pointer" },
          ]}
        >
          Al-Mu’minun 23:24
        </Text>
        <Text
          style={[
            styles.text,
            { textDecorationLine: "underline", cursor: "pointer" },
          ]}
        >
          Al-Mu’minun 23:8
        </Text>
      </View>
    </View>
  );
};

export default RecentlyRead;

const styles = StyleSheet.create({
  text: {
    fontFamily: "MontserratMedium",
    fontWeight: "medium",
    fontSize: 14,
    color: Colors.text2,
  },
});
