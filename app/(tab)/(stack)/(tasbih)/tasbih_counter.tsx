import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

const TasbihCounter = () => {
  const [counter, setCounter] = useState<number>(0);
  const { tasbihName, tasbihLength } = useLocalSearchParams<{
    tasbihName: string;
    tasbihLength: string;
  }>();

  const reset = () => {
    setCounter(0);
  };

  useEffect(() => {
    const tLength = parseInt(tasbihLength ?? "0");
    if (counter === tLength) {
      Alert.alert("Congratulation", "You have completed your Tasbih.", [
        {
          text: "Reset",
          onPress: () => reset(),
          style: "cancel",
        },
        { text: "Again", onPress: () => console.log("OK Pressed") },
      ]);
    }
  }, [counter]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Header title={"Tasbih Counter"} goBack />
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#00000019",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Tasbih Name: {tasbihName}
          </Text>
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Total Count: {tasbihLength}
          </Text>
        </View>
        <View>
          <Button
            title="Reset"
            onPress={() => {
              setCounter(0);
            }}
            color={"red"}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Text style={{ fontSize: 42, marginBottom: 10 }}>{counter}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={() => {
              setCounter(counter + 1);
            }}
            style={{
              height: 200,
              width: 200,
              backgroundColor: Colors.darkSea,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "medium",
                color: Colors.text2,
                textTransform: "capitalize",
              }}
            >
              tap
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TasbihCounter;

const styles = StyleSheet.create({});
