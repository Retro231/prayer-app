import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import usePrayerInfo from "@/hooks/usePrayerInfo";
import { Ionicons } from "@expo/vector-icons";
interface propsType {
  title: String;
  time: String;
  bgStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
}

const TimerCircle: React.FC<propsType> = ({
  title,
  time,
  bgStyle,
  titleStyle,
}) => {
  const [active, setActive] = useState(false);
  const { prayerInfo, loading } = usePrayerInfo();

  useEffect(() => {
    if (prayerInfo?.upcomingPrayer.name === title) {
      setActive(true);
    }
  }, [loading]);

  return (
    <View style={styles.wrapper}>
      {loading && (
        <View style={[styles.item, bgStyle]}>
          <Text style={[styles.text]}>...</Text>
          {/* <Text style={[styles.text]}>AM</Text> */}
        </View>
      )}
      {!loading && (
        <>
          <View style={[styles.item, bgStyle]}>
            <Text style={[styles.text, active && { color: "#fff" }]}>
              {time}
            </Text>
            {/* <Text style={[styles.text]}>AM</Text> */}
          </View>
          <Text
            style={[
              styles.text,
              styles.prayerName,
              titleStyle,
              active && { color: "#fff" },
            ]}
          >
            {title}
          </Text>
          {active && <Ionicons name="caret-up-sharp" color={"#00ff37"} />}
        </>
      )}
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
  item: {
    borderColor: "#fff",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#dedede",
    fontFamily: "MontserratSemiBold",
  },
  prayerName: {
    fontWeight: "medium",
    fontFamily: "MontserratMedium",
    fontSize: 12,
  },
});
