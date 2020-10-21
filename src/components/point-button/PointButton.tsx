import React from 'react';
import styled from 'styled-components';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');
const BOX_WIDTH = width / 2;

const PointContainerMain = styled(View)`
  width: ${BOX_WIDTH - 10}px;
  padding: 0 10px 35px 10px;
`;
const PointContainerOut = styled(View)`
  background-color: #ecf0f3;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 23.5px;
`;
const PointContainerIn = styled(View)`
  background-color: #ecf0f3;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 23.5px;
  width: 100%;
  height: 100%;
`;
const PointText = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  color: #707070;
`;

interface PointButtonProps {
  index: number;
  setCurrentPoint: any;
}

export const PointButton: React.FC<PointButtonProps> = ({
  index,
  handleSetCurrentPoint,
}) => {
  const handlePress = () => {
    handleSetCurrentPoint(index);
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <PointContainerMain>
        <PointContainerOut style={styles.smallRoundBtnWhite}>
          <PointContainerIn style={styles.smallRoundBtnBlack}>
            <PointText>Точка {index + 1}</PointText>
          </PointContainerIn>
        </PointContainerOut>
      </PointContainerMain>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
