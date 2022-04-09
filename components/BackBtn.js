import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const BackBtn = () => {
  const navigation = useNavigation();

  return navigation.canGoBack() ? (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.backBtn}>
        <Text style={{ color: "white", fontSize: 14 }}>Go Back</Text>
      </View>
    </TouchableWithoutFeedback>
  ) : null;
};

const styles = StyleSheet.create({
  backBtn: {
    padding: 7,
    backgroundColor: "#6C757D",
    color: "white",
    borderRadius: 5,
    margin: 5,
    marginTop: 0,
    width: 75,
  },
});

export default BackBtn;
