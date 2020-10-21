import React from 'react';
import {View, StyleSheet, SafeAreaView, Text, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';

import MapView, {Marker} from 'react-native-maps';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ROUTES} from '../../navigation/Routes';

import {HeaderComponent} from '../../components/header-component/HeaderComponent';

import {Context} from '../../Context';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ecf0f3;
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

interface ChooseLocationScreenProps {
  navigation: any;
}

type Coords = {latitude: number; longitude: number};

const initialRegion = {
  latitude: 55.750976,
  longitude: 37.615932,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const ChooseLocationScreen: React.FC<ChooseLocationScreenProps> = ({
  navigation,
}) => {
  const {bottom} = useSafeAreaInsets();

  const mapRef = React.useRef<MapView>(null);
  const {marker, track} = React.useContext(Context);
  const [trackId, setTrackId] = track;
  const [markerState, setMarkerState] = marker;

  const handlePress = ({nativeEvent: {coordinate}}) => {
    setMarkerState({
      latitude: Math.floor(coordinate.latitude * 100000) / 100000,
      longitude: Math.floor(coordinate.longitude * 100000) / 100000,
    });
  };

  const handleLocation = React.useCallback((loc: Coords) => {
    setMarkerState(loc);
  }, []);

  const handleConfirm = async () => {
    if (markerState === null) {
      Alert.alert('Выберите позицию!');
      return;
    }

    if (trackId === null) {
      const result = await fetch('http://test-spotapp.ru:8080/start_track', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await result.json();
      const setId = await setTrackId(data.track_id);
      navigation.navigate(ROUTES.SendLocationScreen, {
        markerState,
      });
    } else {
      navigation.navigate(ROUTES.SendLocationScreen, {
        markerState,
      });
    }
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
      <HeaderComponent
        navigation={navigation}
        xbutton
        backbutton={false}
        handleLocation={handleLocation}
      />

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
        <TouchableOpacity onPress={handleConfirm}>
          <FooterButtonContainerOut style={styles.smallRoundBtnWhite}>
            <FooterButtonContainerIn style={styles.smallRoundBtnBlack}>
              <FooterButtonText>Выбрать</FooterButtonText>
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
});
