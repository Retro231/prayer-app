import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import dataJson from "@/assets/data/data.json";
import { Colors } from "@/constants/Colors";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Loading from "@/components/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/rtk/store";
type Props = {};

const HalalRestaurant = (props: Props) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const location = useSelector((state: RootState) => state.app.location);

  const openGoogleMaps = (placeName: string, address: string | null) => {
    const query = `${placeName} ${address}`;

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`;
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  // async function fetchMosques() {
  //   try {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         Authorization: "",
  //       },
  //     };
  //     console.log(address);

  //     // const response = await fetch(
  //     //   `https://api.foursquare.com/v3/places/search?query=mosque&near=${address?.city}`,
  //     //   options
  //     // );
  //     const response = await fetch(
  //       `https://api.foursquare.com/v3/places/search?near=London&categories=13191`,
  //       options
  //     );

  //     if (!response.ok) {
  //       setLoading(false);
  //     }

  //     const data = await response.json();
  //     console.log(data);

  //     setData(data.results);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  useEffect(() => {
    if (location === null) {
      setLoading(true);
    }
    if (location !== null) {
      (async () => {
        // await fetchMosques();
        setData(dataJson.results);
        setLoading(false);
      })();
    }
  }, [location]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header title={"Halal Restaurant"} goBack />

      {loading ? (
        <Loading />
      ) : data ? (
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: Colors.darkSea,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  margin: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 15,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Ionicons size={24} name="fast-food" color={Colors.text2} />
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: Colors.text2,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "light",
                        color: Colors.text2,
                      }}
                    >
                      Distance: {(item.distance / 1000).toFixed(2)} km
                    </Text>
                  </View>
                </View>
                {location !== null && (
                  <TouchableOpacity
                    onPress={() => openGoogleMaps(item.name, location)}
                  >
                    <FontAwesome5
                      size={18}
                      name="location-arrow"
                      color={Colors.text2}
                    />
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
          keyExtractor={(item, index) => `${index}`}
          ListFooterComponent={() => (
            <Text style={{ textAlign: "center", padding: 10, color: "gray" }}>
              Information collected from Foursquare.
            </Text>
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: Colors.lightSea,
            }}
          >
            No data available.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HalalRestaurant;

const styles = StyleSheet.create({});
