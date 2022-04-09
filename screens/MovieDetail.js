import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loading, loadMovie } from "../store/actions/movies.actions";
import {
  loading as bookingLoading,
  storeBooking,
} from "../store/actions/bookings.actions";
import Loader from "../components/Loader";

import DateTimePicker from "@react-native-community/datetimepicker";

import moment from "moment";
import BackBtn from "../components/BackBtn";
import { useIsFocused } from "@react-navigation/native";

const MovieDetail = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const {
    movie,
    loading: loading_,
    error,
  } = useSelector((state) => state.movies);
  const { loading: bookingLoading_ } = useSelector((state) => state.bookings);

  const { params } = route;
  const { movie: movieId } = params;

  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [users, setUsers] = useState(1);
  const [open, setOpen] = useState(false);

  const price_ = typeof movie?.prices !== "object" ? movie?.prices : 0;

  const date_ =
    movie?.type == "event"
      ? moment(movie?.date, "DD MMMM YYYY").format("YYYY-MM-DD")
      : moment
          .max(moment(), moment(movie?.release_date, "DD MMMM YYYY"))
          .format("YYYY-MM-DD");

  useEffect(() => {
    if (price_ > 0) {
      setPrice(price_);
    }
  }, [price_]);

  useEffect(() => {
    if (date_) {
      setDate(new Date(date_));
    }
  }, [date_]);

  useEffect(() => {
    if (movieId && isFocused) {
      dispatch(loading());
      dispatch(loadMovie(movieId));
    }
  }, [movieId, isFocused]);

  const bookingHandler = () => {
    let errors = [];

    if (price === 0) {
      errors.push("Please select type");
    }

    if (users < 1) {
      errors.push("Please select atleast one person");
    }

    if (date.length === 0) {
      errors.push("Please select date");
    }

    if (moment(date).isBefore(date_)) {
      errors.push("Please select a valid date");
    }

    if (errors.length > 0) {
      return Alert.alert("Error", errors.join(", "));
    }

    dispatch(bookingLoading());
    dispatch(
      storeBooking({
        data: { movieId, price, users, date, total: price * users },
        onSuccess: (booking) => {
          setPrice(0);
          setDate(new Date());
          Alert.alert("Success", "Booking added successfully");
          navigation.navigate(`booking-detail`, {
            booking,
          });
        },
      })
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "#eee", marginVertical: 5 }}>
      <BackBtn />
      {loading_ ? (
        <Loader text="Loading movie details..." />
      ) : error ? (
        <Text style={styles.mutedText}>Error</Text>
      ) : (
        movie && (
          <View>
            <View style={{ height: 300 }}>
              <ImageBackground
                source={{ uri: movie?.image }}
                style={{ flex: 1, justifyContent: "flex-end" }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                paddingVertical: 25,
              }}
            >
              <Text style={styles.movieTitle}>{movie?.title}</Text>
              <Text
                style={{
                  paddingVertical: 5,
                  fontSize: 16,
                  textAlign: "justify",
                }}
              >
                {movie?.plot}
              </Text>
              <Text>
                <Text style={styles.italic}>Genre: </Text>
                <Text style={styles.content}>{movie?.genre}</Text>
              </Text>
              {movie?.director && (
                <Text>
                  <Text style={styles.italic}>Director: </Text>
                  <Text style={styles.content}>{movie?.director}</Text>
                </Text>
              )}
              {movie?.date && (
                <Text>
                  <Text style={styles.italic}>Date: </Text>
                  <Text style={styles.content}>{movie?.date}</Text>
                </Text>
              )}
              {movie?.duration && (
                <Text>
                  <Text style={styles.italic}>Duration: </Text>
                  <Text style={styles.content}>{movie?.duration}</Text>
                </Text>
              )}
              {movie?.release_date && (
                <Text>
                  <Text style={styles.italic}>Release date: </Text>
                  <Text style={styles.content}>{movie?.release_date}</Text>
                </Text>
              )}
              {movie?.ratings && (
                <Text>
                  <Text style={styles.italic}>Ratings: </Text>
                  <Text style={styles.content}>{movie?.ratings} / 5</Text>
                </Text>
              )}
              <Text>
                <Text style={styles.italic}>Stars: </Text>
                <Text style={styles.content}>{movie?.stars}</Text>
              </Text>
              {typeof movie?.prices === "object" ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginVertical: 5,
                    flexWrap: "wrap",
                  }}
                >
                  {Object.keys(movie?.prices).map((type) => (
                    <TouchableWithoutFeedback
                      key={`movie-price-${type}`}
                      onPress={() => {
                        if (!bookingLoading_) {
                          setPrice(movie?.prices[type]);
                        }
                      }}
                    >
                      <Text
                        style={{
                          ...styles.movie__price,
                          backgroundColor:
                            movie?.prices[type] == price
                              ? "#0D6EFD"
                              : "transparent",
                          color:
                            movie?.prices[type] == price ? "white" : "black",
                        }}
                      >
                        {type}
                        <Text> for {movie?.currency}</Text>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "100",
                          }}
                        >
                          {movie?.prices[type]}
                        </Text>
                      </Text>
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              ) : (
                <Text
                  style={{
                    paddingVertical: 5,
                  }}
                >
                  <Text style={styles.italic}>Price: </Text>
                  <Text>{movie?.currency}</Text>
                  <Text style={{ fontSize: 20, fontWeight: "100" }}>
                    {movie?.prices}
                  </Text>
                </Text>
              )}
              <View style={{ display: "flex", flexDirection: "column" }}>
                <TouchableWithoutFeedback
                  onPress={() => setOpen((prev) => !prev)}
                >
                  <View
                    style={{
                      ...styles.movie__price,
                      backgroundColor: "#0D6EFD",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      paddingVertical: 10,
                    }}
                  >
                    <Text style={{ ...styles.italic, color: "white" }}>
                      Booking date:{" "}
                    </Text>
                    <Text
                      style={{
                        ...styles.content,
                        color: "white",
                        fontSize: 16,
                      }}
                    >
                      {moment(date).format("ddd, Do MMMM, YYYY")}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                {open && (
                  <DateTimePicker
                    mode="date"
                    value={date}
                    onChange={(e, value) => {
                      if (value) {
                        setDate(value);
                      }
                    }}
                    minimumDate={new Date(date_)}
                    disabled={bookingLoading_ || movie?.type == "event"}
                    placeholderText="Booking date"
                  />
                )}
                <View
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                    marginHorizontal: 5,
                    marginVertical: 10,
                  }}
                >
                  <Text style={{ fontStyle: "italic" }}>
                    Number of persons:{" "}
                  </Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      onChangeText={setUsers}
                      value={users.toString()}
                      placeholder="Number of persons"
                      keyboardType="numeric"
                      style={{ fontSize: 18 }}
                    />
                  </View>
                </View>
                <TouchableWithoutFeedback onPress={() => bookingHandler()}>
                  <View style={styles.movieCardBtn}>
                    <Text style={{ color: "white", fontSize: 18 }}>Book</Text>
                    <Text>
                      {price * users > 0 ? (
                        <>
                          <Text style={{ color: "white" }}>
                            {" "}
                            for {movie.currency}
                          </Text>
                          <Text style={{ fontSize: 18, color: "white" }}>
                            {price * users}
                          </Text>
                        </>
                      ) : null}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mutedText: {
    fontSize: 14,
    textAlign: "center",
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 5,
    textAlign: "center",
    color: "#0091F7",
  },
  italic: {
    fontSize: 13,
    fontStyle: "italic",
    fontWeight: "100",
  },
  content: {
    fontSize: 14,
  },
  movie__price: {
    minWidth: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#eee",
    textTransform: "capitalize",
    margin: 2,
  },
  inputContainer: {
    borderColor: "#eee",
    borderWidth: 2,
    backgroundColor: "#fff",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 5,
    flex: 1,
  },
  movieCardBtn: {
    padding: 10,
    paddingVertical: 15,
    backgroundColor: "#3590f3",
    borderRadius: 7,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});

export default MovieDetail;
