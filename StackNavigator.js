import React from "react";
import { AppRegistry } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RecommendedMovies from "./screens/RecommendedMovies";
import LatestMovies from "./screens/LatestMovies";
import UpcomingMovies from "./screens/UpcomingMovies";
import Events from "./screens/Events";
import MovieDetail from "./screens/MovieDetail";
import BookingDetail from "./screens/BookingDetail";
import Search from "./screens/Search";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="recommended-movies" component={RecommendedMovies} />
        <Stack.Screen name="latest-movies" component={LatestMovies} />
        <Stack.Screen name="upcoming-movies" component={UpcomingMovies} />
        <Stack.Screen name="nearby-events" component={Events} />
        <Stack.Screen name="movie-detail" component={MovieDetail} />
        <Stack.Screen name="booking-detail" component={BookingDetail} />
        <Stack.Screen name="search" component={Search} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

AppRegistry.registerComponent("StackNavigator", () => StackNavigator);

export default StackNavigator;
