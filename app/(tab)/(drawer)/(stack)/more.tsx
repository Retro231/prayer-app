import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const More = () => {
  return (
    <View>
      <Text>more</Text>
      <Link href={"/notFound"}>Not found</Link>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({});
