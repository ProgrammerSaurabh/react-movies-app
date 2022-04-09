import React from "react";

import { View } from "react-native";
import Movie from "./Movie";

function Movies({ movies = [] }) {
  return (
    <View>
      {movies.map((movie) => (
        <Movie key={`movie-${movie.id}`} movie={movie} />
      ))}
    </View>
  );
}

export default Movies;
