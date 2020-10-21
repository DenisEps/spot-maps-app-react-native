import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {ROUTES} from '../../navigation/Routes';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #888888;
  padding: 0 20px;
`;

const ModalContainer = styled(View)`
  height: 210px;
  background-color: #fff;
  border-radius: 28px;
  width: 100%;
  align-items: center;
`;

const ModalText = styled(Text)`
  margin-top: 66px;
  font-size: 20px;
  font-weight: 700;
  color: #707070;
`;

const OptionsContainer = styled(View)`
  padding: 0 30px;
  flex-direction: row;
  flex: 1;
`;

const ButtonContainer = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  margin: 40px 5px 10px;
  flex: 1;
`;

const ButtonText = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => (props.green ? '#559D52' : '#FF5A5A')};
`;

interface QuitScreenProps {
  navigation: any;
}

export const QuitScreen: React.FC<QuitScreenProps> = ({
  navigation,
}: {
  navigation: any;
}) => {
  const handleNope = () => {
    navigation.navigate(ROUTES.ChooseLocationScreen);
  };

  const handleYes = () => {
    navigation.reset({
      index: 0,
      routes: [{name: ROUTES.ButtonScreen}],
    });
  };

  return (
    <Container>
      <ModalContainer>
        <ModalText>Уверены, что хотите выйти?</ModalText>
        <OptionsContainer>
          <ButtonContainer onPress={() => handleYes()}>
            <ButtonText green>Да</ButtonText>
          </ButtonContainer>
          <ButtonContainer onPress={() => handleNope()}>
            <ButtonText red>Нет</ButtonText>
          </ButtonContainer>
        </OptionsContainer>
      </ModalContainer>
    </Container>
  );
};
