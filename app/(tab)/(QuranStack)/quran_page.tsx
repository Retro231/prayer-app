import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/header/Header";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "@/components/Loading";
import { getAudioAyahs, getJuzData, getTafsir } from "@/scripts/getQuranData";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Colors } from "@/constants/Colors";
import ReactNativeModal from "react-native-modal";
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
  const { id, name, englishName, numberOfAyahs, juz_number } =
    useLocalSearchParams();
  const [audioAyahList, setAudioAyahList] = useState<any>(null);
  const [engAyahList, setEngAyahList] = useState<any>(null);
  const [arTafsirList, setArTafsirList] = useState<any>(null);
  const [tafsirText, setTafsirText] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const soundRef = useRef<any>(null);
  const [firstPlay, setFirstPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // all player related --------------------------------------

  // steps-
  // 1. make a sound intence-
  // 2. handle playlist and play one by one
  // 3. handle play pause
  // 4. handle forword backword

  // handle play sound
  const playSound = async () => {
    if (!firstPlay) {
      setFirstPlay(true); //set first play
    }

    if (soundRef.current) {
      await soundRef.current.unloadAsync(); // Unload previous sound
    }

    if (audioAyahList) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioAyahList[currentTrackIndex].audio },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      soundRef.current = newSound; // Store the sound in the ref

      // setSound(newSound);
      setIsPlaying(true);
    }
  };

  // give playback status
  const onPlaybackStatusUpdate = (status: any) => {
    setLoading(status.isLoaded);
    if (status.didJustFinish) {
      playNextTrack();
    }
  };

  // play next track automatically
  const playNextTrack = async () => {
    if (currentTrackIndex < audioAyahList.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setIsPlaying(false); // Stop playing when all tracks are finished
    }
  };

  // called when currentTrackIndex change
  useEffect(() => {
    if (currentTrackIndex > -1) {
      if (firstPlay) {
        playSound();
      }
    }
  }, [currentTrackIndex]);

  // handle screen unfocused and remove sound from bg
  useFocusEffect(
    useCallback(() => {
      // When the screen is focused,
      return async () => {
        try {
          if (soundRef.current !== null) {
            soundRef.current.stopAsync();
          }
        } catch (error) {
          console.error("Error stopping the sound:", error);
        }
      };
    }, [])
  );

  const handlePlayPause = async () => {
    if (soundRef.current === null) {
      playSound();
    } else {
      const status: any = await soundRef.current.getStatusAsync();
      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };
  const handleSingleAyahPlayPause = (id: number) => {
    if (currentTrackIndex === id - 1) {
      handlePlayPause();
    }
    setCurrentTrackIndex(id - 1);
    setFirstPlay(true);
  };
  const handlePlayerBackword = () => {
    setCurrentTrackIndex(currentTrackIndex - 1);
    setFirstPlay(true);
  };
  const handlePlayerForword = () => {
    setCurrentTrackIndex(currentTrackIndex + 1);
    setFirstPlay(true);
  };

  // UI controller -------------------------------------

  const handleTafsir = (ayahInSurah?: any) => {
    setTafsirText(arTafsirList[ayahInSurah].text);
    setIsModalVisible(true);
  };

  // getting data from api -----------------------------------------------
  useEffect(() => {
    (async () => {
      const arTafsir = await getTafsir(id);
      setArTafsirList(arTafsir.ayahs);

      if (juz_number) {
        const juzData = await getJuzData(juz_number);

        setAudioAyahList(juzData[0].ayahs);
        setEngAyahList(juzData[1].ayahs);
      } else {
        const audioAyah = await getAudioAyahs(id);
        setAudioAyahList(audioAyah[0].ayahs);
        setEngAyahList(audioAyah[1].ayahs);
      }
    })();
  }, []);

  const renderAyahItem = ({ item, index }: ListRenderItemInfo<any>) => (
    <MyListItem item={item} index={index} />
  );
  const MyListItem = React.memo(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <View style={styles.ayahContainer}>
          <View
            style={{
              borderWidth: 1,
              padding: 2,
              borderStyle: "dotted",
              borderRadius: 10,
            }}
          >
            <Text style={styles.ayahArabic}>{item.text}</Text>
            <Text style={styles.ayahEnglish}>
              {juz_number
                ? `${engAyahList[index]?.text}`
                : `${engAyahList[item.numberInSurah - 1]?.text}`}
            </Text>
          </View>

          <View style={styles.ayahAction}>
            <Text style={styles.pageCount}>
              {!juz_number
                ? `${item.numberInSurah} : ${numberOfAyahs}`
                : `${item.number}`}
            </Text>
            <TouchableOpacity
              onPress={() => handleTafsir(item.numberInSurah - 1)}
            >
              <Ionicons
                style={styles.ayahIcons}
                name="document-text"
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSingleAyahPlayPause(item.numberInSurah);
              }}
            >
              <Ionicons
                style={styles.ayahIcons}
                name={`${
                  currentTrackIndex === item.numberInSurah - 1 && isPlaying
                    ? "pause"
                    : "play"
                }`}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons style={styles.ayahIcons} name="bookmark" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#ffffff",
      }}
    >
      {/* -----------------header-------------------- */}
      <Header
        title={juz_number ? `Juz : ${juz_number}` : `${englishName} | ${name}`}
        goBack
      />
      {/* -----------------single ayah-------------------- */}

      {audioAyahList !== null &&
      engAyahList !== null &&
      arTafsirList !== null ? (
        <FlatList
          data={audioAyahList}
          keyExtractor={(item: any, index: any) => `${index}`}
          renderItem={renderAyahItem}
          ListFooterComponent={
            <View
              style={{
                height: 70,
                backgroundColor: "#ffffff",
              }}
            ></View>
          }
        />
      ) : (
        <Loading />
      )}
      {/* -----------------player-------------------- */}

      <View style={styles.playerContainer}>
        <Ionicons
          style={styles.playerBackwordforword}
          size={24}
          name="play-skip-back-outline"
          onPress={handlePlayerBackword}
        />
        {!loading && firstPlay ? (
          <View
            style={[
              styles.playerBackwordforword,
              {
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <ActivityIndicator size={24} />
          </View>
        ) : (
          <Ionicons
            style={[
              styles.playerBackwordforword,
              {
                borderRadius: 5,
              },
            ]}
            name={isPlaying ? "pause" : "play-outline"}
            size={24}
            onPress={handlePlayPause}
          />
        )}

        <Ionicons
          style={styles.playerBackwordforword}
          name="play-skip-forward-outline"
          size={24}
          onPress={handlePlayerForword}
        />
      </View>

      {/* tafsir modal */}
      <ReactNativeModal
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            <View>
              <Text style={styles.modalTitle}>Tafsir:</Text>
              {tafsirText !== null ? (
                <Text style={styles.modalTafsir}>
                  {tafsirText !== null && tafsirText}
                </Text>
              ) : (
                <Loading />
              )}
            </View>
            <View style={styles.modalCloseContainer}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalClose}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default QuranPage;

const styles = StyleSheet.create({
  playerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    padding: 10,
    backgroundColor: Colors.lightSea,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    marginHorizontal: 50,
    marginBottom: 10,
  },
  playerBackwordforword: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 50,
  },
  playerPlayPause: {
    width: 25,
    height: 25,
    backgroundColor: "white",
    padding: 5,
  },
  ayahContainer: {
    flex: 1,
    backgroundColor: "#DAF9FF",
    // borderBottomColor: "#000",
    // borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  ayahArabic: {
    fontSize: 28,
    color: "#000",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  ayahEnglish: {
    fontFamily: "MontserratMedium",
    fontWeight: "medium",
    fontSize: 16,
    margin: 10,
  },
  ayahAction: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  ayahIcons: {
    color: "#373737",
    padding: 3,
    borderRadius: 15,
    fontSize: 26,
  },
  pageCount: {
    fontFamily: "MontserratSemiBold",
    fontWeight: "semibold",
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: "#DAF9FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontFamily: "MontserratSemiBold",
    fontWeight: "semibold",
    fontSize: 18,
    textAlign: "center",
    textTransform: "capitalize",
  },
  modalTafsir: {
    fontFamily: "MontserratSemiBold",
    fontWeight: "semibold",
    fontSize: 18,
    textAlign: "center",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderStyle: "dotted",
  },
  modalCloseContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 10,
    marginTop: 0,
    alignItems: "center",
  },
  modalClose: {
    fontFamily: "MontserratSemiBold",
    fontWeight: "semibold",
    backgroundColor: "#373737",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 5,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
