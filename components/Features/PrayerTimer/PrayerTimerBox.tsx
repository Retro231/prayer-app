import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import TimerCircle from "@/components/TimerCircle";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Notification, {
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import usePrayerInfo from "@/hooks/usePrayerInfo";
import { RootState } from "@/rtk/store";
import { useSelector } from "react-redux";

interface propsType {
  time: string;
  title: string;
}

interface adujstedMinute {
  Fajr: number;
  Dhuhr: number;
  Asr: number;
  Maghrib: number;
  Isha: number;
}

const PrayerTimerBox: React.FC<propsType> = ({ time, title }) => {
  const [active, setActive] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const { prayerInfo, loading } = usePrayerInfo();

  useEffect(() => {
    if (prayerInfo?.upcomingPrayer.name === title) {
      setActive(true);
    }
  }, [loading]);

  const isNotificationIdExist = async (): Promise<string | null> => {
    const notificatonId: string | null = await AsyncStorage.getItem(title);
    return notificatonId;
  };

  const isAlermSet = async () => {
    const id = await isNotificationIdExist();
    if (id !== null) {
      setAlarm(true);
    }
  };

  const cancleAll = async () => {
    const ids = await Notification.getTriggerNotificationIds();

    await Notification.cancelAllNotifications(ids);
    await AsyncStorage.clear();
  };

  useEffect(() => {
    // // cancle all notificaiton
    // cancleAll();
    // check if alerm is already set.
    isAlermSet();
  }, []);

  const setNotification = async (
    hour: number,
    minute: number,
    title: string
  ) => {
    // Request permissions (required for iOS)
    await Notification.requestPermission();

    const channelId = await Notification.createChannel({
      id: "custom-sound",
      name: "Channel with custom sound",
      sound: "azan",
    });

    const date = new Date(Date.now());
    // date.setSeconds(date.getSeconds() + 4);
    date.setHours(hour, minute, 0, 0);

    if (date < new Date()) {
      date.setDate(date.getDate() + 1);
    }

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    // Create a trigger notification
    const notificatonId = await Notification.createTriggerNotification(
      {
        title: `Prayer: ${title}`,
        // body: "Today at 11:20am",
        android: {
          channelId,
          sound: "azan",
        },
      },
      trigger
    );

    // save id to async storge
    await AsyncStorage.setItem(title, notificatonId);
    console.log("set ID: ", notificatonId);
  };

  const cancleNotification = async () => {
    const notificatonId = await isNotificationIdExist();
    if (notificatonId !== null) {
      await Notification.cancelTriggerNotification(notificatonId);
      console.log("delete ID: ", notificatonId);
    }
    // delete from async storage
    await AsyncStorage.removeItem(title);
  };

  const handleAlarm = async () => {
    const [hour, min] = time.split(":");
    if (!alarm) {
      await setNotification(parseInt(hour), parseInt(min), title);
    } else {
      await cancleNotification();
    }
    setAlarm((prev) => !prev);
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          width: "33%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "MontserrateSemiBold",
            fontWeight: "semibold",
            color: "#ffff",
          }}
        >
          {title}{" "}
          {active && <Ionicons name="caret-back-sharp" color={"#00ff37"} />}
        </Text>
      </View>
      <Text
        style={[
          styles.time,
          {
            width: "33%",
          },
        ]}
      >
        {time ?? 0}
      </Text>
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
          size={22}
          color={Colors.darkSea}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PrayerTimerBox;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.lightSea,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "100%",
  },
  time: {
    fontFamily: "MontserratMedium",
    fontWeight: "medium",
    fontSize: 22,
    color: Colors.text2,
  },
});
