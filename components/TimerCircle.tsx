import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface propsType {
  title: String;
  time: String;
  active: Boolean;
  bgStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
}

const TimerCircle: React.FC<propsType> = ({
  title,
  time,
  active = false,
  bgStyle,
  titleStyle,
}) => {
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.circle,
          active && { backgroundColor: "#1D3C43", borderColor: Colors.green },
          bgStyle,
        ]}
      >
        <Text style={[styles.text]}>{time}</Text>
        {/* <Text style={[styles.text]}>AM</Text> */}
      </View>
      <Text style={[styles.text, styles.prayerName, titleStyle]}>{title}</Text>
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
    justifyContent: "center",
    backgroundColor: Colors.darkSea,
    height: 50,
    width: 50,
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
