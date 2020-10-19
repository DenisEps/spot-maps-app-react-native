import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
    </NavigationContainer>
  );
};

export default App;
