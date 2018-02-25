/* eslint-disable no-undef */

import React from 'react';
import {
    TouchableHighlight,
    Image,
    View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { AppColors, AppSizes } from '@theme/';

import { Dimensions, Platform } from 'react-native';

const BackButton = (props) => {
  onPress = () => {
    Actions.pop();
  };

  const {
    noMargin = false,
  } = props;
  const paddingX = AppSizes.containerPadding;
  const paddingY = 10;
  const marginTop = noMargin ? 0 : (Platform.OS === 'ios') ? 0 : 37;
  const width = 13;
  const height = 21;
  return (
    <TouchableHighlight
      onPress={this.onPress}
      underlayColor={AppColors.underlayColor}
    >
      <View style={{ 
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        width: width + (paddingX * 2),
        height: height + paddingY,
        marginTop: marginTop - paddingY,
        marginLeft: -paddingX,
      }}>
        <Image
          source={require('../../images/backArrow.png')}
          style={{ tintColor: props.style != null && props.style.tintColor ? props.style.tintColor : 'black',
            width: width,
            height: height
          }}
        />
      </View>
    </TouchableHighlight>
  );
};

export default BackButton;

