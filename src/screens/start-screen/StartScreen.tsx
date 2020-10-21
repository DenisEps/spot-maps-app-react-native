import {useNavigationState} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableHighlight} from 'react-native';
import styled from 'styled-components';

import {ROUTES} from '../../navigation/Routes';

const TouchContainer = styled(TouchableHighlight)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: #ecf0f3;
`;

const WelcomeText = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  color: #707070;
  margin-bottom: 56px;
`;

interface StartScreenProps {
  navigation: any;
}

export const StartScreen: React.FC<StartScreenProps> = ({navigation}) => {
  const state = useNavigationState((state) => state);
  React.useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <TouchContainer
      activeOpacity={0}
      underlayColor="#DDDDDD"
      onPress={() => navigation.replace(ROUTES.ButtonScreen)}>
      <WelcomeText>Нажмите на экран</WelcomeText>
    </TouchContainer>
  );
};
