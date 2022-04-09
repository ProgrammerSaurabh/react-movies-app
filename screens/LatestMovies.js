import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackBtn from "../components/BackBtn";
import Loader from "../components/Loader";
import Movies from "../components/Movies";
import SubHeader from "../components/SubHeader";

import { loading, loadMovies } from "../store/actions/movies.actions";

function LatestMovies() {
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
        <BackBtn />
        <Text style={styles.headerText}>
          Latest Movies (
          {movies.filter((movie) => movie.type === "latest").length})
        </Text>
        <View style={styles.divider} />
        {loading_ ? (
          <Loader text="Loading latest movies..." />
        ) : error ? (
          <Text style={styles.mutedText}>Error</Text>
        ) : movies.filter((movie) => movie.type === "latest").length > 0 ? (
          <Movies movies={movies.filter((movie) => movie.type === "latest")} />
        ) : (
          <Text style={styles.mutedText}>No latest movies</Text>
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

export default LatestMovies;
