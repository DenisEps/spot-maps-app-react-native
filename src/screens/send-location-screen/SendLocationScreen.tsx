import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';

import Arrow from '../../assets/Arrow.svg';
import Xbutton from '../../assets/Xbutton.svg';
import Location_Icon from '../../assets/Location_Icon.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ROUTES} from '../../navigation/Routes';

import {Context} from '../../Context';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ecf0f3;
`;

const HeaderContainer = styled(View)`
  padding: 30px;
  flex-direction: row;
  justify-content: space-between;
`;

const XButtonContainer = styled(View)`
  background-color: #ecf0f3;
  height: 47px;
  width: 47px;
  border-radius: 23.5px;
  justify-content: center;
  align-items: center;
  opacity: 0;
`;

const MyLocButtonContainerOut = styled(View)`
  background-color: #ecf0f3;
  width: 108px;
  height: 108px;
  border-radius: 54px;
  margin-top: 11px;
`;

const MyLocButtonContainerIn = styled(View)`
  background-color: #ecf0f3;
  width: 108px;
  height: 108px;
  border-radius: 54px;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0 18px 0;
`;

const MyLocText = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: #707070;
`;

const BackButtonContainer = styled(View)`
  background-color: #ecf0f3;
  height: 47px;
  width: 47px;
  border-radius: 23.5px;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled(View)`
  padding: 0 20px;
`;
const MainText = styled(Text)`
  align-self: flex-start;
  font-size: 30px;
  font-weight: 700;
  color: #707070;
  margin-bottom: 10px;
  line-height: 39px;
`;
const CoordMainContainer = styled(View)`
  margin-top: 75px;
`;
const CoordEntryContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;
const CoordNameText = styled(Text)`
  font-weight: 700;
  color: #707070;
  font-size: 20px;
  margin-right: 40px;
`;
const CoordInputContainer = styled(View)`
  border-radius: 24px;
  height: 50px;
  flex: 1;
  border: 1px solid lightgray;
  justify-content: center;
  align-items: center;
`;
const CoordInputText = styled(Text)`
  font-weight: 700;
  color: #707070;
  font-size: 16px;
`;

const FooterContainer = styled(View)`
  padding: 0 20px;
  flex: 1;
  justify-content: flex-end;
  padding-bottom: ${(props: any) => (props.isSafeArea !== 0 ? '16px' : '50px')};
`;

const FooterButtonContainerOut = styled(View)`
  background-color: #ecf0f3;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 23.5px;
`;

const FooterButtonContainerIn = styled(View)`
  background-color: #ecf0f3;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 23.5px;
  width: 100%;
  height: 100%;
`;

const FooterButtonText = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  color: #707070;
`;

interface SendLocationScreenProps {
  navigation: any;
  route: any;
}

export const SendLocationScreen: React.FC<SendLocationScreenProps> = ({
  navigation,
  route,
}) => {
  const {bottom} = useSafeAreaInsets();
  const {
    markerState: {latitude, longitude},
  } = route.params;
  const [trackId] = React.useContext(Context);

  const handleSend = async () => {
    const data = {
      longitude: longitude,
      latitude: latitude,
      track_id: trackId,
    };

    const result = await fetch('http://test-spotapp.ru:8080/save_track_point', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      navigation.navigate(ROUTES.CheckScreen);
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButtonContainer style={styles.smallRoundBtnWhite}>
            <BackButtonContainer style={styles.smallRoundBtnBlack}>
              <Arrow style={styles.arrow} />
            </BackButtonContainer>
          </BackButtonContainer>
        </TouchableOpacity>

        <MyLocButtonContainerOut style={styles.smallRoundBtnWhite}>
          <MyLocButtonContainerIn style={styles.smallRoundBtnBlack}>
            <Location_Icon />
            <MyLocText>MyLoc</MyLocText>
          </MyLocButtonContainerIn>
        </MyLocButtonContainerOut>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <XButtonContainer style={styles.smallRoundBtnWhite}>
            <XButtonContainer style={styles.smallRoundBtnBlack}>
              <Xbutton />
            </XButtonContainer>
          </XButtonContainer>
        </TouchableOpacity>
      </HeaderContainer>

      <MainContainer>
        <MainText>Отправьте выбранную геопозицию</MainText>
        <CoordMainContainer>
          <CoordEntryContainer>
            <CoordNameText>Широта</CoordNameText>
            <CoordInputContainer>
              <CoordInputText>{latitude}</CoordInputText>
            </CoordInputContainer>
          </CoordEntryContainer>
          <CoordEntryContainer style={styles.mt_40}>
            <CoordNameText>Долгота</CoordNameText>
            <CoordInputContainer>
              <CoordInputText>{longitude}</CoordInputText>
            </CoordInputContainer>
          </CoordEntryContainer>
        </CoordMainContainer>
      </MainContainer>

      <FooterContainer isSafeArea={bottom}>
        <TouchableOpacity onPress={handleSend}>
          <FooterButtonContainerOut style={styles.smallRoundBtnWhite}>
            <FooterButtonContainerIn style={styles.smallRoundBtnBlack}>
              <FooterButtonText>Отправить</FooterButtonText>
            </FooterButtonContainerIn>
          </FooterButtonContainerOut>
        </TouchableOpacity>
      </FooterContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  arrow: {
    width: 25,
  },
  smallRoundBtnWhite: {
    shadowColor: 'white',
    shadowOffset: {
      width: -11,
      height: -11,
    },
    shadowOpacity: 1,
    shadowRadius: 7,
  },
  smallRoundBtnBlack: {
    shadowColor: '#97A7C3',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 15.0,
  },
  mt_40: {
    marginTop: 40,
  },
});
