import { useNavigation } from "@react-navigation/native";
import React from "react";

import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

function Movie({ movie = {} }) {
  const navigation = useNavigation();

  return (
    <View style={styles.movieCard}>
      <Image source={{ uri: movie?.image }} style={styles.movieCardImg} />
      <Text style={styles.movieCardTitle}>{movie?.title}</Text>
      <Text style={styles.movieCardDesc}>{movie?.stars}</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("movie-detail", { movie: movie.id })}
      >
        <View style={styles.movieCardBtn}>
          <Text style={{ color: "white" }}>Book now</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  movieCard: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 15,
    paddingBottom: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 5,
    shadowColor: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  },
  movieCardImg: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  movieCardTitle: {
    fontSize: 20,
    paddingVertical: 5,
  },
  movieCardDesc: {
    fontSize: 16,
    color: "gray",
  },
  movieCardBtn: {
    padding: 10,
    backgroundColor: "#0091F7",
    width: 100,
    borderRadius: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export default Movie;
