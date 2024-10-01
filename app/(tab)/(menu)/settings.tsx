import Header from "@/components/header/Header";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/rtk/store";
import { setDefalutLocation, setLocation } from "@/rtk/slices/appSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getCurrentLocation from "@/scripts/getCurrentLocation";
const Settings = () => {
  const [is24HourFormat, setIs24HourFormat] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const { location, defaultLocation } = useSelector(
    (state: RootState) => state.app
  );
  const dispatch = useDispatch();
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] =
    useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("location");

      if (value === null) {
        dispatch(setLocation(defaultLocation ?? ""));
      }
      if (value !== null) {
        // value previously stored
        dispatch(setLocation(value));
      }
    } catch (e) {
      // error reading value
    }
  };

  const storeLocation = async (value: string) => {
    try {
      await AsyncStorage.setItem("location", value);
    } catch (e) {
      console.log(e);
    }
  };

  const currentLocation = async () => {
    const location = await getCurrentLocation();
    dispatch(setDefalutLocation(`${location?.city},${location?.country}`));
    dispatch(setLocation(`${location?.city},${location?.country}`));
  };

  useEffect(() => {
    storeLocation(selectedLocation);
  }, [selectedLocation]);

  const togglePushNotificationSwitch = async () => {
    setIsPushNotificationEnabled(!isPushNotificationEnabled);
  };

  const handleChangeLocation = () => {
    setLocationModalVisible(!locationModalVisible);
  };

  const toggleHourFormatSwitch = () =>
    setIs24HourFormat((previousState) => !previousState);

  return (
    <SafeAreaView>
      <Header title={"Settings"} goBack />
      <View style={styles.container}>
        {/* Notification Toggle */}
        <View style={styles.settingRow}>
          <Text style={styles.label}>Push Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#017777" }}
            thumbColor={isPushNotificationEnabled ? "#ffffff" : "#f4f3f4"}
            onValueChange={togglePushNotificationSwitch}
            value={isPushNotificationEnabled}
          />
        </View>

        {/* 12/24 Hour Format Toggle */}
        <View style={styles.settingRow}>
          <Text style={styles.label}>24-Hour Format</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#017777" }}
            thumbColor={is24HourFormat ? "#ffffff" : "#f4f3f4"}
            onValueChange={toggleHourFormatSwitch}
            value={is24HourFormat}
          />
        </View>

        {/* Change Location (Minimal) */}
        <View style={styles.settingRow}>
          <View
            style={{
              width: "60%",
            }}
          >
            <Text style={[styles.label]}>Location : </Text>
            <Text style={[styles.label]}>{location}</Text>
          </View>
          <TouchableOpacity onPress={handleChangeLocation}>
            <Text style={styles.locationText}>Change</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={locationModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setLocationModalVisible(!locationModalVisible);
          }}
        >
          <View
            style={{
              // backgroundColor: "#0000003d",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderRadius: 10,
                gap: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.darkSea,
                  padding: 10,
                  borderRadius: 2,
                }}
                onPress={() => {
                  currentLocation();
                  setLocationModalVisible(!locationModalVisible);
                }}
              >
                <Text
                  style={{
                    color: Colors.text2,
                    fontWeight: "bold",
                  }}
                >
                  Select Default Location
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.text1,
                  fontWeight: "bold",
                }}
              >
                Or
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                }}
              >
                <GooglePlacesAutocomplete
                  styles={{
                    textInput: {
                      borderWidth: 1,
                      borderColor: Colors.darkSea,
                    },
                  }}
                  placeholder="Search location"
                  onPress={(data) => {
                    // 'details' is provided when fetchDetails = true
                    setSelectedLocation(data.description);
                  }}
                  query={{
                    key: "",
                    language: "en",
                  }}
                  fetchDetails={false}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "80%",
                }}
              >
                <View
                  style={{
                    gap: 10,
                    flexDirection: "row",
                  }}
                >
                  <Button
                    onPress={() => {
                      dispatch(setLocation(selectedLocation));
                      setLocationModalVisible(!locationModalVisible);
                    }}
                    title="Save"
                  />
                  <Button
                    title="Cancel"
                    color={"red"}
                    onPress={() =>
                      setLocationModalVisible(!locationModalVisible)
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* System Settings */}
        <View>
          <TouchableOpacity
            onPress={() => Linking.openSettings()}
            style={styles.settingRow}
          >
            <Text style={styles.label}>System Settings</Text>
            <Ionicons name="chevron-forward" size={24} color={Colors.darkSea} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Settings;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#017777",
    marginBottom: 30,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    gap: 60,
  },
  label: {
    fontSize: 18,
    color: "#017777",
  },
  locationText: {
    fontSize: 18,
    color: "#017777",
    textDecorationLine: "underline", // Minimal visual hint that it's clickable
  },
});
