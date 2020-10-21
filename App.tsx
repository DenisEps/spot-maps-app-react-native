import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';

import {MainStackContainer} from './src/navigation/MainStack';

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <MainStackContainer />
      <FlashMessage
        position="top"
        textStyle={{color: '#000'}}
        titleStyle={{color: '#000'}}
        style={{
          borderRadius: 16,
          elevation: 3,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
        }}
      />
    </NavigationContainer>
  );
};
