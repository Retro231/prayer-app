import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const CompassScreen = () => {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Click me" />
    </View>
  );
};

export default CompassScreen;

const styles = StyleSheet.create({});
