import React from 'react';
import {View, StyleSheet, SafeAreaView, Text, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';

import Arrow from '../../assets/Arrow.svg';
import Xbutton from '../../assets/Xbutton.svg';
import Location_Icon from '../../assets/Location_Icon.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ROUTES} from '../../navigation/Routes';

import {Context} from '../../Context';

import {PointButton} from '../../components/point-button/PointButton';
import {HeaderComponent} from '../../components/header-component/HeaderComponent';

// const {width} = Dimensions.get('window');

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ecf0f3;
`;

// const HeaderContainer = styled(View)`
//   padding: 30px;
//   flex-direction: row;
//   justify-content: space-between;
// `;

// const XButtonContainer = styled(View)`
//   background-color: #ecf0f3;
//   height: 47px;
//   width: 47px;
//   border-radius: 23.5px;
//   justify-content: center;
//   align-items: center;
//   opacity: 0;
// `;

// const MyLocButtonContainerOut = styled(View)`
//   background-color: #ecf0f3;
//   width: 108px;
//   height: 108px;
//   border-radius: 54px;
//   margin-top: 11px;
// `;

// const MyLocButtonContainerIn = styled(View)`
//   background-color: #ecf0f3;
//   width: 108px;
//   height: 108px;
//   border-radius: 54px;
//   justify-content: space-between;
//   align-items: center;
//   padding: 12px 0 18px 0;
// `;

// const MyLocText = styled(Text)`
//   font-size: 16px;
//   font-weight: 700;
//   color: #707070;
// `;

// const BackButtonContainer = styled(View)`
//   background-color: #ecf0f3;
//   height: 47px;
//   width: 47px;
//   border-radius: 23.5px;
//   justify-content: center;
//   align-items: center;
// `;

const MainContainer = styled(View)`
  /* padding: 0 20px; */
`;
const MainText = styled(Text)`
  padding: 0 20px;
  align-self: flex-start;
  font-size: 30px;
  font-weight: 700;
  color: #707070;
  margin-bottom: 15px;
  line-height: 39px;
`;
const SingleCoordCheckContainer = styled(View)``;
const SingleCoordTitle = styled(Text)`
  padding: 0 20px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 700;
  color: #707070;
`;
const CoordContainer = styled(View)`
  flex-direction: row;
  padding: 0 10px;
`;
const LanLonEntryContainer = styled(View)`
  padding: 0 10px;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;
const LanLonInputBox = styled(View)`
  border-radius: 24px;
  height: 50px;
  border: 1px solid lightgray;
  justify-content: center;
  align-items: center;
  margin-bottom: 3px;
  width: 100%;
`;
const LanLonInputText = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: #707070;
`;
const LanLonTitle = styled(Text)`
  font-size: 12px;
  font-weight: 700;
  color: #707070;
`;

const PointsMainContainer = styled(View)`
  margin-top: 30px;
  height: 350px;
`;
const PointsTitle = styled(Text)`
  padding: 0 20px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 700;
  color: #707070;
`;
const PointsGrid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 10px;
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

interface CheckScreenProps {
  navigation: any;
  route: any;
}

export const CheckScreen: React.FC<CheckScreenProps> = ({navigation}) => {
  const {bottom} = useSafeAreaInsets();
  const [trackId] = React.useContext(Context);
  const [points, setPoints] = React.useState(null);
  const [currentPoint, setCurrentPoint] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `http://test-spotapp.ru:8080/get_track/${trackId}`,
      );
      const data = await result.json();
      setPoints(data);
      setCurrentPoint({
        title: 'Точка 1',
        latitude: data[0].latitude,
        longitude: data[0].longitude,
      });
    };
    fetchData();
  }, []);

  const handleSetCurrentPoint = async (index) => {
    const point = points[index];
    await setCurrentPoint({
      title: `Точка ${index + 1}`,
      latitude: point.latitude,
      longitude: point.longitude,
    });
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} xbutton={false} backbutton />

      <MainContainer>
        <MainText>Проверьте добавленные точки</MainText>
        <SingleCoordCheckContainer>
          <SingleCoordTitle>{currentPoint?.title}</SingleCoordTitle>
          <CoordContainer>
            <LanLonEntryContainer>
              <LanLonInputBox>
                <LanLonInputText>{currentPoint?.latitude}</LanLonInputText>
              </LanLonInputBox>
              <LanLonTitle>Широта</LanLonTitle>
            </LanLonEntryContainer>
            <LanLonEntryContainer>
              <LanLonInputBox>
                <LanLonInputText>{currentPoint?.longitude}</LanLonInputText>
              </LanLonInputBox>
              <LanLonTitle>Долгота</LanLonTitle>
            </LanLonEntryContainer>
          </CoordContainer>
        </SingleCoordCheckContainer>

        <ScrollView>
          <PointsMainContainer>
            <PointsTitle>Выберите добавленную точку</PointsTitle>
            <PointsGrid>
              {points !== null
                ? points.map((point, index) => {
                    return (
                      <PointButton
                        handleSetCurrentPoint={handleSetCurrentPoint}
                        key={point.order_id}
                        index={index}
                      />
                    );
                  })
                : null}
            </PointsGrid>
          </PointsMainContainer>
        </ScrollView>
      </MainContainer>

      <FooterContainer isSafeArea={bottom}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.ChooseLocationScreen)}>
          <FooterButtonContainerOut style={styles.smallRoundBtnWhite}>
            <FooterButtonContainerIn style={styles.smallRoundBtnBlack}>
              <FooterButtonText>Добавить еще</FooterButtonText>
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
