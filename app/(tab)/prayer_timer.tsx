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
import Location from "@/components/Location";
import HeroStatus from "@/components/Hero/HeroStatus";
import HeroSmallDate from "@/components/Hero/HeroSmallDate";
import { Colors } from "@/constants/Colors";
import PrayerTimerBox from "@/components/Features/PrayerTimer/PrayerTimerBox";
import usePrayerInfo from "@/hooks/usePrayerInfo";

const PrayerTimerScreen = () => {
  const { prayerInfo, loading } = usePrayerInfo();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Prayer Timer"} />
      {/* hero */}
      <HeroWrapper style={{ gap: 10 }}>
        <View style={styles.heroTop}>
          <HeroStatus
            style={{
              alignItems: "flex-start",
            }}
            title={"Upcoming Prayer"}
            info={"Fajr"}
          />
          <HeroSmallDate
            style={{
              alignItems: "flex-end",
            }}
            eng={prayerInfo?.date ?? ""}
            arabic={prayerInfo?.hijri ?? ""}
          />
        </View>
        <View style={styles.heroBottom}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            {/* upcomming prayer Time */}
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontWeight: "semibold",
                fontSize: 32,
                color: Colors.text2,
              }}
            >
              03:20 AM
            </Text>
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontWeight: "medium",
                fontSize: 24,
                color: Colors.text2,
              }}
            >
              04:02:55
            </Text>
          </View>
          <Location />
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
  heroWrapper: {
    // alignItems: "center",
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroBottom: {
    alignItems: "center",
    gap: 10,
  },
});
