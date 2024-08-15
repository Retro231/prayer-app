import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import HeroWrapper from "@/components/Hero/HeroWrapper";
import SearchBar from "@/components/Features/AlQuran/SearchBar";
import RecentlyRead from "@/components/Features/AlQuran/RecentlyRead";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ListItem from "@/components/Features/AlQuran/ListItem";
import { ZoomIn } from "react-native-reanimated";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Loading from "@/components/Loading";
import { MyContext } from "@/context/MyContext";
import { getJuz, getSurahList } from "@/scripts/getQuranData";
// "number": 1,
// "name": "سُورَةُ ٱلْفَاتِحَةِ",
// "englishName": "Al-Faatiha",
// "englishNameTranslation": "The Opening",
// "numberOfAyahs": 7,
// "revelationType": "Meccan"

interface Item {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
}

interface JuzItem extends Item {
  juz_number: number;
  verse_mapping: object;
}

const menuItem = [
  {
    id: 1,
    name: "Surah",
  },
  {
    id: 2,
    name: "Juz",
  },
  {
    id: 3,
    name: "Bookmarks",
  },
];

const renderItem = ({ item }: ListRenderItemInfo<JuzItem>) => {
  const handlePress = () => {
    router.push({
      pathname: "(QuranStack)/quran_page",
      params: {
        id: item.number,
        name: item.name,
        englishName: item.englishName,
        numberOfAyahs: item.numberOfAyahs,
        englishNameTranslation: item.englishNameTranslation,
        juz_number: item.juz_number,
      },
    });
  };

  return (
    <ListItem
      onPress={() => handlePress()}
      id={item.number}
      name={item.name}
      englishName={item.englishName}
      englishNameTranslation={item.englishNameTranslation}
      juz_number={item.juz_number}
      verse_mapping={item.verse_mapping}
    />
  );
};

const AlQuranScreen: React.FC = () => {
  const [active, setActive] = useState("Surah");
  const [list, setList] = useState<JuzItem[] | null>(null);
  const [surahList, setSurahList] = useState(null);
  const [juzList, setJuzList] = useState<JuzItem[]>([]);
  const [bookmarks, setBookmarks] = useState<JuzItem[]>([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const list = await getSurahList();
      const juzs = await getJuz();
      setSurahList(list);
      setJuzList(juzs);
      setList(list);
    })();
  }, []);

  useEffect(() => {
    if (active === "Surah") {
      setList(surahList);
    } else if (active === "Juz") {
      setList(juzList);
    } else if (active === "Bookmarks") {
      setList(bookmarks);
    }
  }, [active]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Al-Quran"} />
      {/* hero */}
      <HeroWrapper>
        <SearchBar />
        <RecentlyRead />
      </HeroWrapper>
      {/* menu */}
      <View style={styles.mainContent}>
        <View style={styles.menuWrapper}>
          <View style={styles.menuLeft}>
            {menuItem.map((item) => {
              return (
                <Pressable
                  key={item.id}
                  style={[
                    styles.menuItem,
                    active === item.name && styles.activeMenu,
                  ]}
                  onPress={() => setActive(item.name)}
                >
                  <Text style={styles.menuText}>{item.name}</Text>
                </Pressable>
              );
            })}
          </View>
          <FontAwesome
            style={styles.menuItem}
            name="sort-numeric-asc"
            size={20}
            color={Colors.text1}
          />
        </View>
        {/* items */}
        <FlatList
          style={{ flex: 1 }}
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.number}`}
        />
      </View>
    </SafeAreaView>
  );
};

export default AlQuranScreen;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  menuWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuLeft: {
    flexDirection: "row",
    gap: 10,
  },
  menuItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
  },
  activeMenu: {
    backgroundColor: "#D9D9D9",
  },
  menuText: {
    fontFamily: "MontserratBold",
    fontWeight: "bold",
    fontSize: 14,
    color: Colors.text1,
  },
});
