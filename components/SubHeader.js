import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";

const SUB_HEADERS = [
  {
    title: "Latest movies",
    route: "latest-movies",
    type: "latest",
  },
  {
    title: "Upcoming movies",
    route: "upcoming-movies",
    type: "upcoming",
  },
  {
    title: "Nearby events",
    route: "nearby-events",
    type: "event",
  },
];

function SubHeader() {
  const route = useRoute();

  const navigation = useNavigation();

  const loadHeaderStyles = (name) => {
    let baseStyle = { ...styles.subHeaderItem };

    if (name == route.name) {
      baseStyle = { ...baseStyle, ...styles.activeHeaderItem };
    }

    return baseStyle;
  };

  return (
    <View style={styles.subHeaderContainer}>
      {SUB_HEADERS.map((header) => (
        <TouchableWithoutFeedback
          key={`sub-header-${header.type}`}
          onPress={() => navigation.navigate(header.route)}
        >
          <View style={{ ...loadHeaderStyles(header.route) }}>
            <Text
              style={{
                color: route.name == header.route ? "white" : "gray",
                fontSize: 12,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {header.title}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  subHeaderContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 5,
  },
  subHeaderItem: {
    paddingVertical: 10,
    borderWidth: 0.5,
    flex: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  activeHeaderItem: {
    backgroundColor: "#0091F7",
  },
});

export default SubHeader;
