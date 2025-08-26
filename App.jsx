import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RootStack from './src/routes/RootStack';
import { store } from './src/store/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
