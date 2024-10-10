import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import HeroWrapper from "@/components/Hero/HeroWrapper";
import HeroStatus from "@/components/Hero/HeroStatus";
import HeroSmallDate from "@/components/Hero/HeroSmallDate";
import { Colors } from "@/constants/Colors";
import PrayerTimerBox from "@/components/Features/PrayerTimer/PrayerTimerBox";
import usePrayerInfo from "@/hooks/usePrayerInfo";

const PrayerTimerScreen = () => {
  const { prayerInfo, loading } = usePrayerInfo();

  // Assuming time is in HH:mm format and today's date

  const targetTime = prayerInfo ? prayerInfo?.upcomingPrayer.time : "00:00";
  // const [hours, minutes] = prayerInfo
  //   ? prayerInfo?.upcomingPrayer.time.split(":")
  //   : ["00", "00"];
  // targetTime.setHours(parseInt(hours, 10));
  // targetTime.setMinutes(parseInt(minutes, 10));
  // targetTime.setSeconds(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Prayer Timer"} />
      {/* hero */}
      <HeroWrapper style={{ gap: 10, paddingBottom: 20, paddingTop: 20 }}>
        <View style={styles.heroTop}>
          <HeroStatus
            style={{
              alignItems: "flex-start",
              gap: 1,
              marginLeft: 1,
            }}
            title={"Next"}
            info={prayerInfo?.upcomingPrayer.name ?? ""}
            time={prayerInfo?.upcomingPrayer.time ?? ""}
          />
          <HeroSmallDate
            style={{
              alignItems: "flex-end",
            }}
            eng={prayerInfo?.date ?? ""}
            arabic={prayerInfo?.hijri ?? ""}
          />
        </View>
      </HeroWrapper>
      {/* main content */}

      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          flex: 1,
        }}
      >
        {!loading && (
          <FlatList
            data={prayerInfo?.timing}
            renderItem={({ item }) => (
              <PrayerTimerBox time={item.time} title={item.name} />
            )}
            keyExtractor={(item, index) => `${index}`}
            contentContainerStyle={{
              gap: 10,
            }}
          />
        )}
        {loading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator color={"#000"} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PrayerTimerScreen;

const styles = StyleSheet.create({
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
