import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import WebView from "react-native-webview";

const Live_madina = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header title={"Live Makkah"} goBack />
        <WebView
          originWhitelist={["*"]}
          source={{
            uri: "https://www.youtube.com/embed/NfEglaLYDwc?si=KuhCBCkP05Rm8maw",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Live_madina;

const styles = StyleSheet.create({});
