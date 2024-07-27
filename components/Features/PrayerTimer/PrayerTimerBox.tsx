import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import TimerCircle from "@/components/TimerCircle";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const PrayerTimerBox = () => {
  const [alarm, setAlarm] = useState(true);

  const handleAlarm = () => {
    setAlarm((prev) => !prev);
  };
  return (
    <View style={styles.wrapper}>
      <TimerCircle
        active={false}
        bgStyle={{ backgroundColor: Colors.darkSea, borderColor: "#fff" }}
        textStyle={{
          color: Colors.darkSea,
          fontWeight: "bold",
          letterSpacing: 0.5,
        }}
      />
      <Text style={styles.time}>3:20 AM</Text>
      <TouchableOpacity
        onPress={handleAlarm}
        style={{
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 50,
        }}
        activeOpacity={0.5}
      >
        <Ionicons
          name={!alarm ? "notifications-off-sharp" : "notifications"}
          size={32}
          color={Colors.darkSea}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PrayerTimerBox;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D1E5E9",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  time: {
    fontFamily: "MontserratSemiBold",
    fontWeight: "semibold",
    fontSize: 24,
    color: Colors.text1,
  },
});
