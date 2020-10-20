import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import styled from 'styled-components';

import {ROUTES} from '../../navigation/Routes';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ecf0f3;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled(View)`
  justify-content: center;
  background-color: #ecf0f3;
  align-items: center;
  width: 106px;
  height: 106px;
  border-radius: 16px;
  border-color: #000;
  /* box-shadow: -10px -10px 20px rgba(255, 255, 255, 1);
  box-shadow: 10px 10px 20px rgba(151, 167, 195, 0.5); */
`;

const ButtonText = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  color: #707070;
`;

interface StartScreenProps {
  navigation: any;
}

export const ButtonScreen: React.FC<StartScreenProps> = ({navigation}) => {
  return (
    <Container>
      <ButtonContainer style={styles.ButtonContainerBlack}>
        <ButtonContainer style={styles.ButtonContainerWhite}>
          <ButtonText>Начать</ButtonText>
        </ButtonContainer>
      </ButtonContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  ButtonContainerWhite: {
    shadowColor: 'white',
    shadowOffset: {
      width: -10,
      height: -10,
    },
    shadowOpacity: 1,
    shadowRadius: 20.0,
    elevation: 16,
  },
  ButtonContainerBlack: {
    shadowColor: '#97A7C3',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20.0,
    elevation: 16,
  },
});
