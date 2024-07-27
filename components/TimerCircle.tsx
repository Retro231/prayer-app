import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const TimerCircle = ({ active = false }) => {
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.circle,
          active && { backgroundColor: "#1D3C43", borderColor: Colors.green },
        ]}
      >
        <Text style={[styles.text]}>03.20</Text>
        <Text style={[styles.text]}>AM</Text>
      </View>
      <Text style={[styles.text, styles.prayerName]}>Tahajjud</Text>
    </View>
  );
};

export default TimerCircle;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    gap: 3,
    paddingBottom: 10,
  },
  circle: {
    borderWidth: 1.5,
    borderColor: "#fff",
    padding: 8,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: Colors.darkSea,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "MontserratSemiBold",
  },
  prayerName: {
    fontWeight: "medium",
    fontFamily: "MontserratMedium",
    fontSize: 12,
  },
});
