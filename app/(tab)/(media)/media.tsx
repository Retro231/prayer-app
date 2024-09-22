import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Header from "@/components/header/Header";
import MediaNavButton from "@/components/Features/Media/MediaNavButton";

const Media = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Media"} />

      <View style={{ padding: 10, gap: 10 }}>
        <MediaNavButton
          imageUri={require("../../../assets/images/islamic_channels.png")}
          title="Islamic IP Tv Channels"
          url="/islamic_iptv"
        />
        <MediaNavButton
          imageUri={require("../../../assets/images/livemakkah.png")}
          title="Live Makkah"
          url="/live_makkah"
        />
        <MediaNavButton
          imageUri={require("../../../assets/images/livemadina.png")}
          title="Live Madina"
          url="/live_madina"
        />
      </View>
    </SafeAreaView>
  );
};

export default Media;

const styles = StyleSheet.create({});
