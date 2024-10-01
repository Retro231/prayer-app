import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import { Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

interface tasbihListItemType {
  tasbihName: string;
  tasbihLength: string;
}

const TasbihListItem = ({ tasbihName, tasbihLength }: tasbihListItemType) => {
  const handlePress = () => {
    router.push({
      pathname: "tasbih_counter/",
      params: { tasbihName, tasbihLength },
    });
  };
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: Colors.darkSea,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          fontFamily: "MontserratBold",
          textTransform: "capitalize",
          color: Colors.text2,
        }}
      >
        {tasbihName}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          fontFamily: "MontserratBold",
          textTransform: "capitalize",
          color: Colors.text2,
        }}
      >
        {tasbihLength}
      </Text>
      <FontAwesome name={"trash"} size={24} color={Colors.text2} />
    </TouchableOpacity>
  );
};

const TasbihCounter = () => {
  const [tasbihList, setTasbihList] = useState<tasbihListItemType[]>([
    {
      tasbihName: "abc",
      tasbihLength: "10",
    },
  ]);
  const [tasbihName, setTasbihName] = useState("");
  const [tasbihLength, setTasbihLength] = useState<string>("");

  const handleCreateTasbih = () => {
    if (tasbihName.length !== 0) {
      setTasbihList([
        ...tasbihList,
        {
          tasbihName,
          tasbihLength,
        },
      ]);
      setTasbihName("");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Tasbih Counter"} goBack />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          margin: 10,
        }}
      >
        <TextInput
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 1,
            width: "100%",
            margin: 10,
            borderRadius: 10,
            borderColor: Colors.darkSea,
          }}
          onChangeText={(text) => setTasbihName(text)}
          value={tasbihName}
          placeholder="Name your tasbih"
        />
        <TextInput
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 1,
            width: "100%",
            margin: 10,
            borderRadius: 10,
            borderColor: Colors.darkSea,
          }}
          onChangeText={(text) => setTasbihLength(text)}
          value={tasbihLength}
          keyboardType="numeric"
          placeholder="0"
        />
        <Button
          title="Create New Tasbih"
          onPress={handleCreateTasbih}
          color={Colors.darkSea}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              fontFamily: "MontserratBold",
              textTransform: "capitalize",
            }}
          >
            Name
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              fontFamily: "MontserratBold",
              textTransform: "capitalize",
            }}
          >
            Length
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              fontFamily: "MontserratBold",
              textTransform: "capitalize",
            }}
          >
            Action
          </Text>
        </View>
        <FlatList
          data={tasbihList}
          renderItem={({ item }) => (
            <TasbihListItem
              tasbihLength={item.tasbihLength}
              tasbihName={item.tasbihName}
            />
          )}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    </SafeAreaView>
  );
};

export default TasbihCounter;

const styles = StyleSheet.create({});
