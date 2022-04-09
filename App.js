import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import Header from "./components/Header";

import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./store/sagas";
import rootReducer from "./store/reducers";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <Header />
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flex: 1,
  },
});
