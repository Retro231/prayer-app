import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/header/Header";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "@/components/Loading";
import PlayAudio from "@/components/Features/AlQuran/PlayAudio";
import { MyContext } from "@/context/MyContext";
import { getAudioAyahs } from "@/scripts/getQuranData";
import { Ionicons } from "@expo/vector-icons";
// id: item.number,
// name: item.name,
// englishName: item.englishName,
// englishNameTranslation: item.englishNameTranslation,
// numberOfAyahs:item.numberOfAyahs,
// juz_number: item.juz_number,

// ayas{
//   "number": 1,
//   "text": "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ\n",
//   "numberInSurah": 1,
//   "juz": 1,
//   "manzil": 1,
//   "page": 1,
//   "ruku": 1,
//   "hizbQuarter": 1,
//   "sajda": false
// },

const QuranPage: React.FC = () => {
  const {
    id,
    name,
    englishName,
    englishNameTranslation,
    numberOfAyahs,
    juz_number,
  } = useLocalSearchParams();

  const [audioAyahList, setAudioAyahList] = useState<[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getAudioAyahs(id);
      setAudioAyahList(data);
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, overflow: "hidden" }}>
      <Header
        title={juz_number ? `Juz : ${juz_number}` : `${englishName} | ${name}`}
        goBack
      />

      {audioAyahList !== null ? (
        <FlatList
          data={audioAyahList}
          keyExtractor={(item: any) => item.numberInSurah}
          renderItem={({ item }: { item: any }) => {
            return (
              <View
                style={{
                  flex: 1,
                  // backgroundColor: "#10dbff",
                  backgroundColor: "#D9D9D9",
                  borderBottomColor: "#000",
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 28,
                    color: "#000",
                    paddingTop: 10,
                    paddingHorizontal: 10,
                  }}
                >
                  {item.text}
                </Text>
                <View
                  style={{
                    backgroundColor: "#c0c0c0",
                    flexDirection: "row",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {item.numberInSurah}:{numberOfAyahs}
                    </Text>
                  </View>
                  <PlayAudio audio={item.audio} />
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
};

export default QuranPage;

const styles = StyleSheet.create({});
