import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loading } from "../store/actions/movies.actions";
import Loader from "../components/Loader";
import { loadBooking } from "../store/actions/bookings.actions";

import QRCode from "react-qr-code";

import moment from "moment";

import BackBtn from "../components/BackBtn";
import { useIsFocused } from "@react-navigation/native";

const BookingDetail = ({ route }) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const {
    loading: loading_,
    booking,
    error,
  } = useSelector((state) => state.bookings);

  const { params } = route;
  const { movie } = params;
  const { booking: bookingId } = params;

  useEffect(() => {
    if (bookingId && isFocused) {
      dispatch(loading());
      dispatch(loadBooking(bookingId));
    }
  }, [bookingId, isFocused]);

  return (
    <ScrollView style={{ backgroundColor: "#eee", marginVertical: 5 }}>
      <BackBtn />
      {loading_ ? (
        <Loader text="Loading booking details..." />
      ) : error ? (
        <Text style={styles.mutedText}>Error</Text>
      ) : (
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
              paddingTop: 15,
            }}
          >
            <Text style={styles.movieTitle}>{movie?.title}</Text>
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
            {booking?.date && (
              <Text>
                <Text style={styles.italic}>Date: </Text>
                <Text style={styles.content}>
                  {moment(booking?.date).format("dddd, Do MMMM, YYYY")}
                </Text>
              </Text>
            )}
            <Text>
              <Text style={styles.italic}>Stars: </Text>
              <Text style={styles.content}>{movie?.stars}</Text>
            </Text>
            <View style={{ marginVertical: 10, marginTop: 5 }}>
              <Text>
                <Text style={styles.italic}>Total:</Text>{" "}
                <Text>
                  {movie?.currency}
                  <Text style={{ fontSize: 18 }}>{booking?.total}</Text> (
                  <Text style={{ fontSize: 18 }}>{booking?.users}</Text> persons
                  * {movie?.currency}
                  <Text style={{ fontSize: 18 }}>{booking?.price}</Text>
                  {typeof movie?.prices === "object" && (
                    <Text style={{ textTransform: "capitalize" }}>
                      {" "}
                      (
                      {Object.keys(movie?.prices).find(
                        (_) => movie?.prices[_] == booking?.price
                      )}
                      ){" "}
                    </Text>
                  )}
                  )
                </Text>
              </Text>
            </View>
            <View>
              <View
                style={{
                  marginVertical: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <QRCode value={JSON.stringify({ booking, movie })} />
              </View>
              <Text style={{ fontStyle: "italic", textAlign: "center" }}>
                Note: Save screenshot of the above QR Code for future use.
              </Text>
            </View>
          </View>
        </View>
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
    fontWeight: "400",
    paddingVertical: 5,
  },
  italic: {
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "100",
  },
  content: {
    fontSize: 16,
  },
  downloadBtn: {
    padding: 10,
    backgroundColor: "#3590f3",
    borderRadius: 7,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginHorizontal: 40,
    maxWidth: "80%",
    textAlign: "center",
  },
});

export default BookingDetail;
