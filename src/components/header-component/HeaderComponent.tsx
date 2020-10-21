import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';

import Arrow from '../../assets/Arrow.svg';
import Xbutton from '../../assets/Xbutton.svg';
import Location_Icon from '../../assets/Location_Icon.svg';

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
  opacity: ${(props) => (props.xbutton ? '1' : '0')};
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
  opacity: ${(props) => (props.backbutton ? '1' : '0')};
`;

interface HeaderComponentProps {
  navigation: any;
  backbutton: boolean;
  xbutton: boolean;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({
  navigation,
  backbutton,
  xbutton,
}) => {
  return (
    <HeaderContainer>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackButtonContainer
          backbutton={backbutton}
          style={styles.smallRoundBtnWhite}>
          <BackButtonContainer
            backbutton={backbutton}
            style={styles.smallRoundBtnBlack}>
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
        <XButtonContainer xbutton={xbutton} style={styles.smallRoundBtnWhite}>
          <XButtonContainer xbutton={xbutton} style={styles.smallRoundBtnBlack}>
            <Xbutton />
          </XButtonContainer>
        </XButtonContainer>
      </TouchableOpacity>
    </HeaderContainer>
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
