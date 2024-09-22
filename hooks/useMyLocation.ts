import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

interface Address {
  street: string | null;
  city: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
}

const useMyLocation = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
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
      } catch (error) {
        setErrorMsg(error);
      }
    })();
  }, []);

  return { address, errorMsg };
};

export default useMyLocation;
