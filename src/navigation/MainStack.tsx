import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ROUTES} from './Routes';
import {StartScreen} from '../screens/start-screen/StartScreen';
import {ButtonScreen} from '../screens/button-screen/ButtonScreen';

interface MainStackProps {}

const MainStack = createStackNavigator();

export const MainStackContainer: React.FC<MainStackProps> = ({}) => {
  return (
    <MainStack.Navigator
      initialRouteName={ROUTES.StartScreen}
      screenOptions={{headerShown: false}}>
      <MainStack.Screen name={ROUTES.StartScreen} component={StartScreen} />
      <MainStack.Screen name={ROUTES.ButtonScreen} component={ButtonScreen} />
    </MainStack.Navigator>
  );
};