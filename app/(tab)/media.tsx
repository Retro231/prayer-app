import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Media = () => {
  return (
    <SafeAreaView>
      <Text>media</Text>
      <Link href={"/more"}>Go to More</Link>
    </SafeAreaView>
  );
};

export default Media;

const styles = StyleSheet.create({});
