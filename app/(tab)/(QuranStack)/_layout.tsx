import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Suspense, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const loadDatabase = async () => {
  const dbName = "quran.db";
  const dbAsset = require("./../../../assets/quran.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      {
        intermediates: true,
      }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function StackLayout() {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadDatabase()
      .then(() => {
        setDbLoaded(true);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Suspense
      fallback={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Loading></Loading>
        </View>
      }
    >
      <SQLiteProvider databaseName="quran.db" useSuspense>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="al_quran" options={{ headerShown: false }} />
            <Stack.Screen name="quran_page" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </SQLiteProvider>
    </Suspense>
  );
}
