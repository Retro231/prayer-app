import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";

interface Address {
  street: string | null;
  city: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
}

const MyLocation = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setAddress(address[0]);
    })();
  }, []);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <StatusBar backgroundColor="#fff" />
      <Ionicons name="location" size={24} color={"red"} />
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      {address ? (
        <Text
          style={{
            color: Colors.green,
            fontWeight: "semibold",
            fontFamily: "MontserratSemiBold",
            fontSize: 14,
          }}
        >
          {" "}
          {address.city},{address.country}
        </Text>
      ) : (
        <Text
          style={{
            color: Colors.green,
            fontWeight: "semibold",
            fontFamily: "MontserratSemiBold",
            fontSize: 14,
          }}
        >
          Fetching address...
        </Text>
      )}
    </View>
  );
};

export default MyLocation;

const styles = StyleSheet.create({});
