import Header from "@/components/header/Header";
import HeroWrapper from "@/components/Hero/HeroWrapper";
import Location from "@/components/Location";
import SectionTitle from "@/components/SectionTitle";
import TimerCircle from "@/components/TimerCircle";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import {
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
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
        <Location />
        <FlatList
          horizontal={true}
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={({ item }) => <TimerCircle key={item} />}
          keyExtractor={(item) => `${item}`}
          contentContainerStyle={{
            gap: 10,
          }}
        />
      </HeroWrapper>
      {/* home content */}
      <View style={styles.mainContentWrapper}>
        <View>
          <SectionTitle title={"Our Features"} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroWrapper: {
    alignItems: "center",
    gap: 16,
  },
  mainContentWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
});
