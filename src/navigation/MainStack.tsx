import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ROUTES} from './Routes';
import {StartScreen} from '../screens/start-screen/StartScreen';
import {ButtonScreen} from '../screens/button-screen/ButtonScreen';
import {ChooseLocationScreen} from '../screens/choose-location-screen/ChooseLocationScreen';
import {SendLocationScreen} from '../screens/send-location-screen/SendLocationScreen';
import {CheckScreen} from '../screens/check-screen/CheckScreen';

import {Context} from '../Context';

interface MainStackProps {}

const MainStack = createStackNavigator();

export const MainStackContainer: React.FC<MainStackProps> = ({}) => {
  const [trackId, setTrackId] = React.useState(null);

  return (
    <Context.Provider value={[trackId, setTrackId]}>
      <MainStack.Navigator
        initialRouteName={ROUTES.StartScreen}
        screenOptions={{headerShown: false}}>
        <MainStack.Screen name={ROUTES.StartScreen} component={StartScreen} />
        <MainStack.Screen name={ROUTES.ButtonScreen} component={ButtonScreen} />
        <MainStack.Screen
          name={ROUTES.ChooseLocationScreen}
          component={ChooseLocationScreen}
        />
        <MainStack.Screen
          name={ROUTES.SendLocationScreen}
          component={SendLocationScreen}
        />
        <MainStack.Screen name={ROUTES.CheckScreen} component={CheckScreen} />
      </MainStack.Navigator>
    </Context.Provider>
  );
};
