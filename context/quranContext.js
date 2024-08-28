import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  memo,
} from "react";
import * as SQLite from "expo-sqlite";
import { getJuz, getSurahList } from "@/scripts/getQuranData";
import { isLoaded } from "expo-font";

const QuranContext = createContext();

export const QuranContextProvider = ({ children }) => {
  const db = SQLite.useSQLiteContext();
  const [chapters, setChapters] = useState(null);
  const [surahList, setSurahList] = useState(null);
  const [juzList, setJuzList] = useState(null);
  const [bookmarks, setBookmarks] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load chapters from the database when the component mounts
  db.withTransactionAsync(async () => {
    try {
      await initDB();
      const rows = await db.getFirstAsync("SELECT COUNT(*) FROM Chapters");
      console.log("Count:", rows["COUNT(*)"]);

      if (rows["COUNT(*)"] == 0) {
        await insertSurah();
        const juz = await insertJuz();
        if (juz) {
          console.log(juz);

          setIsLoaded(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (isLoaded) {
      (async () => {
        const { chapters, surahList, juzList } = await fatchChapters();
        setChapters(chapters);
        setSurahList(surahList);
        setJuzList(juzList);
      })();
    }
  }, [isLoaded]);

  // initialize database
  const initDB = async () => {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS Chapters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        surah_number INTEGER DEFAULT NULL,
        surah_name TEXT DEFAULT NULL,
        surah_englishName TEXT DEFAULT NULL,
        surah_englishNameTranslation TEXT DEFAULT NULL,
        surah_numberOfAyahs INTEGER DEFAULT NULL,
        juz_number INTEGER DEFAULT NULL,
        juz_verse_mapping TEXT DEFAULT NULL,
        juz_first_verse_id INTEGER DEFAULT NULL,
        juz_last_verse_id INTEGER DEFAULT NULL,
        juz_verses_count INTEGER DEFAULT NULL,
        isBookmarked INTEGER DEFAULT 0
      );`);
  };

  const insertSurah = async () => {
    const surahList = await getSurahList();
    surahList.forEach(async (item) => {
      await db.runAsync(
        "INSERT INTO Chapters (surah_number,surah_name,surah_englishName,surah_englishNameTranslation,surah_numberOfAyahs ) VALUES (?, ?, ?, ?, ?)",
        item.number,
        item.name,
        item.englishName,
        item.englishNameTranslation,
        item.numberOfAyahs
      );
    });
  };

  const insertJuz = async () => {
    const juzList = await getJuz();
    juzList.forEach(async (item) => {
      await db.runAsync(
        "INSERT INTO Chapters (juz_number,juz_verse_mapping,juz_first_verse_id,juz_last_verse_id,juz_verses_count) VALUES (?, ?, ?, ?, ?)",
        item.juz_number,
        item.verse_mapping,
        item.first_verse_id,
        item.last_verse_id,
        item.verses_count
      );
    });

    return 0;
  };

  const fatchChapters = async () => {
    const result = await db.getAllAsync(`SELECT * FROM Chapters;`);

    // Parse the JSON string in the 'data' field and map the result
    const chapters = result.map((item) => {
      return {
        ...item,
      };
    });

    // filter surah list
    const surahDB = await db.getAllAsync(`SELECT *
      FROM Chapters
      WHERE surah_number IS NOT NULL;`);

    const surahList = surahDB.map((item) => {
      return {
        ...item,
      };
    });

    // filter juz
    const juzDB = await db.getAllAsync(`SELECT *
      FROM Chapters
      WHERE juz_number IS NOT NULL;`);

    const juzList = juzDB.map((item) => {
      return {
        ...item,
      };
    });

    return { chapters, surahList, juzList };
  };

  const addBookmark = (url) => {
    // add bookmark property to to specific item using id
  };

  const removeBookmark = (id) => {
    // remove bookmark property to to specific item using id
  };

  return (
    <QuranContext.Provider
      value={{
        chapters,
        surahList,
        juzList,
        bookmarks,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </QuranContext.Provider>
  );
};

export const useQuranInfo = () => useContext(QuranContext);
