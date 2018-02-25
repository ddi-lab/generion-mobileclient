/* eslint-disable max-len,react/prop-types,react/no-unused-prop-types */
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
    Text, TouchableHighlight,
} from 'react-native';
import { AppFonts, AppColors, AppSizes } from '@theme/';

/* Component ==================================================================== */
const EmptyText = props => (
  <View style={{ marginLeft: AppSizes.containerPadding, marginRight: 50, marginBottom: (80) }}>
    <Text style={{

      fontSize: 18,
      ...AppFonts.base.fontBlack,
      textAlign: 'left',
      color: '#000000' }}
    >{props.title}</Text>
    <Text style={{

      fontSize: 34,
      marginTop: 12,
      ...AppFonts.base.fontBlack,
      lineHeight: 38,
      textAlign: 'left',
      color: '#000000' }}
    >{props.subtitle}<Text style={{ color: AppColors.brand.red }}>.</Text></Text>


    {props.actionTitle &&
      <TouchableHighlight
        onPress={props.actionOnPress}
        underlayColor={AppColors.underlayColor}
      >
        <Text style={{

          fontSize: 13,
          marginTop: 14,
          ...AppFonts.base.fontMedium,
          textAlign: 'left',
          color: '#000000',
        }}
        >{props.actionTitle}</Text>
      </TouchableHighlight>
      }
  </View>
);


EmptyText.propTypes = { title: PropTypes.string, subtitle: PropTypes.string };
EmptyText.defaultProps = { title: 'Ничего не найдено.', subtitle: 'Главные события ждут Вас впереди' };

/* Export Component ==================================================================== */
export default EmptyText;
