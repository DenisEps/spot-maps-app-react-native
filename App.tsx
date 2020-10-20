import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {MainStackContainer} from './src/navigation/MainStack';

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <MainStackContainer />
    </NavigationContainer>
  );
};
