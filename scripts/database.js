import * as SQLite from "expo-sqlite";
import { getJuz, getSurahList } from "@/scripts/getQuranData";

const initializeDB = async () => {
  const db = await SQLite.openDatabaseAsync("quran.db");
  try {
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

    const rows = await db.getFirstAsync("SELECT COUNT(*) FROM Chapters");
    console.log("Count:", rows["COUNT(*)"]);

    if (rows["COUNT(*)"] == 0) {
      await insertSurah();
      await insertJuz();
    }
  } catch (error) {
    console.log(error);
  }
};

const insertSurah = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("quran.db");
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
  } catch (error) {
    console.log(error);
  }
};

const insertJuz = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("quran.db");

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
  } catch (error) {
    console.log(error);
  }
};

const filterSurahList = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("quran.db");

    // filter surah list
    const allRows = await db.getAllAsync(`SELECT *
      FROM Chapters
      WHERE surah_number IS NOT NULL;`);

    const surahList = allRows.map((item) => {
      return {
        ...item,
      };
    });

    return surahList;
  } catch (error) {
    console.log(error);
  }
};

const filterJuzList = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("quran.db");

    // filter juz
    const allRows = await db.getAllAsync(`SELECT *
      FROM Chapters
      WHERE juz_number IS NOT NULL;`);

    const juzList = allRows.map((item) => {
      return {
        ...item,
      };
    });

    return juzList;
  } catch (error) {
    console.log(error);
  }
};

const filterChapters = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("quran.db");

    const allRows = await db.getAllAsync(`SELECT * FROM Chapters;`);

    // Parse the JSON string in the 'data' field and map the result
    const chapters = allRows.map((item) => {
      return {
        ...item,
      };
    });
    return chapters;
  } catch (error) {
    console.log(error);
  }
};

const filterBookmark = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("quran.db");
    console.log(db);
    // filter juz
    const allRows = await db.getAllAsync(
      `SELECT *
      FROM Chapters
      WHERE isBookmarked IS (?);`,
      1
    );
    const bookmarkList = allRows.map((item) => {
      return {
        ...item,
      };
    });
    return bookmarkList;
  } catch (error) {
    console.log(error);
  }
};

const toggleBookmark = async (id) => {
  const db = await SQLite.openDatabaseAsync("quran.db");
  try {
    const result = await db.runAsync(
      `UPDATE Chapters
   SET isBookmarked = CASE 
       WHEN isBookmarked = 1 THEN 0
       ELSE 1
   END
   WHERE id = ?`,
      id
    );
  } catch (error) {
    console.log(error);
  }
};

export {
  initializeDB,
  filterChapters,
  filterSurahList,
  filterJuzList,
  filterBookmark,
  toggleBookmark,
};
