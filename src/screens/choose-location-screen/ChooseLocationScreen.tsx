import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import styled from 'styled-components';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import Arrow from '../../assets/Arrow.svg';
import Xbutton from '../../assets/Xbutton.svg';
import Location_Icon from '../../assets/Location_Icon.svg';

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
  align-items: center;
`;

const MainText = styled(Text)`
  align-self: flex-start;
  font-size: 30px;
  font-weight: 700;
  color: #707070;
`;

const MapViewContainer = styled(MapView)`
  border-radius: 23px;
  width: 335px;
  height: 290px;
`;

const FooterContainer = styled(View)`
  /* padding: 0 20px; */
  background-color: coral;
`;

const FooterButton = styled(View)`
  justify-content: center;
  align-items: center;
  background-color: #ecf0f3;
  height: 47px;
  width: 100px;
  border-radius: 23.5px;
`;

const FooterButtonText = styled(Text)`
  font-size: 20px;
`;

interface ChooseLocationScreenProps {}

interface Marker {
  coordinate: {latitude: number; longitude: number};
}

export const ChooseLocationScreen: React.FC<ChooseLocationScreenProps> = ({}) => {
  const [markerState, setMarkerState] = React.useState(null);

  const handlePress = ({nativeEvent: {coordinate}}) => {
    setMarkerState({coordinate});
  };

  return (
    <Container>
      <HeaderContainer>
        <BackButtonContainer style={styles.smallRoundBtnWhite}>
          <BackButtonContainer style={styles.smallRoundBtnBlack}>
            <Arrow style={styles.arrow} />
          </BackButtonContainer>
        </BackButtonContainer>

        <MyLocButtonContainerOut style={styles.smallRoundBtnWhite}>
          <MyLocButtonContainerIn style={styles.smallRoundBtnBlack}>
            <Location_Icon />
            <MyLocText>MyLoc</MyLocText>
          </MyLocButtonContainerIn>
        </MyLocButtonContainerOut>

        <XButtonContainer style={styles.smallRoundBtnWhite}>
          <XButtonContainer style={styles.smallRoundBtnBlack}>
            <Xbutton />
          </XButtonContainer>
        </XButtonContainer>
      </HeaderContainer>

      <MainContainer>
        <MainText>Выберите вашу геопозицию</MainText>
        {markerState === null ? (
          <MapViewContainer
            initialRegion={{
              latitude: 55.750976,
              longitude: 37.615932,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handlePress}
          />
        ) : (
          <MapViewContainer
            region={{...markerState.coordinate}}
            initialRegion={{
              latitude: 55.750976,
              longitude: 37.615932,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handlePress}>
            <Marker
              coordinate={markerState.coordinate}
              image={require('../../assets/Maps_Icon.png')}
              centerOffset={{x: -2, y: -29}}
            />
          </MapViewContainer>
        )}
      </MainContainer>

      <FooterContainer>
        <FooterButton>
          <FooterButtonText>Выбрать</FooterButtonText>
        </FooterButton>
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
});
