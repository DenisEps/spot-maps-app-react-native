import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import styled from 'styled-components';

import MapView, {Marker} from 'react-native-maps';

import Arrow from '../../assets/Arrow.svg';
import Xbutton from '../../assets/Xbutton.svg';
import Location_Icon from '../../assets/Location_Icon.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
`;

const MainText = styled(Text)`
  align-self: flex-start;
  font-size: 30px;
  font-weight: 700;
  color: #707070;
  margin-bottom: 10px;
`;

const MapViewContainer = styled(MapView)`
  flex: 1;
  border-radius: 23px;
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

interface ChooseLocationScreenProps {}

interface Marker {
  coordinate: {latitude: number; longitude: number};
}

type Coords = {latitude: number; longitude: number};

const initialRegion = {
  latitude: 55.750976,
  longitude: 37.615932,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const ChooseLocationScreen: React.FC<ChooseLocationScreenProps> = ({}) => {
  const mapRef = React.useRef<MapView>(null);
  const {bottom} = useSafeAreaInsets();

  const [markerState, setMarkerState] = React.useState<Coords | null>(null);

  const handlePress = ({nativeEvent: {coordinate}}) => {
    setMarkerState(coordinate);
  };

  const animateToRegion = () => {
    if (!mapRef.current) {
      return;
    }
    const region = {
      latitude: markerState?.latitude || initialRegion.latitude,
      longitude: markerState?.longitude || initialRegion.longitude,
      latitudeDelta: initialRegion.latitudeDelta,
      longitudeDelta: initialRegion.longitudeDelta,
    };
    mapRef.current.animateToRegion(region);
  };

  React.useEffect(() => {
    animateToRegion();
    // eslint-disable-next-line
  }, [markerState]);

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
        <View style={{height: 290}}>
          <MapViewContainer
            ref={mapRef}
            showsUserLocation
            initialRegion={initialRegion}
            onPress={handlePress}>
            {markerState ? (
              <Marker
                coordinate={markerState}
                image={require('../../assets/Maps_Icon.png')}
                centerOffset={{x: -2, y: -29}}
              />
            ) : null}
          </MapViewContainer>
        </View>
      </MainContainer>
      <FooterContainer isSafeArea={bottom}>
        {/* if bottom === 0 то это iPhone 7 => padding 50  */}
        {/* if bottom !== 0 то это iPhone 11 => padding (50 - bottom) */}
        <FooterButtonContainerOut style={styles.smallRoundBtnWhite}>
          <FooterButtonContainerIn style={styles.smallRoundBtnBlack}>
            <FooterButtonText>Выбрать</FooterButtonText>
          </FooterButtonContainerIn>
        </FooterButtonContainerOut>
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
