import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";

const AlQuranScreen = () => {
  return (
    <SafeAreaView>
      <Header title={"Al-Quran"} />
    </SafeAreaView>
  );
};

export default AlQuranScreen;

const styles = StyleSheet.create({});
