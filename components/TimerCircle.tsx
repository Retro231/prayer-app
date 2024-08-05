import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import usePrayerInfo from "@/hooks/usePrayerInfo";
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
        <View
          style={[
            styles.circle,
            bgStyle,
            active && { backgroundColor: "green", borderColor: Colors.green },
          ]}
        >
          <Text style={[styles.text]}>...</Text>
          {/* <Text style={[styles.text]}>AM</Text> */}
        </View>
      )}
      {!loading && (
        <>
          <View
            style={[
              styles.circle,
              bgStyle,
              active && { backgroundColor: "green", borderColor: Colors.green },
            ]}
          >
            <Text style={[styles.text]}>{time}</Text>
            {/* <Text style={[styles.text]}>AM</Text> */}
          </View>
          <Text style={[styles.text, styles.prayerName, titleStyle]}>
            {title}
          </Text>
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
    fontSize: 10,
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
