import React from "react";
import { Text, StyleSheet } from "react-native";

function Loader({ text = "Loading..." }) {
  return <Text style={styles.mutedText}>{text}</Text>;
}

const styles = StyleSheet.create({
  mutedText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default Loader;
