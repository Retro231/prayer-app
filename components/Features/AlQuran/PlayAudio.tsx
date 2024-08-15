import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const PlayAudio = ({ audio }: { audio: string }) => {
  const [isPlaying, setIsplaying] = useState(false);
  const [isLoaing, setIsloaing] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    async function prepareAudio() {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });
    }
    prepareAudio();
  }, []);

  useEffect(() => {
    if (permissionResponse?.status !== "granted") {
      requestPermission();
    }
  }, [permissionResponse]);

  async function pauseSound() {}

  async function playPauseSound() {
    // if no sound , make a sound
    if (sound === null) {
      if (permissionResponse?.status !== "granted") {
        console.log("Permission not granted");
        return;
      }

      setIsloaing(true);
      const { sound: newSound } = await Audio.Sound.createAsync(
        {
          uri: audio ?? "",
        },
        {
          shouldPlay: true,
        },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
    } else {
      // if already playing sound , pause/play sound
      const status: any = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsplaying(false);
      } else {
        await sound.playAsync();
        setIsplaying(true);
      }
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      if (status.didJustFinish) {
        // Handle stop playing logic here
        setIsplaying(false);
      } else if (status.isPlaying) {
        // Handle start playing logic here
        setIsloaing(false);
        setIsplaying(true);
      }
    }
  };

  return (
    <>
      {isLoaing ? (
        <ActivityIndicator size={24} />
      ) : (
        <TouchableOpacity onPress={playPauseSound}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={24} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default PlayAudio;

const styles = StyleSheet.create({});
