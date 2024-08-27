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
import { getJuz, getJuzData, getSurahList } from "@/scripts/getQuranData";
import Loading from "@/components/Loading";
import { useSQLiteContext } from "expo-sqlite";

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
  verses_count: number;
  verse_mapping: object;
}

interface Bookmarks {
  id: number;
  title: string;
  data: {
    surah_number: number;
    name: string;
    englishName: string;
    numberOfAyahs: number;
    englishNameTranslation: string;
    juz_number: number;
  };
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
  const [surahList, setSurahList] = useState(null);
  const [juzList, setJuzList] = useState<JuzItem[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmarks[] | null | []>(null);

  const bookmarkRef = useRef<any>();

  const db = useSQLiteContext();

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const list = await getSurahList();
      const juzs = await getJuz();
      setJuzList(juzs);
      setSurahList(list);
    })();

    db.withTransactionAsync(async () => {
      await initDB();
      await getBookmarks();
    });
  }, []);

  // initialize database
  const initDB = async () => {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS Bookmarks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title INTEGER NOT NULL,
          data TEXT
        );`);
  };
  // get bookmarks array
  const getBookmarks = async () => {
    const result = await db.getAllAsync<Bookmarks[]>(
      `SELECT * FROM Bookmarks ORDER BY id DESC;`
    );

    // Parse the JSON string in the 'data' field and map the result
    const parsedResult = result.map((item: any) => {
      // Parse the JSON string in the 'data' field
      const parsedData = JSON.parse(item.data);
      // Return a new object with parsed data
      return {
        ...item,
        data: parsedData,
      };
    });
    setBookmarks(parsedResult);
    bookmarkRef.current = parsedResult;
    // console.log("result: ", result);
  };

  // -----------flatlist surah item -------------------
  const renderSurahItem = ({ item }: ListRenderItemInfo<JuzItem>) => {
    const handlePress = () => {
      router.push({
        pathname: "(QuranStack)/quran_page",
        params: {
          id: item.number,
          name: item.name,
          englishName: item.englishName,
          numberOfAyahs: item.numberOfAyahs,
          englishNameTranslation: item.englishNameTranslation,
        },
      });
    };

    // INSERT INTO bookmarks (title, url) VALUES (?, ?);
    const handleBookmarkPress = () => {
      db.withTransactionAsync(async () => {
        await insertData();
        await getBookmarks();
      });
    };

    const insertData = async () => {
      const data = {
        surah_number: item.number,
        name: item.name,
        englishName: item.englishName,
        numberOfAyahs: item.numberOfAyahs,
        englishNameTranslation: item.englishNameTranslation,
      };
      const dataString = JSON.stringify(data);
      await db.runAsync(
        "INSERT INTO Bookmarks (title, data) VALUES (?, ?)",
        item.englishName,
        dataString
      );
    };

    return (
      <ListItem
        onPress={() => handlePress()}
        onBookmarkPress={handleBookmarkPress}
        surah_number={item.number}
        name={item.name}
        englishName={item.englishName}
        englishNameTranslation={item.englishNameTranslation}
        bookmarkList={bookmarkRef.current}
      />
    );
  };
  // ---------- flatlist Juz item -------------
  const renderJuzItem = ({ item }: ListRenderItemInfo<JuzItem>) => {
    const verseKeys = Object.keys(item.verse_mapping);
    const margedVerseMapping = `${verseKeys[0]}-${
      verseKeys[verseKeys.length - 1]
    }`;

    const handlePress = () => {
      console.log(item);

      router.push({
        pathname: "(QuranStack)/quran_page",
        params: {
          juz_number: item.juz_number,
        },
      });
    };

    // INSERT INTO bookmarks (title, url) VALUES (?, ?);
    const handleBookmarkPress = () => {
      db.withTransactionAsync(async () => {
        await insertData();
        await getBookmarks();
      });
    };

    const insertData = async () => {
      const data = {
        juz_number: item.juz_number,
        verse_mapping: margedVerseMapping,
      };
      const dataString = JSON.stringify(data);
      await db.runAsync(
        "INSERT INTO Bookmarks (title, data) VALUES (?, ?)",
        `Surah (${margedVerseMapping})`,
        dataString
      );
    };
    return (
      <ListItem
        onPress={() => handlePress()}
        onBookmarkPress={handleBookmarkPress}
        juz_number={item.juz_number}
        verse_mapping={margedVerseMapping}
        bookmarkList={bookmarkRef.current}
      />
    );
  };
  // ----------flatlist bookmarks
  const renderBookmarks = ({ item }: ListRenderItemInfo<Bookmarks>) => {
    // data_id: item.number,
    // name: item.name,
    // englishName: item.englishName,
    // numberOfAyahs: item.numberOfAyahs,
    // englishNameTranslation: item.englishNameTranslation,
    // juz_number: item.juz_number,
    const handlePress = () => {
      router.push({
        pathname: "(QuranStack)/quran_page",
        params: {
          id: item.data.surah_number,
          name: item.data.name,
          englishName: item.data.englishName,
          numberOfAyahs: item.data.numberOfAyahs,
          englishNameTranslation: item.data.englishNameTranslation,
          juz_number: item.data.juz_number,
        },
      });
    };

    // // INSERT INTO bookmarks (title, url) VALUES (?, ?);
    const handleBookmarkPress = () => {
      console.log(item);

      console.log("bookmark press");
    };

    return (
      <ListItem
        onPress={() => handlePress()}
        onBookmarkPress={handleBookmarkPress}
        bookmarkId={item.id}
        bookmarkTitle={item.title}
        bookmarkList={bookmarkRef.current}
        surah_number={item.id}
        juz_number={item.data.juz_number}
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
        {surahList !== null && bookmarks !== null && juzList !== null ? (
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
