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
import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [features, setFeatures] = useState<any[]>([]);
  const { prayerInfo, loading } = usePrayerInfo();
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
    const features = require("../../../../assets/data/featureList.json");
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
              gap: 4,
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
          <FlatList
            horizontal={true}
            data={prayerInfo?.timing}
            renderItem={({ item }) => (
              <TimerCircle key={item} title={item.name} time={item.time} />
            )}
            keyExtractor={(item, index) => `${index}`}
            contentContainerStyle={{
              gap: 10,
            }}
          />
        </HeroWrapper>
        {/* home content */}
        <View style={styles.mainContentWrapper}>
          {/* our features */}
          <View style={styles.section}>
            <SectionTitle title={"Our Features"} />
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
          <View style={{ marginBottom: 50 }}>
            <SectionTitle title={"Daily Dua"} />
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.lightSea,
                padding: 8,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontWeight: "semibold",
                  color: Colors.darkSea,
                  textAlign: "justify",
                }}
              >
                O Allah, give my soul (nafs) its God-fearing righteousness
                (taqwa) and purify it, for You are the best to purify it. You
                are its Protector and its Guardian. ~Muslim
              </Text>
            </View>
          </View>
        </View>
      </VirtualizedList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroWrapper: {
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 8,
  },
  mainContentWrapper: {
    paddingHorizontal: 24,
  },
  section: {
    marginVertical: 10,
  },
});
