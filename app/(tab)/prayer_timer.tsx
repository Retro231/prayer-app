import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import HeroWrapper from "@/components/Hero/HeroWrapper";
import Location from "@/components/Location";
import HeroStatus from "@/components/Hero/HeroStatus";
import HeroSmallDate from "@/components/Hero/HeroSmallDate";
import { Colors } from "@/constants/Colors";
import PrayerTimerBox from "@/components/Features/PrayerTimer/PrayerTimerBox";

const PrayerTimerScreen = () => {
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
            eng={"Today, 7 July"}
            arabic={"1 Muharram 1446"}
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
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={({ item }) => <PrayerTimerBox />}
          keyExtractor={(item) => `${item}`}
          contentContainerStyle={{
            gap: 10,
          }}
        />
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
