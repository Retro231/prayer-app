import * as SQLite from "expo-sqlite";

// initialize db with tables
const initializeDB = async () => {
  const db = await SQLite.openDatabaseAsync("tasbih.db");
  try {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS Tasbih (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT DEFAULT NULL,
      count INTEGER DEFAULT NULL
    );`);
  } catch (error) {
    console.log(error);
  }
};

const insertTasbih = async (item) => {
  try {
    const db = await SQLite.openDatabaseAsync("tasbih.db");
    await db.runAsync(
      "INSERT INTO Tasbih (name,count) VALUES (?, ?)",
      item.name,
      item.count
    );
  } catch (error) {
    console.log(error);
  }
};
const getAllTasbih = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("tasbih.db");

    // filter surah list
    const allRows = await db.getAllAsync(`SELECT *
    FROM Tasbih;`);

    const allTasbih = allRows.map((item) => {
      return {
        ...item,
      };
    });

    console.log(allTasbih);

    return allTasbih;
  } catch (error) {
    console.log(error);
  }
};

const deleteTasbih = async (id) => {
  try {
    const db = await SQLite.openDatabaseAsync("tasbih.db");
    await db.runAsync("DELETE FROM Tasbih WHERE id = ?", id);
  } catch (error) {
    console.log(error);
  }
};

export { initializeDB, insertTasbih, getAllTasbih, deleteTasbih };
