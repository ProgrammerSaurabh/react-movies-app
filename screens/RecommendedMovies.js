import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Movies from "../components/Movies";
import SubHeader from "../components/SubHeader";

import { loading, loadMovies } from "../store/actions/movies.actions";

function RecommendedMovies() {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const {
    movies,
    loading: loading_,
    error,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    if (isFocused) {
      dispatch(loading());
      dispatch(loadMovies());
    }
  }, [dispatch, isFocused]);

  return (
    <>
      <SubHeader />
      <ScrollView style={{ margin: 10 }}>
        <Text style={styles.headerText}>
          Recommended Movies (
          {movies.filter((movie) => movie.type === "recommended").length})
        </Text>
        <View style={styles.divider} />
        {loading_ ? (
          <Loader text="Loading recommended movies..." />
        ) : error ? (
          <Text style={styles.mutedText}>Error</Text>
        ) : movies.filter((movie) => movie.type === "recommended").length >
          0 ? (
          <Movies
            movies={movies.filter((movie) => movie.type === "recommended")}
          />
        ) : (
          <Text style={styles.mutedText}>No recommended movies</Text>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: "#aaa",
    marginVertical: 10,
  },
  headerText: {
    fontSize: 16,
    padding: 5,
  },
  mutedText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default RecommendedMovies;
