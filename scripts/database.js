import * as SQLite from "expo-sqlite";
import { getJuz, getSurahList } from "@/scripts/getQuranData";

// initialize db with tables
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

    await db.execAsync(`CREATE TABLE IF NOT EXISTS LikedVerses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT DEFAULT NULL,
        englishName TEXT DEFAULT NULL,
        surahNo INTEGER DEFAULT NULL,
        ayahNo INTEGER DEFAULT NULL
      );`);

    await db.execAsync(`CREATE TABLE IF NOT EXISTS RecentRead (
        name TEXT DEFAULT NULL,
        englishName TEXT DEFAULT NULL,
        surahNo INTEGER DEFAULT NULL,
        ayahNo INTEGER DEFAULT NULL
      );`);

    const ChaptersRows = await db.getFirstAsync(
      "SELECT COUNT(*) FROM Chapters"
    );

    if (ChaptersRows["COUNT(*)"] == 0) {
      await insertSurah();
      await insertJuz();
    }
  } catch (error) {
    console.log(error);
  }
};

// Table: Chapters ----------------------------------------

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

// Table: LikedVerses ----------------------------------------

const insertLikedVerse = async (item) => {
  const db = await SQLite.openDatabaseAsync("quran.db");
  await db.runAsync(
    "INSERT INTO LikedVerses (name,englishName,surahNo,ayahNo) VALUES (?, ?, ?, ?)",
    item.name,
    item.englishName,
    item.surahNo,
    item.ayahNo
  );
};

const deleteLikedVerse = async (item) => {
  const db = await SQLite.openDatabaseAsync("quran.db");
  await db.runAsync(
    "DELETE FROM LikedVerses WHERE surahNo = ? AND ayahNo = ? ",
    item.surahNo,
    item.ayahNo
  );
};

const fatchLikedVerses = async () => {
  const db = await SQLite.openDatabaseAsync("quran.db");

  const allRows = await db.getAllAsync(
    `SELECT *
    FROM LikedVerses`,
    1
  );
  const likedVerses = allRows.map((item) => {
    return {
      ...item,
    };
  });
  return likedVerses;
};

// Table: RecentRead ----------------------------------------
const insertRecentlyRead = async (item) => {
  const db = await SQLite.openDatabaseAsync("quran.db");
  await db.runAsync("DELETE FROM RecentRead");
  await db.runAsync(
    "INSERT INTO RecentRead (name,englishName,surahNo,ayahNo) VALUES (?, ?, ?, ?)",
    item.name,
    item.englishName,
    item.surahNo,
    item.ayahNo
  );
};
const fatchRecentlyRead = async () => {
  const db = await SQLite.openDatabaseAsync("quran.db");

  const allRows = await db.getAllAsync(
    `SELECT *
    FROM RecentRead`,
    1
  );
  const recentlyRead = allRows.map((item) => {
    return {
      ...item,
    };
  });
  return recentlyRead;
};
export {
  initializeDB,
  filterChapters,
  filterSurahList,
  filterJuzList,
  filterBookmark,
  toggleBookmark,
  insertLikedVerse,
  deleteLikedVerse,
  fatchLikedVerses,
  insertRecentlyRead,
  fatchRecentlyRead,
};
