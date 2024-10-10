import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";
import SectionTitle from "@/components/SectionTitle";
const customApi = require("@/assets/data/customApi.json");

type dailyDuaProps = {
  name: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  reference: string;
};

const DailyDua = () => {
  const [dailyDua, setDailyDua] = useState<dailyDuaProps | null>(null); // To store the daily random item
  const duaList = customApi.dua_list;
  // Function to generate a random item based on the current date
  const getDailyRandomItem = async () => {
    const today = new Date();
    const todayString = today.toDateString(); // Format the date as a string

    try {
      // Retrieve stored date and item from AsyncStorage
      const storedDate = await AsyncStorage.getItem("selectedDate");
      const storedItem = await AsyncStorage.getItem("selectedItem");

      // If the date has changed or no date was stored, generate a new item
      if (storedDate !== todayString || !storedItem) {
        const randomIndex = Math.floor(Math.random() * duaList.length);
        const newItem = duaList[randomIndex];

        // Store the new item and today's date in AsyncStorage
        await AsyncStorage.setItem("selectedDate", todayString);
        await AsyncStorage.setItem("selectedItem", JSON.stringify(newItem));

        // Update the state with the new random item
        setDailyDua(newItem);
      } else {
        // If the date hasn't changed, use the stored item
        setDailyDua(JSON.parse(storedItem));
      }
    } catch (error) {
      console.log("Error accessing AsyncStorage:", error);
    }
  };

  useEffect(() => {
    // Generate or retrieve the daily random item when the component mounts
    getDailyRandomItem();
  }, []);

  return (
    <View style={{ marginBottom: 50 }}>
      <SectionTitle title={"Daily Dua"} />
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.lightSea,
          padding: 8,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontWeight: "semibold",
            color: Colors.text1,
            textAlign: "justify",
          }}
        >
          {dailyDua?.name}:
        </Text>
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontWeight: "semibold",
            color: Colors.text1,
          }}
        >
          {dailyDua?.arabic}
        </Text>
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontWeight: "semibold",
            color: Colors.text1,
            textAlign: "justify",
          }}
        >
          {dailyDua?.meaning} - {dailyDua?.reference}
        </Text>
      </View>
    </View>
  );
};

export default DailyDua;
