import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import WebView from "react-native-webview";

const Live_makkah = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header title={"Live Makkah"} goBack />
        <WebView
          originWhitelist={["*"]}
          source={{
            uri: "https://www.youtube.com/embed/DajrTfPDd34?si=jDTvRoaCMJShTjJe",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Live_makkah;

const styles = StyleSheet.create({});
