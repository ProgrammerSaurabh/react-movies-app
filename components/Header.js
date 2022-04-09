import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
} from "react-native";

function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("recommended-movies")}
      >
        <Text style={{ color: "white", fontSize: 20 }}>E Cube</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("search")}>
        <View>
          <Image
            source={require("../assets/search.png")}
            style={{ height: 25, width: 25 }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "black",
  },
});

export default Header;
