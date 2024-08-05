import { Colors } from "@/constants/Colors";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

// Function to calculate the difference in milliseconds
const calculateTimeDifference = (currentTime: Date, targetTime: Date) => {
  const current: any = new Date(currentTime);
  const target: any = new Date(targetTime);

  return target - current;
};

// Format time difference into hours, minutes, and seconds
const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
interface CountdownTimerProps {
  targetTime: Date;
}
const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    calculateTimeDifference(new Date(), targetTime)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime: any = new Date();
      const difference = calculateTimeDifference(currentTime, targetTime);

      setTimeLeft(difference);

      if (difference <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontFamily: "MontserratMedium",
    fontWeight: "medium",
    fontSize: 24,
    color: Colors.text2,
  },
});

export default CountdownTimer;
