import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import { useLocalSearchParams } from "expo-router";

const TasbihCounter = () => {
  const [counter, setCounter] = useState<number>(0);
  const { tasbihName, tasbihLength } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Tasbih Counter"} goBack />
      <Text style={{ fontSize: 24, marginBottom: 10 }}>
        Tasnih Name: {tasbihName}
      </Text>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>
        Total Count: {tasbihLength}
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, marginBottom: 10 }}>{counter}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button
            title="Click"
            onPress={() => {
              setCounter(counter + 1);
            }}
          />
          <Button
            title="Reset"
            onPress={() => {
              setCounter(0);
            }}
            color={"red"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TasbihCounter;

const styles = StyleSheet.create({});
