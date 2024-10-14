import DailyDua from "@/components/Features/Dua/DailyDua";
import Header from "@/components/header/Header";
import HeroWrapper from "@/components/Hero/HeroWrapper";
import Loading from "@/components/Loading";
import MyLocation from "@/components/MyLocation";
import FeatureNavBtn from "@/components/navigation/FeatureNavBtn";
import SectionTitle from "@/components/SectionTitle";
import TimerCircle from "@/components/TimerCircle";
import VirtualizedList from "@/components/VirtualizedList";
import { Colors } from "@/constants/Colors";
import usePrayerInfo from "@/hooks/usePrayerInfo";
import { RootState } from "@/rtk/store";
import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Image,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const [features, setFeatures] = useState<any[]>([]);
  const { prayerInfo, loading } = usePrayerInfo();
  const { is24HourFormat } = useSelector((state: RootState) => state.app);
  const { height, width } = useWindowDimensions();
  // **********
  //The padData function ensures that the total number of items is a multiple of the number of columns (numColumns). If the last row is incomplete, it pads the array with dummy items.
  // ***********
  const padData = (data: Array<String>, numColumns: Number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({
        id: `blank-${numberOfElementsLastRow}`,
        icon: "",
        text: "",
        empty: true,
      });
      numberOfElementsLastRow++;
    }
    return data;
  };

  useEffect(() => {
    const features = require("@/assets/data/featureList.json");
    // console.log(features);
    const data = padData([...features.data], 3);
    setFeatures(data);
  }, []);

  // useEffect(() => {
  //   const url = "https://api.quran.com/api/v4/chapters";
  //   const headers = {
  //     Accept: "application/json",
  //   };

  //   fetch(url, { method: "GET", headers: headers })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(JSON.stringify(data));
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Home"} />
      <VirtualizedList>
        {/* hero Wrapper */}
        <HeroWrapper style={styles.heroWrapper}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                gap: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontWeight: "semibold",
                  fontSize: 24,
                  color: Colors.text2,
                }}
              >
                Today, 7 July
              </Text>
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  fontWeight: "medium",
                  fontSize: 14,
                  color: Colors.text2,
                }}
              >
                1 Muharram 1446
              </Text>
            </View>
            <MyLocation />
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image source={require("@/assets/images/weather.png")} />
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <FlatList
              horizontal={true}
              data={prayerInfo?.timing}
              renderItem={({ item }) => (
                <TimerCircle key={item} title={item.name} time={item.time} />
              )}
              keyExtractor={(item, index) => `${index}`}
              contentContainerStyle={{
                gap: is24HourFormat ? 20 : 8,
              }}
            />
          </View>
        </HeroWrapper>
        {/* home content */}
        <View style={styles.mainContentWrapper}>
          {/* our features */}
          <View style={styles.section}>
            <SectionTitle title={"Features"} />
            <FlatList
              numColumns={3}
              horizontal={false}
              columnWrapperStyle={{
                columnGap: 5,
              }}
              data={features}
              renderItem={({ item }) => (
                <FeatureNavBtn
                  iconName={item.icon}
                  featureName={item.name}
                  empty={item?.empty}
                  route={item?.url}
                />
              )}
              keyExtractor={(item) => `${item.id}`}
              contentContainerStyle={{
                alignItems: "center",
                width: "100%",
              }}
            />
          </View>
          {/* daily dua */}
          <DailyDua />
        </View>
      </VirtualizedList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroWrapper: {
    // alignItems: "center",
    gap: 1,
    paddingHorizontal: 8,
  },
  mainContentWrapper: {
    paddingHorizontal: 24,
  },
  section: {
    marginVertical: 10,
  },
});
