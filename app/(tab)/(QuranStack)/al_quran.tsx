import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import HeroWrapper from "@/components/Hero/HeroWrapper";
import SearchBar from "@/components/Features/AlQuran/SearchBar";
import RecentlyRead from "@/components/Features/AlQuran/RecentlyRead";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import ListItem from "@/components/Features/AlQuran/ListItem";
import { router } from "expo-router";
import Loading from "@/components/Loading";
import { useSQLiteContext } from "expo-sqlite";
import {
  initializeDB,
  filterChapters,
  filterSurahList,
  filterJuzList,
  filterBookmark,
  toggleBookmark,
} from "@/scripts/database";

// "number": 1,
// "name": "سُورَةُ ٱلْفَاتِحَةِ",
// "englishName": "Al-Faatiha",
// "englishNameTranslation": "The Opening",
// "numberOfAyahs": 7,
// "revelationType": "Meccan"

interface Item {
  id: number;
  surah_number: number;
  surah_name: string;
  surah_englishName: string;
  surah_englishNameTranslation: string;
  surah_numberOfAyahs: number;
  isBookmarked: number;
}

interface JuzItem extends Item {
  juz_number: number;
  juz_verse_mapping: string;
  juz_first_verse_id: number;
  juz_last_verse_id: number;
  juz_verses_count: number;
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

const AlQuranScreen: React.FC = () => {
  const [active, setActive] = useState("Surah");
  const [chapters, setChapters] = useState<any>(null);
  const [surahList, setSurahList] = useState<any>(null);
  const [juzList, setJuzList] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const db = useSQLiteContext();

  useEffect(() => {
    getDBinfo();
  }, [active]);

  const getDBinfo = async () => {
    db.withTransactionAsync(async () => {
      setLoading(true);
      await initializeDB();
      const sl = await filterSurahList();
      const jl = await filterJuzList();
      const bl = await filterBookmark();
      setSurahList(sl);
      setJuzList(jl);
      setBookmarks(bl);
      setLoading(false);
    });
  };

  // -----------flatlist surah item -------------------
  const renderSurahItem = ({ item }: ListRenderItemInfo<JuzItem>) => {
    const handlePress = () => {
      router.push({
        pathname: "(QuranStack)/quran_page",
        params: {
          id: item.surah_number,
          name: item.surah_name,
          englishName: item.surah_englishName,
          englishNameTranslation: item.surah_englishNameTranslation,
          numberOfAyahs: item.surah_numberOfAyahs,
        },
      });
    };

    const handleBookmarkPress = async () => {
      console.log(item);

      await toggleBookmark(item.id);
      // await getDBinfo();
      if (item.isBookmarked !== 1) {
        setSurahList((prev: any) => [...prev, { ...item, isBookmarked: 1 }]);
        setBookmarks((prev: any) => [...prev, { ...item, isBookmarked: 1 }]);
      } else {
        setBookmarks((prev: any) =>
          prev.filter((prevData: any) => prevData.id !== item.id)
        );
        setSurahList((prev: any) => [...prev, { ...item, isBookmarked: 0 }]);
      }
    };

    return (
      <ListItem
        onPress={() => handlePress()}
        onBookmarkPress={handleBookmarkPress}
        surah_number={item.surah_number}
        name={item.surah_name}
        englishName={item.surah_englishName}
        englishNameTranslation={item.surah_englishNameTranslation}
        isBookmarked={item.isBookmarked}
      />
    );
  };
  // ---------- flatlist Juz item -------------
  const renderJuzItem = ({ item }: ListRenderItemInfo<JuzItem>) => {
    const margedVerseMapping = `${item.juz_first_verse_id}-${item.juz_last_verse_id}`;

    const handlePress = () => {
      console.log(item);

      router.push({
        pathname: "(QuranStack)/quran_page",
        params: {
          juz_number: item.juz_number,
        },
      });
    };

    const handleBookmarkPress = async () => {
      console.log(item);

      await toggleBookmark(item.id);
      // await getDBinfo();
      if (item.isBookmarked !== 1) {
        setJuzList((prev: any) => [...prev, { ...item, isBookmarked: 1 }]);
        setBookmarks((prev: any) => [...prev, { ...item, isBookmarked: 1 }]);
      } else {
        setBookmarks((prev: any) =>
          prev.filter((prevData: any) => prevData.id !== item.id)
        );
        setJuzList((prev: any) => [...prev, { ...item, isBookmarked: 0 }]);
      }
    };

    return (
      <ListItem
        onPress={() => handlePress()}
        onBookmarkPress={handleBookmarkPress}
        juz_number={item.juz_number}
        verse_mapping={margedVerseMapping}
        isBookmarked={item.isBookmarked}
      />
    );
  };
  // ----------flatlist bookmarks
  const renderBookmarks = ({ item }: ListRenderItemInfo<any>) => {
    const handlePress = () => {
      router.push({
        pathname: "(QuranStack)/quran_page",
        params: {},
      });
    };
    const margedVerseMapping = `${item.juz_first_verse_id}-${item.juz_last_verse_id}`;
    // // INSERT INTO bookmarks (title, url) VALUES (?, ?);
    const handleBookmarkPress = async () => {
      await toggleBookmark(item.id);
      // await getDBinfo();
      if (item.isBookmarked !== 1) {
        if (item.juz_number) {
          setJuzList((prev: any) => [...prev, { ...item, isBookmarked: 1 }]);
        } else {
          setSurahList((prev: any) => [...prev, { ...item, isBookmarked: 1 }]);
        }
        setBookmarks((prev: any) => [...prev, { ...item, isBookmarked: 1 }]);
      } else {
        setBookmarks((prev: any) =>
          prev.filter((prevData: any) => prevData.id !== item.id)
        );
        if (item.juz_number) {
          setJuzList((prev: any) => [...prev, { ...item, isBookmarked: 1 }]);
        } else {
          setSurahList((prev: any) => [...prev, { ...item, isBookmarked: 1 }]);
        }
      }
    };

    return (
      <ListItem
        onPress={() => handlePress()}
        onBookmarkPress={handleBookmarkPress}
        surah_number={item.surah_number}
        name={item.surah_name}
        englishName={item.surah_englishName}
        englishNameTranslation={item.surah_englishNameTranslation}
        juz_number={item.juz_number}
        verse_mapping={margedVerseMapping}
        isBookmarked={item.isBookmarked}
      />
    );
  };

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
        {!loading && surahList !== null && juzList !== null ? (
          active === "Surah" ? (
            <FlatList
              style={{ flex: 1 }}
              data={surahList}
              renderItem={renderSurahItem}
              keyExtractor={(item, key) => `${key}`}
            />
          ) : active === "Juz" ? (
            <FlatList
              style={{ flex: 1 }}
              data={juzList}
              renderItem={renderJuzItem}
              keyExtractor={(item, key) => `${key}`}
            />
          ) : active === "Bookmarks" ? (
            <FlatList
              style={{ flex: 1 }}
              data={bookmarks}
              renderItem={renderBookmarks}
              keyExtractor={(item, key) => `${key}`}
            />
          ) : (
            ""
          )
        ) : (
          <Loading />
        )}
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
    fontSize: 16,
    color: Colors.text1,
  },
});
