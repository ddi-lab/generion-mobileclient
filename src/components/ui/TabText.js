/* eslint-disable max-len,react/prop-types */
/**
 * Tabbar Icon
 *
    <TabIcon icon={'search'} selected={false} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
} from 'react-native';
import { AppColors, AppFonts } from '@theme/';

/* Component ==================================================================== */
const TabText = props => (
  <View style={{
    position: 'absolute',
    height: 48,
    justifyContent: 'center',
  }}
  >
    <Text
      style={{
        color: props.focused ? AppColors.tabbar.iconSelected : AppColors.tabbar.iconDefault,
        ...AppFonts.base.fontBlack,
        fontSize: 13,
      }}
      size={26}
    >
      {props.buttonTitle || props.title}
    </Text>
  </View>
);


TabText.propTypes = { text: PropTypes.string.isRequired, selected: PropTypes.bool };
TabText.defaultProps = { text: 'Text', selected: false };

/* Export Component ==================================================================== */
export default TabText;
