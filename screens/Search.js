import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BackBtn from "../components/BackBtn";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../store/actions/movies.actions";
import { useIsFocused } from "@react-navigation/native";

const Search = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const searchInputRef = useRef();

  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const { filteredMovies } = useSelector((state) => state.movies);

  useEffect(() => {
    if (isFocused && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    if (search.trim().length >= 1) {
      dispatch(searchMovies(search.trim()));
    }
  }, [search]);

  return (
    <SafeAreaView style={{ margin: 10, flex: 1 }}>
      <BackBtn />
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setSearch}
          value={search}
          placeholder="Search movies or events..."
          autoFocus={true}
          autoComplete={"off"}
          ref={searchInputRef}
        />
      </View>
      {search.length != 0 && filteredMovies.length === 0 ? (
        <Text
          style={{ fontSize: 16, textAlign: "center", paddingVertical: 10 }}
        >
          No movies
        </Text>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingVertical: 10 }}
          scrollToOverflowEnabled
          data={filteredMovies}
          keyExtractor={(movie) => `search-movie-${movie.id}`}
          renderItem={({ item: movie }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  setSearch("");
                  navigation.replace("movie-detail", { movie: movie.id });
                }}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    backgroundColor: "white",
                    marginVertical: 5,
                    padding: 5,
                    borderRadius: 5,
                  }}
                  key={`movie-${movie?.id}`}
                >
                  <Image
                    source={{ uri: movie.image }}
                    style={{
                      height: 75,
                      width: 75,
                      resizeMode: "cover",
                      paddingRight: 5,
                    }}
                  />
                  <View
                    style={{
                      width: 270,
                      marginHorizontal: 5,
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{ paddingVertical: 3, fontSize: 16 }}
                      numberOfLines={2}
                      lineBreakMode="tail"
                    >
                      {movie.title}
                    </Text>
                    <Text style={{ color: "gray" }}>{movie.genre}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        ></FlatList>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 10,
    paddingLeft: 10,
  },
});

export default Search;
