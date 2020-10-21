import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {ROUTES} from './Routes';
import {StartScreen} from '../screens/start-screen/StartScreen';
import {ButtonScreen} from '../screens/button-screen/ButtonScreen';
import {ChooseLocationScreen} from '../screens/choose-location-screen/ChooseLocationScreen';
import {SendLocationScreen} from '../screens/send-location-screen/SendLocationScreen';
import {CheckScreen} from '../screens/check-screen/CheckScreen';
import {QuitScreen} from '../screens/quit-screen/QuitScreen';

import {Context} from '../Context';

interface MainStackProps {}

const MainStack = createStackNavigator();

type Coords = {latitude: number; longitude: number};

export const MainStackContainer: React.FC<MainStackProps> = ({}) => {
  const [trackId, setTrackId] = React.useState(null);
  const [marker, setMarker] = React.useState<Coords | null>(null);

  return (
    <Context.Provider
      value={{track: [trackId, setTrackId], marker: [marker, setMarker]}}>
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
        <MainStack.Screen
          name={ROUTES.QuitScreen}
          component={QuitScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
      </MainStack.Navigator>
    </Context.Provider>
  );
};
