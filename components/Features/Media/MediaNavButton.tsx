import { Image, ImageProps, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface proptypes {
  imageUri: any;
  title: string;
  url: string;
}
const MediaNavButton: React.FC<proptypes> = ({ imageUri, title, url }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.lightSea,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: "center",
      }}
      activeOpacity={0.7}
      onPress={() => {
        router.navigate(url);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        {imageUri && (
          <Image
            style={{
              borderRadius: 15,
            }}
            source={imageUri}
            width={120}
            height={80}
          />
        )}
        <Text
          style={{
            fontSize: 16,
            fontFamily: "MontserratBold",
            fontWeight: "bold",
            color: Colors.text2,
          }}
        >
          {title}
        </Text>
      </View>
      <Ionicons name="arrow-forward-circle" size={32} color={"white"} />
    </TouchableOpacity>
  );
};

export default MediaNavButton;

const styles = StyleSheet.create({});
